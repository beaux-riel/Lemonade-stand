#!/bin/bash

# Script to deploy the application to GitHub Pages

# Exit on error
set -e

# Build the application
echo "Building the application..."
npm run build

# Create a temporary directory for deployment
echo "Creating temporary directory for deployment..."
mkdir -p tmp-deploy

# Copy the build files to the temporary directory
echo "Copying build files..."
cp -r dist/* tmp-deploy/

# Move to the temporary directory
cd tmp-deploy

# Create a git repository
echo "Initializing git repository..."
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add all files
git add .

# Commit the changes
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
echo "Pushing to gh-pages branch..."
git push -f "https://${GITHUB_TOKEN}@github.com/beaux-riel/Lemonade-stand.git" master:gh-pages

# Clean up
echo "Cleaning up..."
cd ..
rm -rf tmp-deploy

echo "Deployment complete!"