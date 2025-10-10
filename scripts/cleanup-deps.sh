#!/bin/bash


set -e

echo "🧹 Starting dependency cleanup for monorepo..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check unused dependencies in a package
check_unused_deps() {
    local package_dir=$1
    local package_name=$(basename "$package_dir")
    
    echo -e "${YELLOW}📦 Checking $package_name...${NC}"
    
    cd "$package_dir"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ No package.json found in $package_dir${NC}"
        return
    fi
    
    # Run depcheck if it exists
    if command -v depcheck &> /dev/null; then
        echo "Running depcheck..."
        depcheck --json | jq -r '.dependencies[] // empty' 2>/dev/null || echo "No unused dependencies found"
    fi
    
    # Check for outdated packages
    if command -v ncu &> /dev/null; then
        echo "Checking for outdated packages..."
        ncu --format group
    fi
    
    cd - > /dev/null
}

# Main packages to check
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

# Check each package
for package in "${PACKAGES[@]}"; do
    if [ -d "$package" ]; then
        check_unused_deps "$package"
        echo ""
    else
        echo -e "${RED}❌ Directory $package not found${NC}"
    fi
done

echo -e "${GREEN}✅ Dependency cleanup check completed!${NC}"
echo ""
echo "To remove unused dependencies, run:"
echo "  pnpm remove <package-name> --filter <workspace>"
echo ""
echo "To update all dependencies, run:"
echo "  pnpm update --recursive --latest"
