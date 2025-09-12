#!/bin/sh
set -e

# Define the directory where your Angular JS files reside.
TARGET_DIR="/household-devices"

echo "Scanning JavaScript files in ${TARGET_DIR} for placeholders..."

# Iterate over all .js files in the target directory.
find "${TARGET_DIR}" -type f -name "*.js" | while read -r file; do
    file_changed=0
    # Loop over each environment variable by iterating its name.
    for var in $(printenv | cut -d= -f1); do
        value=$(printenv "$var")
        pattern="##{$var}##"
        echo "Processing ${file} to put value ${value}"
        # Check if the file contains the placeholder.
        if grep -q "$pattern" "$file"; then
            # Replace all occurrences of the placeholder with the variable's value.
            sed -i "s|$pattern|${value}|g" "$file"
            file_changed=1
        fi
    done
    # Log the file name if any replacements were made.
    if [ "$file_changed" -eq 1 ]; then
        echo "Replaced patterns in file: $file"
    fi
done

echo "Environment variable substitution completed."

# Start nginx in the foreground.
echo "Starting nginx..."
exec nginx -g 'daemon off;'
