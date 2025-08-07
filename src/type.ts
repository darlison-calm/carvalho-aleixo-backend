export interface ScrapeConfig {
  maxProducts?: number;
  timeout: number;
  userAgent?: string;
}

export interface ScrapingSelectors {
  product: string[];
  title: string[];
  rating: string[];
  reviews: string[];
  image: string[];
}

export interface Product {
  title: string;
  rating: number | null;
  reviewCount: number;
  imageUrl: string | null;
  url: string | null;
}

export interface ScrapeResponse {
  products: Product[];
  totalFound: number;
  keyword: string;
  timestamp: string;
}

export interface ProductParsingData {
  title?: string;
  rating?: number | null;
  reviewCount?: number;
  imageUrl?: string | null;
}

