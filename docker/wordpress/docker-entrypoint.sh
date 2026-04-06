#!/bin/bash
set -euo pipefail

WP_DIR="/var/www/html"
PLUGIN_SRC="/usr/src/wp-plugins"

log() { echo "[wp-init] $*"; }

# ── 1. Ensure wp-content subdirs exist (EFS may start empty) ──────
for d in plugins mu-plugins uploads languages; do
    mkdir -p "${WP_DIR}/wp-content/${d}"
done

# ── 2. Sync image-baked plugins into EFS ───────────────────────────
# Overwrite on every boot so image rebuilds push plugin updates.
if [ -d "$PLUGIN_SRC" ]; then
    for plugin_dir in "${PLUGIN_SRC}"/*/; do
        [ -d "$plugin_dir" ] || continue
        name=$(basename "$plugin_dir")
        log "Syncing plugin → ${name}"
        rm -rf "${WP_DIR}/wp-content/plugins/${name:?}"
        cp -a "$plugin_dir" "${WP_DIR}/wp-content/plugins/${name}"
    done
fi

# ── 3. Generate wp-config.php ──────────────────────────────────────
if [ ! -f "${WP_DIR}/wp-config.php" ]; then
    log "Generating wp-config.php..."

    wp config create \
        --path="${WP_DIR}" \
        --dbname="${WORDPRESS_DB_NAME:-wordpress}" \
        --dbuser="${WORDPRESS_DB_USER:-wordpress}" \
        --dbpass="${WORDPRESS_DB_PASSWORD:-}" \
        --dbhost="${WORDPRESS_DB_HOST:-db}" \
        --dbprefix="${WORDPRESS_TABLE_PREFIX:-wp_}" \
        --dbcharset="${WORDPRESS_DB_CHARSET:-utf8mb4}" \
        --allow-root \
        --skip-check \
        --extra-php <<'PHP'

/* ── Reverse proxy / ALB HTTPS detection ── */
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

/* ── Site URLs from environment (override DB values) ── */
if (getenv('WP_HOME'))    define('WP_HOME',    getenv('WP_HOME'));
if (getenv('WP_SITEURL')) define('WP_SITEURL', getenv('WP_SITEURL'));

/* ── Redis object cache ── */
if (getenv('WP_REDIS_HOST')) {
    define('WP_REDIS_HOST', getenv('WP_REDIS_HOST'));
    define('WP_REDIS_PORT', getenv('WP_REDIS_PORT') ?: 6379);
}

/* ── Security hardening ── */
define('DISALLOW_FILE_EDIT', true);
define('WP_AUTO_UPDATE_CORE', false);

/* ── WPGraphQL debug (set GRAPHQL_DEBUG=1 in env to enable) ── */
define('GRAPHQL_DEBUG', filter_var(getenv('GRAPHQL_DEBUG'), FILTER_VALIDATE_BOOLEAN));
PHP

    wp config shuffle-salts --path="${WP_DIR}" --allow-root
    log "wp-config.php created with unique salts."
else
    log "wp-config.php exists – skipping generation."
fi

# ── 4. Fix ownership on wp-content (EFS) ──────────────────────────
chown -R www-data:www-data "${WP_DIR}/wp-content"

# ── 5. Launch ─────────────────────────────────────────────────────
if [ "${1:-}" = "supervisord" ]; then
    log "Starting Apache + PHP-FPM via supervisord..."
    exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
fi

exec "$@"
