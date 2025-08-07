```markdown
# Amazon Scraper API

This project is a TypeScript-based Express API that scrapes product data from Amazon search results. It provides an endpoint (`/api/scrape`) to fetch product details like title, rating, review count, and image URL for a given search keyword.

## Features
- Scrapes Amazon search results for a specified keyword.
- Returns structured JSON data with product details.
- Handles errors gracefully with appropriate HTTP status codes.
- Modularized codebase with TypeScript for type safety.

## Prerequisites
- **Bun**: JavaScript runtime.
- **TypeScript**: Installed globally or as a dev dependency (included in `package.json`).

## Installation
1. Clone the repository or copy the project files to your local machine.
   ```bash
   git clone <repository-url>
   cd carvalho-aleixo-backend
   ```
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Ensure the project structure matches:
   ```
   project/
   ├── src/
   │   ├── scraper/
   │   │   ├── scraper.ts
   │   │   └── scrapperConstants.ts
   │   ├── types/
   │   │   └── types.ts
   │   ├── utils/
   │   │   └── utils.ts
   │   └── index.ts
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```

## Running the Application
1. Run the server using Bun:
   ```bash
   bun run src/index.ts
   ```

## Usage
The API provides a single endpoint: `GET /api/scrape`.

### Endpoint
- **URL**: `http://localhost:3000/api/scrape?keyword=<your-keyword>`
- **Method**: GET
- **Query Parameter**:
  - `keyword` (required): The search term to query on Amazon (e.g., `ps5`, `laptop`).
- **Response**:
  - **Success (200)**:
    ```json
    {
      "products": [
        {
          "title": "Example Product",
          "rating": 4.5,
          "reviewCount": 120,
          "imageUrl": "https://example.com/image.jpg"
        },
        // ...
      ],
      "totalFound": 5,
      "keyword": "ps5",
      "timestamp": "2025-08-06T22:06:00.000Z"
    }
    ```
  - **Error (400)**: If `keyword` is missing:
    ```json
    { "error": "Missing required query parameter: keyword" }
    ```
  - **Error (500)**: If scraping fails:
    ```json
    { "error": "Failed to scrape Amazon products" }
    ```

### Example Requests
- Using `curl`:
  ```bash
  curl http://localhost:3000/api/scrape?keyword=ps5
  ```
- Using a browser or tool like Postman:
  - Navigate to `http://localhost:3000/api/scrape?keyword=laptop`.

## Configuration
- **Environment Variables**:
  - `PORT`: Specify the port for the server (default: `3000`).
    ```bash
    export PORT=8080
    ```
- **Scraper Settings**:
  - Edit `src/scraper/constants.ts` to modify `DEFAULT_CONFIG` (e.g., `userAgent`, `maxProducts`, `timeout`) or `SELECTORS` for different .
  - Example:
    ```typescript
    export const DEFAULT_CONFIG = {
      userAgent: 'Mozilla/5.0 ...',
      maxProducts: 10,
      timeout: 30000,
    };
    - `maxProducts`: Defines the maximum number of products the scraper will attempt to extract during a single run.

    ```

## Notes
- The scraper targets Amazon's search results page (`https://www.amazon.com/s?k=<keyword>`). Ensure the `SELECTORS` in `src/scraper/constants.ts` match Amazon’s current HTML structure, as it may change.
- Error handling is implemented to skip invalid products and log issues to the console.

## Troubleshooting
- **Build Errors**: Ensure all dependencies are installed (`bun install`) and TypeScript is configured correctly (`tsconfig.json`).
- **Port Conflicts**: If port `3000` is in use, set a different `PORT` environment variable.

## Dependencies
- `express`: Web framework for the API.
- `axios`: HTTP client for fetching Amazon pages.
- `jsdom`: DOM parser for HTML processing.
- `cors`: Enables cross-origin requests.
```