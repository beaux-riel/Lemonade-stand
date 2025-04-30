# GitHub Pages Deployment Setup

This document outlines the configuration for deploying the Lemonade Stand application to GitHub Pages.

## Configuration Overview

The application is configured to be deployed to GitHub Pages with the following settings:

1. **Base URL**: The application is configured to work with the GitHub Pages URL structure (`https://beaux-riel.github.io/Lemonade-map/`).

2. **Custom Domain**: If you want to use a custom domain, the CNAME file is already set up with a placeholder domain (`lemonade-map.example.com`). You'll need to update this with your actual domain.

3. **Routing**: The application uses client-side routing with React Router, which is configured to work with GitHub Pages through special handling in the 404.html file.

## Deployment Methods

There are two ways to deploy the application to GitHub Pages:

### 1. Automatic Deployment via GitHub Actions

The CI/CD pipeline is configured to automatically deploy the application to GitHub Pages when changes are merged to the main branch. This is handled by the `.github/workflows/deploy.yml` workflow.

### 2. Manual Deployment

You can also manually deploy the application using the provided npm script:

```bash
npm run deploy
```

This script builds the application and pushes the built files to the `gh-pages` branch.

## Custom Domain Setup

To use a custom domain with GitHub Pages:

1. Update the CNAME file in the `public` directory with your domain name:

```
your-custom-domain.com
```

2. Configure your domain's DNS settings:

   - For an apex domain (e.g., `example.com`), create A records pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For a subdomain (e.g., `www.example.com`), create a CNAME record pointing to your GitHub Pages site (`beaux-riel.github.io`).

3. In your GitHub repository settings:
   - Go to Settings > Pages
   - Under "Custom domain", enter your domain name
   - Check "Enforce HTTPS" if you want to enable HTTPS (recommended)

## Troubleshooting

### Common Issues

1. **404 Errors on Page Refresh**: If you encounter 404 errors when refreshing pages, ensure that the 404.html file is properly configured and that the GitHub Pages source is set to the `gh-pages` branch.

2. **Custom Domain Not Working**: If your custom domain is not working, check:

   - DNS propagation (can take up to 48 hours)
   - Correct DNS records
   - CNAME file in the repository
   - GitHub repository settings

3. **Routing Issues**: If routes are not working correctly, ensure that:
   - The `basename` is correctly set in the Router component
   - The 404.html redirect script is working properly
   - The `homepage` field in package.json is correctly set

### Getting Help

If you encounter issues with GitHub Pages deployment:

1. Check the GitHub Actions logs for detailed error messages
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Ensure your repository has the correct permissions for GitHub Actions
