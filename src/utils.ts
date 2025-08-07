export function extractRating(ratingText: string): number | null {
    if (!ratingText) return null;

    const match = ratingText.match(/(\d+[.,]\d+|\d+)/);
    return match ? parseFloat(match[1]!.replace(',', '.')) : null;
}

export function extractReviewCount(reviewText: string): number {
    if (!reviewText) return 0;

    const match = reviewText.replace(/,/g, '').match(/(\d+)/);
    return match ? parseInt(match[1]!, 10) : 0;
}

export function getAbsoluteUrl(url: string | null, baseUrl = 'https://www.amazon.com'): string | null {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('/')) return baseUrl + url;
    return baseUrl + '/' + url;
}

export function findElementsBySelectors(parent: Document | Element, selectors: string[]): Element[] {
    for (const selector of selectors) {
        const elements = Array.from(parent.querySelectorAll(selector));
        if (elements.length > 0) {
            return elements;
        }
    }
    return [];
}

export function findElementBySelectors(parent: Element, selectors: string[]): Element | null {
    for (const selector of selectors) {
        const element = parent.querySelector(selector);
        if (element) return element;
    }
    return null;
}