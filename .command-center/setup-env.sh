#!/bin/bash
# Copy .configs directory from project root into the new worktree
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"

GH_TOKEN_VALUE=""
GH_USER_VALUE=""

if command -v gh >/dev/null 2>&1; then
    GH_TOKEN_VALUE="$(gh auth token 2>/dev/null || true)"
    GH_USER_VALUE="$(gh api user --jq '.login' 2>/dev/null || true)"
else
    echo "GitHub CLI (gh) not found; creating .env with placeholders"
fi

if [ -z "$GH_TOKEN_VALUE" ]; then
    GH_TOKEN_VALUE="<your_github_token>"
fi

if [ -z "$GH_USER_VALUE" ]; then
    GH_USER_VALUE="<your_github_username>"
fi

cat > "$ENV_FILE" <<EOF
GH_TOKEN=$GH_TOKEN_VALUE
GH_USER=$GH_USER_VALUE
EOF

# Append secrets from .command-center/.secrets-env if it exists
SECRETS_ENV="$ROOT_DIR/.command-center/.secrets-env"
if [ -f "$SECRETS_ENV" ]; then
    echo "" >> "$ENV_FILE"
    cat "$SECRETS_ENV" >> "$ENV_FILE"
    echo "Appended secrets from .command-center/.secrets-env to .env"
fi


# Append secrets from .command-center/sandbox.env if it exists
SANDBOX_ENV="$ROOT_DIR/.command-center/sandbox.env"
if [ -f "$SANDBOX_ENV" ]; then
    echo "" >> "$ENV_FILE"
    cat "$SANDBOX_ENV" >> "$ENV_FILE"
    echo "Appended secrets from .command-center/sandbox.env to .env"
fi


echo "Created $ENV_FILE with GH_TOKEN and GH_USER"