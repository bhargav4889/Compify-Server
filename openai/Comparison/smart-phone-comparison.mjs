// smartphone-comparison.mjs

import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyDZ2BLUoAbqFHixj0nLdnzazq9Q4sfnJd8";

export const smartphoneComparison = async (products = []) => {

   if(products.length == 2){
    const [firstProduct, secondProduct] = products;

    // Extract brand and model name for both products
    const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
    const Firstbrand = firstProduct.brand; // Adjust according to your data structure
    const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
    const Secondbrand = secondProduct.brand; // Adjust according to your data structure

    const promptforTwoProduct = `
    Compare the detailed specifications, features, and purchasing options for two products: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
    
    **Strict Warning**: Return the output **only** in the specified JSON array format below. No additional text, explanations, or information outside this JSON structure. The output should begin directly with an array of JSON objects, without any symbols such as \`json\`, \`\`\`, or markdown syntax.
    
    **Important Note**: Use the search URLs provided below for **amazonLink** and **flipkartLink**. Replace "productName" with the actual product name to lead to a search results page for the product on Amazon and Flipkart India.
    
    Link formats:
    - **Flipkart**: https://www.flipkart.com/search?q=productName
    - **Amazon**: https://www.amazon.in/s?k=productName
    
    For **IP Rating**, return it as:
    - "IP Rating": { "Rating": "..." }
    
    Return an array of JSON objects, with each object containing the following details:
    
    1. **productName**: Full product name.
    2. **brand**: Brand of the product.
    3. **specifications**: An object with detailed specifications, covering:
        - **Display**: Size & Resolution, Display Type, Glass Type, Notch (Yes/No)
        - **Memory & Storage**: RAM, Storage, Expandable memory (Yes/No, Card Slot availability)
        - **Processor & Performance**: CPU, Chipset, GPU
        - **Build & Dimensions**: Weight, Thickness, Dimensions, Available colors
        - **Battery**: Type, Capacity, Fast Charging (Yes/No), Wireless Charging (Yes/No)
        - **SIM & Connectivity**: SIM Type, Dual SIM support, Network compatibility, VoLTE (Yes/No), Wi-Fi version, Bluetooth version, USB type
        - **Security**: Fingerprint Sensor (Yes/No), Face Unlock (Yes/No)
        - **IP Rating**: { "Rating": "..." }
        - **Camera System**: Front and Rear Camera resolutions, Wide and Dual Camera support (Yes/No), Video resolution, Flashlight type
        - **Product Information**: Release Date, Special Features
    
    4. **priceandsuggestion**: 
        - **price**: Current Indian price.
        - **amazonLink**: Use the Amazon link format provided above.
        - **flipkartLink**: Use the Flipkart link format provided above.
        - **offers**: Available offers on Amazon and Flipkart.
        - **recommendation**: Suggested product recommendation.
    
    Example output:
    
    [
        {
            "productName": "Product A",
            "brand": "Brand A",
            "specifications": {
                "Display": { ... },
                "Memory & Storage": { ... },
                "Processor & Performance": { ... },
                "Build & Dimensions": { ... },
                "Battery": { ... },
                "SIM & Connectivity": { ... },
                "Security": { ... },
                "IP Rating": { "Rating": "..." },
                "Camera System": { ... },
                "Product Information": { ... }
            },
            "priceandsuggestion": {
                "price": "Price in INR",
                "amazonLink": "https://www.amazon.in/s?k=productName",
                "flipkartLink": "https://www.flipkart.com/search?q=productName",
                "offers": "Best offers",
                "recommendation": "Suggested product"
            }
        },
        {
            "productName": "Product B",
            "brand": "Brand B",
            "specifications": {
                "Display": { ... },
                "Memory & Storage": { ... },
                "Processor & Performance": { ... },
                "Build & Dimensions": { ... },
                "Battery": { ... },
                "SIM & Connectivity": { ... },
                "Security": { ... },
                "IP Rating": { "Rating": "..." },
                "Camera System": { ... },
                "Product Information": { ... }
            },
            "priceandsuggestion": {
                "price": "Price in INR",
                "amazonLink": "https://www.amazon.in/s?k=productName",
                "flipkartLink": "https://www.flipkart.com/search?q=productName",
                "offers": "Best offers",
                "recommendation": "Suggested product"
            }
        }
    ];
    
    **Final Warning**: Ensure the output is a valid JSON array. Any non-JSON format or parsing error will be unacceptable.
    `;
    

try {
  const response = await axios.post(
      `${baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      { 
          
          contents: [{ parts: [{ text: promptforTwoProduct }] }]
      },
      {
          headers: { 'Content-Type': 'application/json' }
      }
  );


  let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  
 

  const comparisonData = JSON.parse(aiResponse);

  // Ensure the comparison data is in the desired format and return it
  return Array.isArray(comparisonData) ? comparisonData : [];

  
} catch (error) {
  console.error("Error generating comparison:", error);
  throw error;
}
}

else if(products.length == 3){
  const [firstProduct, secondProduct, thirdProduct] = products;

// Extract brand and model name for each product
const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
const Firstbrand = firstProduct.brand; // Adjust according to your data structure
const SecondProduct = secondProduct.modelName; // Adjust according to your data structure
const Secondbrand = secondProduct.brand; // Adjust according to your data structure
const ThirdProduct = thirdProduct.modelName; // Adjust according to your data structure
const Thirdbrand = thirdProduct.brand; // Adjust according to your data structure

const promptforThreeProducts = `
Compare the detailed specifications, features, and purchasing options for three products: **${FirstProduct}** by **${Firstbrand}**, **${SecondProduct}** by **${Secondbrand}**, and **${ThirdProduct}** by **${Thirdbrand}**.

**Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.

**Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the product on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.

Use these formats for the links:

- **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
- **Amazon Link Format**: https://www.amazon.in/s?k=productName

For the **IP Rating**, please return the format as:

- "IP Rating": { "Rating": "..." }

Return the comparison as an array of JSON objects, where each object corresponds to a product and contains the following details:

1. **productName**: The full product name.
2. **brand**: The brand of the product.
3. **specifications**: An object containing detailed specifications covering the following aspects:
   - **Display**:
     - Size & Resolution
     - Display Type (e.g., OLED, LCD) and whether it supports touch functionality
     - Glass Type
     - Notch presence (Yes/No)

   - **Memory & Storage**:
     - RAM (in GB)
     - Storage capacity (in GB)
     - Expandable memory options (Yes/No, Card Slot availability)

   - **Processor & Performance**:
     - CPU (Processor details)
     - Chipset model
     - GPU details

   - **Build & Dimensions**:
     - Weight
     - Thickness
     - Dimensions
     - Available colors

   - **Battery**:
     - Type and Capacity
     - Fast Charging (Yes/No)
     - Wireless Charging (Yes/No)

   - **SIM & Connectivity**:
     - SIM Type and Dual SIM support
     - Network compatibility (GPRS, 2G, 3G, 4G, 5G)
     - VoLTE support (Yes/No)
     - Wi-Fi version
     - Bluetooth version
     - USB type and related features

   - **Security**:
     - Fingerprint Sensor (Yes/No)
     - Face Unlock (Yes/No)

   - **IP Rating**:
     - "IP Rating": { "Rating": "..." }

   - **Camera System**:
     - Front and Rear Camera resolutions
     - Wide Camera support (Yes/No)
     - Dual Camera support (Yes/No)
     - Video recording resolution
     - Flashlight type

   - **Product Information**:
     - Release Date
     - Special Features

4. **priceandsuggestion**:
   - **price**: Current Indian price.
   - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
   - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
   - **offers**: Best offers available on Amazon and Flipkart.
   - **recommendation**: Provide recommendations for all three products.

The final output should look like this:

[
  {
    "productName": "Product A",
    "brand": "Brand A",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  {
    "productName": "Product B",
    "brand": "Brand B",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  {
    "productName": "Product C",
    "brand": "Brand C",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  "priceandsuggestion": {
    "price": "Finf  products price in INR",
    "amazonLink": "https://www.amazon.in/s?k=productname",
    "flipkartLink": "https://www.flipkart.com/search?q=productname",
    "offers": "Best offers",
    "recommendation": "Suggested product"
  }
];
`;




try {
  const response = await axios.post(
      `${baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      { 
          
          contents: [{ parts: [{ text: promptforThreeProducts }] }]
      },
      {
          headers: { 'Content-Type': 'application/json' }
      }
  );


  let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  const comparisonData = JSON.parse(aiResponse);

  // Ensure the comparison data is in the desired format and return it
  return Array.isArray(comparisonData) ? comparisonData : [];

  
} catch (error) {
  console.error("Error generating comparison:", error);
  throw error;
}

} 

else if(products.length == 4){
  const [firstProduct, secondProduct, thirdProduct, forthProduct] = products;

// Extract brand and model name for each product
const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
const Firstbrand = firstProduct.brand; // Adjust according to your data structure
const SecondProduct = secondProduct.modelName; // Adjust according to your data structure
const Secondbrand = secondProduct.brand; // Adjust according to your data structure
const ThirdProduct = thirdProduct.modelName; // Adjust according to your data structure
const Thirdbrand = thirdProduct.brand; // Adjust according to your data structure
const Fourthbrand = forthProduct.brand;
const FourthProduct = forthProduct.modelName; 

const promptforFourProducts = `
Compare the detailed specifications, features, and purchasing options for four products: **${FirstProduct}** by **${Firstbrand}**, **${SecondProduct}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.

**Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.

**Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the product on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.

Use these formats for the links:

- **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
- **Amazon Link Format**: https://www.amazon.in/s?k=productName

For the **IP Rating**, please return the format as:

- "IP Rating": { "Rating": "..." }

Return the comparison as an array of JSON objects, where each object corresponds to a product and contains the following details:

1. **productName**: The full product name.
2. **brand**: The brand of the product.
3. **specifications**: An object containing detailed specifications covering the following aspects:
   - **Display**:
     - Size & Resolution
     - Display Type (e.g., OLED, LCD) and whether it supports touch functionality
     - Glass Type
     - Notch presence (Yes/No)

   - **Memory & Storage**:
     - RAM (in GB)
     - Storage capacity (in GB)
     - Expandable memory options (Yes/No, Card Slot availability)

   - **Processor & Performance**:
     - CPU (Processor details)
     - Chipset model
     - GPU details

   - **Build & Dimensions**:
     - Weight
     - Thickness
     - Dimensions
     - Available colors

   - **Battery**:
     - Type and Capacity
     - Fast Charging (Yes/No)
     - Wireless Charging (Yes/No)

   - **SIM & Connectivity**:
     - SIM Type and Dual SIM support
     - Network compatibility (GPRS, 2G, 3G, 4G, 5G)
     - VoLTE support (Yes/No)
     - Wi-Fi version
     - Bluetooth version
     - USB type and related features

   - **Security**:
     - Fingerprint Sensor (Yes/No)
     - Face Unlock (Yes/No)

   - **IP Rating**:
     - "IP Rating": { "Rating": "..." }

   - **Camera System**:
     - Front and Rear Camera resolutions
     - Wide Camera support (Yes/No)
     - Dual Camera support (Yes/No)
     - Video recording resolution
     - Flashlight type

   - **Product Information**:
     - Release Date
     - Special Features

4. **priceandsuggestion**:
   - **price**: Current Indian price.
   - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
   - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
   - **offers**: Best offers available on Amazon and Flipkart.
   - **recommendation**: Provide recommendations for all four products.

The final output should look like this:

[
  {
    "productName": "Product A",
    "brand": "Brand A",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  {
    "productName": "Product B",
    "brand": "Brand B",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  {
    "productName": "Product C",
    "brand": "Brand C",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  {
    "productName": "Product D",
    "brand": "Brand D",
    "specifications": {
        "Display": { ... },
        "Memory & Storage": { ... },
        "Processor & Performance": { ... },
        "Build & Dimensions": { ... },
        "Battery": { ... },
        "SIM & Connectivity": { ... },
        "Security": { ... },
        "IP Rating": { ... },
        "Camera System": { ... },
        "Product Information": { ... }
    }
  },
  "priceandsuggestion": {
    "price": "Find products price in INR",
    "amazonLink": "https://www.amazon.in/s?k=productName",
    "flipkartLink": "https://www.flipkart.com/search?q=productName",
    "offers": "Best offers",
    "recommendation": "Suggested product"
  }
];
`;

try {
  const response = await axios.post(
      `${baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      { 
          
          contents: [{ parts: [{ text: promptforFourProducts }] }]
      },
      {
          headers: { 'Content-Type': 'application/json' }
      }
  );


  let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  const comparisonData = JSON.parse(aiResponse);

  // Ensure the comparison data is in the desired format and return it
  return Array.isArray(comparisonData) ? comparisonData : [];

  
} catch (error) {
  console.error("Error generating comparison:", error);
  throw error;
}
}
};

