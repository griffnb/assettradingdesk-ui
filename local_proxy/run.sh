docker build . -t atlas-local-proxy
docker run -it \
  -p 443:443 \
  -v "$(pwd)"/ssl:/etc/nginx/ssl/ \
  --rm atlas-local-proxy
