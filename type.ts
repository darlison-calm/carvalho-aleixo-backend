export interface ScrapeConfig {
  maxProducts?: number;
  timeout?: number;
  userAgent?: string;
}

export interface ScrapingSelectors {
  product: string[];
  title: string[];
  rating: string[];
  reviews: string[];
  image: string[];
}