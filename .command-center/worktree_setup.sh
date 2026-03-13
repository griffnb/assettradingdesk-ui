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

# Function to copy .env files from apps and packages folders

if [ -f "$CC_PROJECT_PATH/.command-center/setup-env.sh" ]; then
    echo "Running .command-center/setup-env.sh from project root"
    bash "$CC_PROJECT_PATH/.command-center/setup-env.sh"
else
    echo "No .command-center/setup-env.sh found in project root, skipping"
fi

copy_env_files() {
    local folders=("apps" "packages")
    
    for folder in "${folders[@]}"; do
        local project_dir="$CC_PROJECT_PATH/$folder"
        local worktree_dir="$CC_WORKTREE_PATH/$folder"
        
        # Check if folder exists in project
        if [[ ! -d "$project_dir" ]]; then
            continue
        fi
        
        # Find all .env files in folder
        while IFS= read -r -d '' env_file; do
            # Get relative path from project folder
            relative_path="${env_file#$project_dir/}"
            
            # Construct destination path
            dest_file="$worktree_dir/$relative_path"
            dest_dir="$(dirname "$dest_file")"
            
            # Create destination directory if it doesn't exist
            mkdir -p "$dest_dir"
            
            # Copy the .env file
            if cp "$env_file" "$dest_file"; then
                echo "Copied: $folder/$relative_path"
            else
                echo "Failed to copy: $folder/$relative_path"
            fi
        done < <(find "$project_dir" -type f -name ".env" -print0)
    done
}

# Copy .env files from apps and packages folders
copy_env_files

echo "Worktree setup complete"
