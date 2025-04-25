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

// Write the sitemap to the public directory
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`Sitemap generated at ${outputPath}`);