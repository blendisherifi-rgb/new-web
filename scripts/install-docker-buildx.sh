#!/usr/bin/env bash
# Installs Docker Buildx 0.17+ (required by recent docker compose for `compose build`).
# Run on the server once: sudo bash scripts/install-docker-buildx.sh
set -euo pipefail

VERSION="${BUILDX_VERSION:-v0.20.1}"
case "$(uname -m)" in
  x86_64)  PLATFORM=linux-amd64 ;;
  aarch64) PLATFORM=linux-arm64 ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

PLUGIN_DIR="${DOCKER_CLI_PLUGINS:-/usr/local/lib/docker/cli-plugins}"
mkdir -p "$PLUGIN_DIR"
URL="https://github.com/docker/buildx/releases/download/${VERSION}/buildx-${VERSION}.${PLATFORM}"
echo "Installing buildx ${VERSION} (${PLATFORM}) -> ${PLUGIN_DIR}/docker-buildx"
curl -fsSL "$URL" -o "${PLUGIN_DIR}/docker-buildx"
chmod +x "${PLUGIN_DIR}/docker-buildx"
docker buildx version
