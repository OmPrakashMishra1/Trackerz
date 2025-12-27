import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const response = await firecrawl.extract({
      urls: [url],
      prompt:
        "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
      schema: {
        type: "object",
        properties: {
          productName: { type: "string" },
          currentPrice: { type: "number" },
          currencyCode: { type: "string" },
          productImageUrl: { type: "string" },
        },
        required: ["productName", "currentPrice"],
      },
    });

    const data = response.data;

    if (!data || !data.productName) {
      throw new Error("No product data extracted");
    }

    return data;
  } catch (error) {
    console.error("Firecrawl extract error:", error);
    throw new Error(`Failed to extract product data: ${error.message}`);
  }
}
