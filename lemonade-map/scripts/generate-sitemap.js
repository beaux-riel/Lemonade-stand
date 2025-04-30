/**
 * Script to generate a sitemap.xml file for the application
 */

const fs = require('fs');
const path = require('path');

// Get the base URL from package.json or use default
let baseUrl = 'https://beaux-riel.github.io/Lemonade-stand';
try {
  const packageJson = require('../package.json');
  if (packageJson.homepage) {
    baseUrl = packageJson.homepage.replace(/\/$/, '');
  }
} catch (e) {
  console.warn('Could not read package.json:', e);
}

// Define the routes for the sitemap
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/login', priority: '0.8', changefreq: 'monthly' },
  { path: '/register', priority: '0.8', changefreq: 'monthly' },
  { path: '/seller/dashboard', priority: '0.9', changefreq: 'weekly' },
  { path: '/seller/stands/new', priority: '0.7', changefreq: 'monthly' },
];

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Generate the sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Ensure the public directory exists
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the sitemap to the public directory
const outputPath = path.resolve(publicDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

// Also write to the dist directory if it exists (for direct deployment)
const distDir = path.resolve(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  const distOutputPath = path.resolve(distDir, 'sitemap.xml');
  fs.writeFileSync(distOutputPath, sitemap);
  console.log(`Sitemap also copied to ${distOutputPath}`);
}

console.log(`Sitemap generated at ${outputPath}`);