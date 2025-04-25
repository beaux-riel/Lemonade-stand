# CI/CD Pipeline Setup

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline set up for the Lemonade Stand application using GitHub Actions.

## Overview

The CI/CD pipeline automates the following processes:
1. Running tests on pull requests
2. Building and optimizing the production bundle
3. Deploying to GitHub Pages when changes are merged to the main branch

## Workflow Files

### 1. Test Pull Requests (`.github/workflows/test-pr.yml`)

This workflow runs on every pull request to the `main` branch and performs the following steps:
- Checks out the code
- Sets up Node.js environment
- Installs dependencies
- Runs tests
- Verifies that the application builds successfully

### 2. Deploy to GitHub Pages (`.github/workflows/deploy.yml`)

This workflow runs on pushes to the `main` branch and performs the following steps:
- Checks out the code
- Sets up Node.js environment
- Installs dependencies
- Runs tests
- Builds the production bundle with optimizations
- Deploys the built application to GitHub Pages

## GitHub Pages Configuration

The application is configured to work correctly when deployed to GitHub Pages:

1. **Base URL Handling**: The application detects when it's running on GitHub Pages and adjusts the base URL accordingly.

2. **SPA Routing**: Since GitHub Pages doesn't natively support single-page application routing, we've implemented a workaround:
   - A custom 404.html page that redirects to the main application with the requested path in the query string
   - JavaScript in index.html that reads the path from the query string and uses history.replaceState to set the correct URL

3. **Asset Paths**: All asset paths are configured to work with the GitHub Pages base URL.

## How to Use

### For Developers

1. **Making Changes**:
   - Create a feature branch from `main`
   - Make your changes
   - Push your branch and create a pull request

2. **Pull Request Process**:
   - The `test-pr.yml` workflow will automatically run tests on your pull request
   - Review the test results in the GitHub Actions tab
   - Address any test failures before merging

3. **Deployment**:
   - When a pull request is merged to `main`, the `deploy.yml` workflow will automatically:
     - Run tests
     - Build the application
     - Deploy to GitHub Pages

### For Administrators

1. **Monitoring Deployments**:
   - View deployment status in the GitHub Actions tab
   - Check deployment logs for any issues

2. **Manual Deployment**:
   - If needed, you can manually trigger the deployment workflow from the Actions tab

## Troubleshooting

### Common Issues

1. **Failed Tests**:
   - Check the test logs in the GitHub Actions tab
   - Run tests locally to reproduce and fix the issue

2. **Build Failures**:
   - Check for syntax errors or missing dependencies
   - Verify that all imports are correct

3. **Deployment Issues**:
   - Ensure the GitHub Pages source is set to the `gh-pages` branch
   - Check that the repository has the correct permissions for GitHub Actions

### Getting Help

If you encounter issues with the CI/CD pipeline:
1. Check the GitHub Actions logs for detailed error messages
2. Review this documentation for configuration details
3. Consult the GitHub Actions and GitHub Pages documentation for general troubleshooting