import express from 'express';
import cors from 'cors';

import { scrapeAmazonProducts } from './scraper/scraper';

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword as string | undefined;

  if (!keyword) {
    return res.status(400).json({ error: 'Missing required query parameter: keyword' });
  }

  try {
    const scrapeResult = await scrapeAmazonProducts(keyword);
    res.status(200).json(scrapeResult);
  } catch (error) {
    console.error('Error in /api/scrape:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ error: 'Failed to scrape Amazon products' });
  }
});

app.listen(PORT, () => {
  console.log(`Amazon Scraper API running on http://localhost:${PORT}`);
  console.log(`Usage: http://localhost:${PORT}/api/scrape?keyword=ps5`);
});

