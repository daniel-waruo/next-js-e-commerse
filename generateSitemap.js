const SitemapGenerator = require('sitemap-generator');

const site = 'https://next-js-e-commerse.now.sh/';

const generator = SitemapGenerator(
  site, {
    maxDepth: 0,
    filepath: './public/sitemap.xml',
    maxEntriesPerFile: 50000,
    stripQuerystring: false
  }
);

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.info("site map created")
});

generator.start();

