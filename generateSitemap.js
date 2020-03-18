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
const crawler = generator.getCrawler();
const sitemap = generator.getSitemap();

// Add static URL on crawl init.
crawler.on('crawlstart', () => {
  sitemap.addURL('/products')
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.info("site map created")
});

generator.start();

