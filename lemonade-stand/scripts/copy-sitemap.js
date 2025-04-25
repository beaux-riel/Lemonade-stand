/**
 * Script to copy the sitemap.xml file from public to dist directory
 */

const fs = require('fs');
const path = require('path');

// Define paths
const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');
const sitemapSource = path.resolve(publicDir, 'sitemap.xml');
const sitemapDest = path.resolve(distDir, 'sitemap.xml');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run build first.');
  process.exit(1);
}

// Check if sitemap exists in public directory
if (!fs.existsSync(sitemapSource)) {
  console.error('Error: sitemap.xml not found in public directory. Generate it first.');
  process.exit(1);
}

// Copy the sitemap
try {
  fs.copyFileSync(sitemapSource, sitemapDest);
  console.log(`Successfully copied sitemap.xml to ${sitemapDest}`);
} catch (error) {
  console.error('Error copying sitemap:', error);
  process.exit(1);
}