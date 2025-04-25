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

# Ensure 404.html is present for client-side routing
echo "Ensuring 404.html is present..."
if [ -f "public/404.html" ]; then
  cp public/404.html tmp-deploy/
fi

# Ensure CNAME file is present if it exists
if [ -f "public/CNAME" ]; then
  echo "Copying CNAME file..."
  cp public/CNAME tmp-deploy/
fi

# Create a .nojekyll file to disable Jekyll processing
echo "Creating .nojekyll file to disable Jekyll processing..."
touch tmp-deploy/.nojekyll

# Create an index.html file at the root if it doesn't exist
if [ ! -f "tmp-deploy/index.html" ]; then
  echo "Creating index.html file..."
  cat > tmp-deploy/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="./favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta
    name="description"
    content="Lemonade Stand - A platform for managing lemonade stands and their products"
  />
  <link rel="apple-touch-icon" href="./logo192.png" />
  <link rel="manifest" href="./manifest.json" />
  <title>Lemonade Stand</title>
  
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    // When the single page app is loaded further down in this file,
    // the correct url will be waiting in the browser's history for
    // the single page app to route accordingly.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script type="module" src="./assets/js/index-D8KjxLH4.js"></script>
</body>
</html>
EOL
fi

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
echo "Your site should be available at https://beaux-riel.github.io/Lemonade-stand/"
echo "If you encounter a blank page, please check the GitHub repository settings:"
echo "1. Go to Settings > Pages"
echo "2. Ensure the source is set to 'Deploy from a branch'"
echo "3. Ensure the branch is set to 'gh-pages' and the folder is set to '/ (root)'"