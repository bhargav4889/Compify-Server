import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyDZ2BLUoAbqFHixj0nLdnzazq9Q4sfnJd8";

export const productvalidator = async (productType, brand, productName) => {
  try {
    let prompt = ""; // Use let instead of const

    // Set the prompt based on the product type
    if (productType === "Mobile") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a mobile phone within the brand "${brand}"?`;
    } else if (productType === "TV") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a smart TV within the brand "${brand}"?`;
    } else if (productType === "AC") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" an air conditioner within the brand "${brand}"?`;
    } else if (productType === "Smart-Watch") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a smart watch within the brand "${brand}"?`;
    } else if (productType === "Bluetooth-Device") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a Bluetooth device (such as earbuds, speakers, etc.) within the brand "${brand}"?`;
    } else if (productType === "Laptop") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a laptop within the brand "${brand}"?`;
    } else if (productType === "Washing-Machine") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a washing machine within the brand "${brand}"?`;
    } else if (productType === "Refrigerator") {
      prompt = `Answer only "true" or "false": Is the product "${productName}" a refrigerator within the brand "${brand}"?`;
    }

    const response = await axios.post(
      `${baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiResponse) {
      throw new Error("Unexpected response format from Gemini API");
    }

   

    return aiResponse.toLowerCase() === "true"; // Returns true or false based on the response

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return false; // Returns false if there's an error
  }
};

