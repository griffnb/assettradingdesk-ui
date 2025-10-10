#!/bin/bash

# Comprehensive dependency management script for PNPM monorepo
set -e

echo "🚀 Dependency Management Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --update        Update all dependencies to latest versions"
    echo "  --check         Check for unused dependencies"
    echo "  --clean         Remove unused dependencies (interactive)"
    echo "  --security      Check for security vulnerabilities"
    echo "  --all           Run all checks and updates"
    echo "  --help          Show this help message"
    echo ""
}

update_dependencies() {
    echo -e "${BLUE}📦 Updating all dependencies to latest versions...${NC}"
    pnpm update --recursive --latest
    echo -e "${GREEN}✅ Dependencies updated successfully!${NC}"
}

check_unused() {
    echo -e "${BLUE}🔍 Checking for unused dependencies...${NC}"
    
    # Key packages to check
    PACKAGES=(
        "."
        "apps/ai"
        "apps/ai_next"
        "sites/techboss_ai"
        "packages/ui"
        "packages/astro_ui"
        "packages/utils"
        "packages/models"
        "packages/sage"
        "packages/common_lib"
    )
    
    for package in "${PACKAGES[@]}"; do
        if [ -d "$package" ] && [ -f "$package/package.json" ]; then
            echo -e "${YELLOW}📦 Checking $package...${NC}"
            cd "$package"
            
            # Check with depcheck, ignoring common dev dependencies
            if command -v depcheck &> /dev/null; then
                depcheck --ignores="@types/*,eslint-*,prettier-*,@tailwindcss/*,postcss-*,@vitejs/*,vite-*,@rollup/*,*-linux-*" . 2>/dev/null || echo "No issues found"
            else
                echo "depcheck not installed - run: pnpm add -g depcheck"
            fi
            
            cd - > /dev/null
            echo ""
        fi
    done
}

check_security() {
    echo -e "${BLUE}🔒 Checking for security vulnerabilities...${NC}"
    pnpm audit --recursive
    echo -e "${GREEN}✅ Security check completed!${NC}"
}

clean_common_unused() {
    echo -e "${BLUE}🧹 Cleaning common unused dependencies...${NC}"
    
    # Common unused dependencies that can be safely removed
    UNUSED_DEPS=(
        "@rollup/rollup-linux-arm64-gnu"
        "lightningcss-linux-arm64-gnu"
    )
    
    for dep in "${UNUSED_DEPS[@]}"; do
        echo "Removing $dep from all packages..."
        pnpm remove "$dep" --recursive 2>/dev/null || echo "Not found in some packages"
    done
}

dedupe_dependencies() {
    echo -e "${BLUE}🔄 Deduplicating dependencies...${NC}"
    pnpm dedupe
    echo -e "${GREEN}✅ Dependencies deduplicated!${NC}"
}

show_outdated() {
    echo -e "${BLUE}📊 Checking for outdated dependencies...${NC}"
    if command -v ncu &> /dev/null; then
        ncu --format group
    else
        echo "npm-check-updates not installed - run: pnpm add -g npm-check-updates"
    fi
}

# Parse command line arguments
case "${1:-}" in
    --update)
        update_dependencies
        ;;
    --check)
        check_unused
        ;;
    --clean)
        clean_common_unused
        dedupe_dependencies
        ;;
    --security)
        check_security
        ;;
    --outdated)
        show_outdated
        ;;
    --all)
        update_dependencies
        echo ""
        check_unused
        echo ""
        clean_common_unused
        echo ""
        dedupe_dependencies
        echo ""
        check_security
        ;;
    --help)
        show_help
        ;;
    "")
        echo -e "${YELLOW}No option provided. Use --help for usage information.${NC}"
        show_help
        ;;
    *)
        echo -e "${RED}Unknown option: $1${NC}"
        show_help
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Dependency management completed!${NC}"
echo ""
echo "Common commands:"
echo "  pnpm update --recursive --latest    # Update all deps"
echo "  pnpm remove <pkg> --filter <ws>     # Remove from specific workspace"
echo "  pnpm add <pkg> --filter <ws>        # Add to specific workspace"
echo "  pnpm dedupe                         # Remove duplicate deps"
echo "  pnpm audit --recursive              # Security audit"
