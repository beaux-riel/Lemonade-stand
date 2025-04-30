---
name: repo
type: repo
agent: CodeActAgent
---

# Lemonade-Map Repository

This repository contains the code for a Lemonade Stand Map application, which is a platform for managing lemonade stands and their products. It's built with React and uses Supabase for backend services.

## General Setup

The application is structured as a React application with Vite as the build tool. It uses GitHub Pages for deployment.

To set up the repository:

1. Clone the repository
2. Install dependencies: `cd lemonade-map && npm install`
3. Start the development server: `npm start`
4. Build for production: `npm run build`

## Repository Structure

- **Root Directory**: Contains documentation files and GitHub Pages configuration
  - `.github/workflows/`: Contains GitHub Actions workflows for CI/CD
  - `lemonade-map/`: Main application directory
  - `supabase/`: Supabase configuration and setup files

### Main Application (`lemonade-map/`)

- **src/**: Source code for the React application
- **public/**: Static assets and HTML template
- **dist/**: Build output directory (generated during build)
- **scripts/**: Utility scripts for deployment and other tasks

### CI/CD Workflows

- **deploy.yml**: Main CI/CD pipeline for testing, building, and deploying to GitHub Pages
- **github-pages.yml**: Alternative GitHub Pages deployment workflow
- **gh-pages-config.yml**: Configuration for GitHub Pages
- **test-pr.yml**: Runs tests on pull requests

### Deployment Process

The application is deployed to GitHub Pages using GitHub Actions. The deployment process:

1. Runs tests
2. Builds the application
3. Deploys the built files to the gh-pages branch
4. Configures GitHub Pages to serve from this branch

### Custom Domain

The application is configured to use a custom domain (lemonademap.com) instead of the default GitHub Pages domain.

## Important Notes

- When making changes to the deployment configuration, ensure that:
  - The CNAME file contains the correct domain
  - The `homepage` field in package.json matches the deployment URL
  - The 404.html file has `pathSegmentsToKeep` set to 0 for custom domain support
  - Asset paths in the built index.html file are correct
