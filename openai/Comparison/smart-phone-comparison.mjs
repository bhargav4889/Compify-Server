// smartphone-comparison.mjs

import axios from "axios";

const apiKey = "AIzaSyB75aUE2CnMBvF19Yl0GBO9s_hRwioHKz0";


export const smartphoneComparison = async (products = []) => {
  if (!Array.isArray(products) || products.length < 2) {
    return [];
  }

  try {
    // 🧠 Build product description dynamically
    const productListText = products
      .map(
        (p, index) =>
          `${index + 1}. ${p.modelName} by ${p.brand}`
      )
      .join("\n");

    const prompt = `
Compare the following smartphone products:

${productListText}

Return ONLY a valid JSON array.
Do not add markdown, explanation, or extra text.

Each product object must contain:

{
  "productName": "",
  "brand": "",
  "specifications": {
    "Display": {},
    "Memory & Storage": {},
    "Processor & Performance": {},
    "Build & Dimensions": {},
    "Battery": {},
    "SIM & Connectivity": {},
    "Security": {},
    "IP Rating": { "Rating": "" },
    "Camera System": {},
    "Product Information": {}
  },
  "priceandsuggestion": {
    "price": "",
    "amazonLink": "",
    "flipkartLink": "",
    "offers": "",
    "recommendation": ""
  }
}

Important:
- amazonLink must be: https://www.amazon.in/s?k=productName
- flipkartLink must be: https://www.flipkart.com/search?q=productName
- Output must be valid JSON.
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        }
      }
    );

    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiText) return [];

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.error("Invalid JSON returned by AI:");
      console.error(aiText);
      return [];
    }

    return Array.isArray(parsed) ? parsed : [];

  } catch (error) {
    console.error("Comparison API Error:", error.code || error.message);
    return [];
  }
};



