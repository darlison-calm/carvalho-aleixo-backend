import axios from "axios";
import { JSDOM } from 'jsdom';
import { findElementBySelectors, extractRating, extractReviewCount, getAbsoluteUrl, findElementsBySelectors } from "../utils";
import { SELECTORS, DEFAULT_CONFIG } from "./scrapperConstants";
import type { Product, ScrapeResponse } from "../type";

const axiosConfig = {
    headers: {
        'User-Agent': '',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
};

async function fetchAmazonSearchPage(keyword: string, config: typeof axiosConfig): Promise<string> {
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&ref=sr_pg_1`;
    try {
        const response = await axios.get(searchUrl, config);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch Amazon search page: ${error instanceof Error ? error.message : String(error)}`);
    }
}

function extractProductDetails(productElement: Element): Product | null {
    const titleElement = findElementBySelectors(productElement, SELECTORS.title);
    if (!titleElement) return null;
    const title = titleElement.textContent?.trim();
    if (!title) return null;

    const linkElement = titleElement.closest('a');
    const url = linkElement ? getAbsoluteUrl(linkElement.href) : null;

    const ratingElement = findElementBySelectors(productElement, SELECTORS.rating);
    const ratingText = ratingElement?.getAttribute('aria-label') || ratingElement?.textContent || '';
    const rating = extractRating(ratingText);

    const reviewElement = findElementBySelectors(productElement, SELECTORS.reviews);
    const reviewText = reviewElement?.textContent || '';
    const reviewCount = extractReviewCount(reviewText);

    const imageElement = findElementBySelectors(productElement, SELECTORS.image) as HTMLImageElement | null;
    const imageSrc = imageElement?.src || imageElement?.getAttribute('data-src');
    const imageUrl = imageSrc && !imageSrc.includes('transparent-pixel') ? getAbsoluteUrl(imageSrc) : null;

    if (rating !== null || reviewCount > 0 || imageUrl || url) {
        return {
            title,
            rating: rating ?? null,
            reviewCount: reviewCount ?? 0,
            imageUrl: imageUrl ?? null,
            url: url ?? null,
        };
    }
    return null;
}

function parseProductsFromHtml(html: string, maxProducts: number): Product[] {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const productElements = findElementsBySelectors(document, SELECTORS.product);
    const products: Product[] = [];

    for (const productElement of productElements.slice(0, maxProducts)) {
        try {
            const product = extractProductDetails(productElement);
            if (product) {
                products.push(product);
            }
        } catch (error) {
            console.error('Error parsing product:', error instanceof Error ? error.message : String(error));
        }
    }

    return products;
}

export async function scrapeAmazonProducts(keyword: string, config = {}): Promise<ScrapeResponse> {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const requestConfig = {
        ...axiosConfig,
        headers: { ...axiosConfig.headers, 'User-Agent': mergedConfig.userAgent! },
        timeout: mergedConfig.timeout,
    };

    try {
        const html = await fetchAmazonSearchPage(keyword, requestConfig);
        const products = parseProductsFromHtml(html, mergedConfig.maxProducts!);
        return {
            products,
            totalFound: products.length,
            keyword,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        throw new Error(`Failed to scrape Amazon: ${error instanceof Error ? error.message : String(error)}`);
    }
}