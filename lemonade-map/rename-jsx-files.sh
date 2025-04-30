#!/bin/bash

# Find all .js files containing JSX syntax and rename them to .jsx
find src -name "*.js" -type f -exec grep -l "<.*>" {} \; | while read file; do
  new_file="${file%.js}.jsx"
  echo "Renaming $file to $new_file"
  mv "$file" "$new_file"
done

# Update imports in all .jsx files
find src -name "*.jsx" -type f -exec sed -i 's/from \(["'\'']\)\.\(.*\)\.js\(["'\'']\)/from \1\.\2\.jsx\3/g' {} \;