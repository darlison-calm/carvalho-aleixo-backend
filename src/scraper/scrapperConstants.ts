import type { ScrapeConfig, ScrapingSelectors } from "../type";

export const DEFAULT_CONFIG: ScrapeConfig = {
    maxProducts: 60,
    timeout: 10000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

export const SELECTORS: ScrapingSelectors = {
    product: [
        '[data-component-type="s-search-result"]',
        '.s-result-item[data-component-type="s-search-result"]',
        '.s-result-item',
        '[data-asin]:not([data-asin=""])'
    ],
    title: [
        'h2 a span',
        'h2 span',
        '.a-size-medium span',
        '.a-size-base-plus',
        '[data-cy="title-recipe-title"]',
        'h2 .a-text-normal'
    ],
    rating: [
        '[aria-label*="out of 5 stars"]',
        '[aria-label*="stars"]',
        '.a-icon-alt',
        '.a-offscreen'
    ],
    reviews: [
        '[aria-label*="stars"] + a',
        'a[href*="customerReviews"]',
        '.a-size-base',
        'span.a-size-base'
    ],
    image: [
        'img.s-image',
        '.s-product-image-container img',
        'img[data-image-latency]',
        'img'
    ]
};
