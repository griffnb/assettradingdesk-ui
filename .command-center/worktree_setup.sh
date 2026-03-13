#!/bin/bash
# Command Center Worktree Setup Script
#
# This script runs automatically after a git worktree is created.
# Use it to configure the worktree environment (install dependencies, fix paths, etc.)
#
# Environment variables provided:
#   CC_WORKTREE_PATH - Absolute path to the new worktree directory
#   CC_PROJECT_PATH  - Absolute path to the main project root
#
# Exit codes:
#   0 = success (session starts normally)
#   non-zero = failure (warning shown, session still starts)

# Example: Install dependencies in worktree
# cd "$CC_WORKTREE_PATH"
# npm install

# Example: Copy files from project root
# cp "$CC_PROJECT_PATH/.env.example" "$CC_WORKTREE_PATH/.env"

echo "Worktree setup complete"
