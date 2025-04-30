# GitHub Pages Deployment Fix

This document outlines the changes made to fix the GitHub Pages deployment that was resulting in a blank white page.

## Issues Identified

1. **Incorrect Base Path**: The application was using `/Lemonade-stand/` as the base path in the built assets, but the repository name is `Lemonade-Map`.

2. **Custom Domain Configuration**: The CNAME file had a placeholder domain (`lemonade-stand.example.com`) instead of the actual domain (`lemonademap.com`).

3. **Path Segments in 404.html**: The 404.html file was configured for a GitHub Pages project site, but we're using a custom domain, so the `pathSegmentsToKeep` needed to be set to 0.

4. **Homepage Configuration**: The `homepage` field in package.json was set to GitHub Pages URL instead of the custom domain.

## Changes Made

1. **Updated package.json**:

   - Changed `homepage` from `https://beaux-riel.github.io/Lemonade-Map/` to `https://lemonademap.com/`

2. **Updated CNAME files**:

   - Set both `/public/CNAME` and `/dist/CNAME` to `lemonademap.com`

3. **Fixed Asset Paths in index.html**:

   - Changed paths from `/Lemonade-stand/assets/...` to `/assets/...`

4. **Updated 404.html Configuration**:

   - Set `pathSegmentsToKeep` to 0 for custom domain support

5. **Enhanced vite.config.js**:

   - Improved the `getBase()` function to properly detect custom domains
   - Added logic to check for CNAME file to determine if a custom domain is being used

6. **Updated Root index.html**:
   - Changed the redirect path to use the root path (`/`) instead of a relative path

## Deployment Process

After making these changes, we:

1. Rebuilt the application with `npm run build`
2. Created a deployment script (`deploy-fix.sh`) to push the changes to a new branch
3. Documented the changes in this file

## Future Considerations

To prevent this issue from recurring:

1. Always ensure the CNAME file contains the correct domain
2. Make sure the `homepage` field in package.json matches your deployment URL
3. When using a custom domain with GitHub Pages, set `pathSegmentsToKeep` to 0 in the 404.html file
4. Verify that asset paths in the built index.html file are correct before deployment
