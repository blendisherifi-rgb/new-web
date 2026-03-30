#!/usr/bin/env bash
# Generate a self-signed cert for nginx TLS on 443 (ALB → instance HTTPS target).
# Run on the EC2 host before starting compose with default-alb.conf.
# Note: Some ALB HTTPS health checks require a cert the load balancer trusts; if checks still fail,
# ask SysOps to use target group protocol HTTP and port 80 (TLS only on the ALB) instead.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${ROOT}/docker/nginx/ssl"
mkdir -p "${OUT}"

openssl req -x509 -nodes -days 825 -newkey rsa:2048 \
  -keyout "${OUT}/privkey.pem" \
  -out "${OUT}/fullchain.pem" \
  -subj "/CN=test.softco.com/O=SoftCo/C=IE"

echo "Wrote ${OUT}/fullchain.pem and ${OUT}/privkey.pem"
