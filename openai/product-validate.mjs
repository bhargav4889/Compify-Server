import axios from "axios";

const baseURL = "https://generativelanguage.googleapis.com/v1";
const apiKey = "AIzaSyB75aUE2CnMBvF19Yl0GBO9s_hRwioHKz0";

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env file");
}

export const productvalidator = async (productType, brand, productName) => {
  try {
    let prompt = "";

    switch (productType) {
      case "Mobile":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a mobile phone within the brand "${brand}"?`;
        break;

      case "TV":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a smart TV within the brand "${brand}"?`;
        break;

      case "AC":
        prompt = `Answer only "true" or "false": Is the product "${productName}" an air conditioner within the brand "${brand}"?`;
        break;

      case "Smart-Watch":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a smart watch within the brand "${brand}"?`;
        break;

      case "Bluetooth-Device":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a Bluetooth device (such as earbuds, speakers, etc.) within the brand "${brand}"?`;
        break;

      case "Laptop":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a laptop within the brand "${brand}"?`;
        break;

      case "Washing-Machine":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a washing machine within the brand "${brand}"?`;
        break;

      case "Refrigerator":
        prompt = `Answer only "true" or "false": Is the product "${productName}" a refrigerator within the brand "${brand}"?`;
        break;

      default:
        return false;
    }

     const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
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
        },
        timeout: 10000
      }
    );

    const aiResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiResponse) {
      console.error("Unexpected response format:", response.data);
      return false;
    }

    // Strict boolean parsing
    const normalized = aiResponse.toLowerCase().replace(/[^a-z]/g, "");

    return normalized === "true";

  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};





