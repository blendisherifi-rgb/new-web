# ── WordPress: Apache + PHP-FPM + WP-CLI ──────────────────────────
#
#   BUILD
#     docker build \
#       --build-arg ACF_PRO_KEY=<your-key> \
#       -t <account>.dkr.ecr.<region>.amazonaws.com/wordpress:latest \
#       docker/wordpress/
#
#   PUSH TO ECR
#     aws ecr get-login-password --region <region> | \
#       docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
#     docker push <account>.dkr.ecr.<region>.amazonaws.com/wordpress:latest
#
#   ECS: mount EFS at /var/www/html/wp-content for persistence.
# ──────────────────────────────────────────────────────────────────

FROM php:8.2-fpm-bookworm

ARG WP_VERSION=6.7.2

# ── System packages ──────────────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
        apache2 \
        supervisor \
        libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev \
        libzip-dev libicu-dev libxml2-dev libonig-dev \
        default-mysql-client unzip less curl ca-certificates \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" \
        gd mysqli pdo_mysql zip intl opcache exif bcmath soap \
    && pecl install redis && docker-php-ext-enable redis \
    && apt-get purge -y --auto-remove \
        -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# ── Apache ────────────────────────────────────────────────────────
RUN a2enmod proxy_fcgi setenvif rewrite headers expires
RUN ln -sf /dev/stdout /var/log/apache2/access.log \
    && ln -sf /dev/stderr /var/log/apache2/error.log
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
COPY apache/wordpress.conf /etc/apache2/sites-available/000-default.conf

# ── PHP config ────────────────────────────────────────────────────
COPY php/wordpress.ini  /usr/local/etc/php/conf.d/wordpress.ini
COPY php/www.conf       /usr/local/etc/php-fpm.d/www.conf

# ── WP-CLI ────────────────────────────────────────────────────────
RUN curl -fSL -o /usr/local/bin/wp \
        https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp \
    && wp --info --allow-root

# ── WordPress core ────────────────────────────────────────────────
RUN set -eux; \
    curl -fSL -o /tmp/wordpress.tar.gz \
        "https://wordpress.org/wordpress-${WP_VERSION}.tar.gz"; \
    tar -xzf /tmp/wordpress.tar.gz -C /tmp; \
    cp -a /tmp/wordpress/. /var/www/html/; \
    rm -rf /tmp/wordpress /tmp/wordpress.tar.gz; \
    chown -R www-data:www-data /var/www/html

# ── Default .htaccess (pretty permalinks) ─────────────────────────
RUN printf '%s\n' \
        '# BEGIN WordPress' \
        '<IfModule mod_rewrite.c>' \
        'RewriteEngine On' \
        'RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]' \
        'RewriteBase /' \
        'RewriteRule ^index\.php$ - [L]' \
        'RewriteCond %{REQUEST_FILENAME} !-f' \
        'RewriteCond %{REQUEST_FILENAME} !-d' \
        'RewriteRule . /index.php [L]' \
        '</IfModule>' \
        '# END WordPress' \
    > /var/www/html/.htaccess \
    && chown www-data:www-data /var/www/html/.htaccess

# ── Plugins (staged in /usr/src/wp-plugins, synced to EFS on boot) ─
RUN mkdir -p /usr/src/wp-plugins

# Free plugins
RUN set -eux; cd /usr/src/wp-plugins; \
    curl -fSL -o wp-graphql.zip \
        "https://downloads.wordpress.org/plugin/wp-graphql.latest-stable.zip" \
    && unzip -q wp-graphql.zip && rm wp-graphql.zip; \
    curl -fSL -o wpgraphql-acf.zip \
        "https://downloads.wordpress.org/plugin/wpgraphql-acf.latest-stable.zip" \
    && unzip -q wpgraphql-acf.zip && rm wpgraphql-acf.zip; \
    curl -fSL -o redirection.zip \
        "https://downloads.wordpress.org/plugin/redirection.latest-stable.zip" \
    && unzip -q redirection.zip && rm redirection.zip

# Licensed plugins (ACF Pro, WPML, etc.) – install via WP dashboard after deploy.

# ── Supervisor ────────────────────────────────────────────────────
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# ── Entrypoint ────────────────────────────────────────────────────
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -fsS -o /dev/null http://localhost/ || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["supervisord"]
