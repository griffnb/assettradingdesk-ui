#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== Sandbox runtime setup ==="

# Source .env into current session (image already persists it for future shells)
if [ -f "$ROOT_DIR/.env" ]; then
    set -a; [ -f "$ROOT_DIR/.env" ] && . "$ROOT_DIR/.env" || true; set +a
    grep -q '.env' /etc/sandbox-persistent.sh 2>/dev/null || { \
        echo '' >> /etc/sandbox-persistent.sh; \
        echo '# project environment' >> /etc/sandbox-persistent.sh; \
        echo "if [ -f \"$ROOT_DIR/.env\" ]; then set -a; . \"$ROOT_DIR/.env\"; set +a; fi" >> /etc/sandbox-persistent.sh; \
    }
echo "  ✅ Root $ROOT_DIR/.env loaded and persisted"
else
    echo "  No $ROOT_DIR/.env found (skipped)"
fi


#------------- Default Config Setup ----------

sleep 10 # wait for Docker to finish its own setup and write any necessary files

# Wait for Claude to write firstStartTime to ~/.claude.json, then set hasCompletedOnboarding
USER_CONFIG_FILE="$HOME/.claude.json"
MAX_WAIT=60
WAITED=0
echo "  Waiting for firstStartTime in $USER_CONFIG_FILE..."
while [ "$WAITED" -lt "$MAX_WAIT" ]; do
    if [ -f "$USER_CONFIG_FILE" ] && jq -e '.firstStartTime' "$USER_CONFIG_FILE" > /dev/null 2>&1; then
        echo "  firstStartTime detected after ${WAITED}s"
        echo "  Contents: $(cat "$USER_CONFIG_FILE")"
        break
    fi
    sleep 1
    WAITED=$((WAITED + 1))
done

if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "  Timed out waiting for firstStartTime (${MAX_WAIT}s)"
fi

# Now set hasCompletedOnboarding
if [ -f "$USER_CONFIG_FILE" ]; then
    TEMP_FILE=$(mktemp)
    jq '. + {hasCompletedOnboarding: true}' "$USER_CONFIG_FILE" > "$TEMP_FILE"
    mv "$TEMP_FILE" "$USER_CONFIG_FILE"
    echo "  Updated $USER_CONFIG_FILE with hasCompletedOnboarding: true"
else
    jq -n '{hasCompletedOnboarding: true}' > "$USER_CONFIG_FILE"
    echo "  Created $USER_CONFIG_FILE with hasCompletedOnboarding: true"
fi


echo "=== Sandbox runtime setup complete ==="

