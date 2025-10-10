#!/bin/bash

# Step 1: Define the available commands for pnpm
commands=("install" "install -D" "up" "run" "build")

# Step 2: Get the list of packages in ./packages
packages=($(ls -d ./sites/*/ ./packages/*/ | xargs -n 1 basename))
packages+=("all") # Add the "all" option

# Step 3: Function to run pnpm commands based on user input
run_pnpm_command() {
  local command=$1
  local package_name=$2
  shift 2
  local selected_packages=("$@")

  for package in "${selected_packages[@]}"; do
    if [[ "$package" == "all" ]]; then
      # Run command recursively for all packages
      if [[ "$command" == "install" || "$command" == "install -D" || "$command" == "up" ]]; then
        echo "pnpm $command $package_name -r"
        pnpm $command $package_name -r
      else
        echo "pnpm $command -r"
        pnpm $command -r
      fi
      break
    else
      # Run command for each specified package
      if [[ "$command" == "install" || "$command" == "install -D" || "$command" == "up" ]]; then
        echo "pnpm $command -F $package $package_name"
        pnpm $command -F "$package" "$package_name"
      else
        echo "pnpm $command -F $package"
        pnpm $command -F "$package"
      fi
    fi
  done
}

# Step 4: Display the menu to the user and execute the command
PS3='Select the pnpm command you want to run: '
select cmd in "${commands[@]}"
do
  if [[ " ${commands[*]} " =~ " $cmd " ]]; then
    # List packages with numbered options for selection
    echo "Available packages:"
    for i in "${!packages[@]}"; do
      echo "$((i+1)). ${packages[$i]}"
    done

    # Prompt user to enter package numbers
    echo "Enter the package number(s) (comma or space-separated, or 'all' for all packages):"
    read -a pkg_numbers_raw
    pkg_numbers=($(echo "${pkg_numbers_raw[@]}" | tr ', ' '\n'))

    # Map the selected numbers to package names
    selected_packages=()
    for number in "${pkg_numbers[@]}"; do
      if [[ "$number" == "all" ]]; then
        selected_packages=("all")
        break
      elif [[ "$number" =~ ^[0-9]+$ ]] && (( number > 0 && number <= ${#packages[@]} )); then
        selected_packages+=("${packages[$((number-1))]}")
      else
        echo "Invalid package selection: $number"
      fi
    done

    # Prompt for the npm package name if applicable
    if [[ "$cmd" == "install" || "$cmd" == "install -D" || "$cmd" == "up" ]]; then
      echo "Enter the npm package name to install (--latest for upgrade all):"
      read package_name
    fi

    # Run the selected command on the chosen packages
    run_pnpm_command "$cmd" "$package_name" "${selected_packages[@]}"
    break
  else
    echo "Invalid command selection."
  fi
done