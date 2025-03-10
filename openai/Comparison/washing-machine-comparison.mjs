import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyCfmu-PMGP2ZuKlgRMEWNa0m9feROp0uG8";

export const washingMachinceComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two Washing Machines: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the washing machine on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
    
        **Strict Warning**: Please focus strictly on specifications relevant to Washing Machines, such as capacity, wash programs, energy rating, and build quality. Exclude any unrelated functionalities.
    
        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
      
        Return the comparison as an array of JSON objects, where each object corresponds to a Washing Machine and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the washing machine.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           
           - **General**:
             - Type (e.g., Front Load, Top Load, Semi-Automatic)
             - Capacity (in kg)
             - Energy Rating (e.g., 5 Star)
             - Inverter Technology (Yes/No)
             - Motor Type (e.g., Direct Drive, Belt Drive)
           
           - **Wash Programs & Features**:
             - Number of Wash Programs
             - Quick Wash (Yes/No, with time if applicable)
             - Spin Speed (in RPM)
             - Pre-Soak Function (Yes/No)
             - Temperature Control (Yes/No)
             - Drum Type (e.g., Stainless Steel)
             - Auto-Restart (Yes/No)
             - Fuzzy Logic (Yes/No)
             - Child Lock (Yes/No)
             - Eco Mode (Yes/No)
    
           - **Smart Features**:
             - Wi-Fi Connectivity (Yes/No)
             - App Compatibility (list compatible apps if applicable)
             - Voice Assistant Support (e.g., Alexa, Google Assistant)
             - Smart Diagnostics (Yes/No)
             - Automatic Dispenser (Yes/No)
    
           - **Power & Efficiency**:
             - Power Consumption (in watts)
             - Water Consumption per Wash (in liters)
             - Noise Level (in dB, during wash and spin)
             - Energy Consumption per Year (if available)
    
           - **Build & Design**:
             - Material (e.g., Plastic, Stainless Steel)
             - Color Options
             - Dimensions (L x W x H in cm)
             - Weight (in kg)
             - Door Type (e.g., Glass, Transparent)
    
           - **Additional Features**:
             - Anti-Bacterial Wash (Yes/No)
             - Auto-Balance System (Yes/No)
             - Rat Mesh Protection (Yes/No)
             - Tub Clean (Yes/No)
             - Time Delay (Yes/No)
             - Memory Backup (Yes/No)
    
           - **Product Information**:
             - Release Date
             - Special Features (mention any unique features)
      
        4. **priceandsuggestion**: 
           - **price**: Current Indian price.
           - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
           - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
           - **offers**: Best offers available on Amazon and Flipkart.
           - **recommendation**: Provide recommendations for each product, if applicable.
    
        The final output should look like this:
    
       [
        {
            "productName": "Washing Machine A",
            "brand": "Brand A",
            "specifications": {
                "General": { ... },
                "Wash Programs & Features": { ... },
                "Smart Features": { ... },
                "Power & Efficiency": { ... },
                "Build & Design": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Washing Machine B",
            "brand": "Brand B",
            "specifications": {
                "General": { ... },
                "Wash Programs & Features": { ... },
                "Smart Features": { ... },
                "Power & Efficiency": { ... },
                "Build & Design": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        "priceandsuggestion": {
            "price": "Price in INR",
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
    
      // Extract brand and model name for both products
      const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
      const Firstbrand = firstProduct.brand; // Adjust according to your data structure
      const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
      const Secondbrand = secondProduct.brand; // Adjust according to your data structure
      const thirdproductName = thirdProduct.modelName; // Adjust according to your data structure
      const thirdbrand = thirdProduct.brand; // Adjust according to your data structure
  
      const promptforThreeProduct = `
      Compare the detailed specifications, features, and purchasing options for three Washing Machines: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
  
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the washing machine on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Washing Machine and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the washing machine.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **General**:
           - Type (e.g., Front Load, Top Load, Semi-Automatic)
           - Capacity (in kg)
           - Energy Rating (e.g., 5 Star)
           - Inverter Technology (Yes/No)
           - Motor Type (e.g., Direct Drive, Belt Drive)
           
         - **Wash Programs & Features**:
           - Number of Wash Programs
           - Quick Wash (Yes/No, with time if applicable)
           - Spin Speed (in RPM)
           - Pre-Soak Function (Yes/No)
           - Temperature Control (Yes/No)
           - Drum Type (e.g., Stainless Steel)
           - Auto-Restart (Yes/No)
           - Fuzzy Logic (Yes/No)
           - Child Lock (Yes/No)
           - Eco Mode (Yes/No)
    
         - **Smart Features**:
           - Wi-Fi Connectivity (Yes/No)
           - App Compatibility (list compatible apps if applicable)
           - Voice Assistant Support (e.g., Alexa, Google Assistant)
           - Smart Diagnostics (Yes/No)
           - Automatic Dispenser (Yes/No)
    
         - **Power & Efficiency**:
           - Power Consumption (in watts)
           - Water Consumption per Wash (in liters)
           - Noise Level (in dB, during wash and spin)
           - Energy Consumption per Year (if available)
    
         - **Build & Design**:
           - Material (e.g., Plastic, Stainless Steel)
           - Color Options
           - Dimensions (L x W x H in cm)
           - Weight (in kg)
           - Door Type (e.g., Glass, Transparent)
    
         - **Additional Features**:
           - Anti-Bacterial Wash (Yes/No)
           - Auto-Balance System (Yes/No)
           - Rat Mesh Protection (Yes/No)
           - Tub Clean (Yes/No)
           - Time Delay (Yes/No)
           - Memory Backup (Yes/No)
    
         - **Product Information**:
           - Release Date
           - Special Features (mention any unique features)
      
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
  
      The final output should look like this:
  
     [
      {
          "productName": "Washing Machine A",
          "brand": "Brand A",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Washing Machine B",
          "brand": "Brand B",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Washing Machine C",
          "brand": "Brand C",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      "priceandsuggestion": {
          "price": "Price in INR",
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
            
            contents: [{ parts: [{ text: promptforThreeProduct }] }]
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
    
      // Extract brand and model name for both products
      const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
      const Firstbrand = firstProduct.brand; // Adjust according to your data structure
      const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
      const Secondbrand = secondProduct.brand; // Adjust according to your data structure
      const ThirdProduct = thirdProduct.modelName; // Adjust according to your data structure
      const Thirdbrand = thirdProduct.brand;
      const Fourthbrand = forthProduct.brand;
      const FourthProduct = forthProduct.modelName; 
  
      const promptforFourProduct = `
      Compare the detailed specifications, features, and purchasing options for four Washing Machines: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${thirdproductName}** by **${thirdbrand}**, and **${fourthproductName}** by **${fourthbrand}**.
  
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the washing machine on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Washing Machine and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the washing machine.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **General**:
           - Type (e.g., Front Load, Top Load, Semi-Automatic)
           - Capacity (in kg)
           - Energy Rating (e.g., 5 Star)
           - Inverter Technology (Yes/No)
           - Motor Type (e.g., Direct Drive, Belt Drive)
           
         - **Wash Programs & Features**:
           - Number of Wash Programs
           - Quick Wash (Yes/No, with time if applicable)
           - Spin Speed (in RPM)
           - Pre-Soak Function (Yes/No)
           - Temperature Control (Yes/No)
           - Drum Type (e.g., Stainless Steel)
           - Auto-Restart (Yes/No)
           - Fuzzy Logic (Yes/No)
           - Child Lock (Yes/No)
           - Eco Mode (Yes/No)
    
         - **Smart Features**:
           - Wi-Fi Connectivity (Yes/No)
           - App Compatibility (list compatible apps if applicable)
           - Voice Assistant Support (e.g., Alexa, Google Assistant)
           - Smart Diagnostics (Yes/No)
           - Automatic Dispenser (Yes/No)
    
         - **Power & Efficiency**:
           - Power Consumption (in watts)
           - Water Consumption per Wash (in liters)
           - Noise Level (in dB, during wash and spin)
           - Energy Consumption per Year (if available)
    
         - **Build & Design**:
           - Material (e.g., Plastic, Stainless Steel)
           - Color Options
           - Dimensions (L x W x H in cm)
           - Weight (in kg)
           - Door Type (e.g., Glass, Transparent)
    
         - **Additional Features**:
           - Anti-Bacterial Wash (Yes/No)
           - Auto-Balance System (Yes/No)
           - Rat Mesh Protection (Yes/No)
           - Tub Clean (Yes/No)
           - Time Delay (Yes/No)
           - Memory Backup (Yes/No)
    
         - **Product Information**:
           - Release Date
           - Special Features (mention any unique features)
      
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
  
      The final output should look like this:
  
     [
      {
          "productName": "Washing Machine A",
          "brand": "Brand A",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Washing Machine B",
          "brand": "Brand B",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Washing Machine C",
          "brand": "Brand C",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Washing Machine D",
          "brand": "Brand D",
          "specifications": {
              "General": { ... },
              "Wash Programs & Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      "priceandsuggestion": {
          "price": "Price in INR",
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
            
            contents: [{ parts: [{ text: promptforFourProduct }] }]
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

}
