import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyBokiBf88MqNV23hBnZFfhhF05Um6oVlCs";

export const airConditionerComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two Air Conditioners: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Air Conditioner on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
    
        **Strict Warning**: Please focus strictly on specifications relevant to Air Conditioners, such as cooling capacity, energy efficiency, and other important features like filtration and connectivity. Exclude any unrelated functionalities.
    
        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
       
        Return the comparison as an array of JSON objects, where each object corresponds to an Air Conditioner and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the Air Conditioner.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           
           - **General**:
             - Type (e.g., Split, Window, Inverter)
             - Cooling Capacity (in BTU or Tons)
             - Energy Rating (e.g., 5 Star, 3 Star)
             - Inverter Technology (Yes/No)
             - Refrigerant Type (e.g., R32, R410A)
             - Noise Level (in dB)
           
           - **Cooling & Performance Features**:
             - Modes (e.g., Cool, Dry, Fan)
             - Turbo Mode (Yes/No)
             - Auto-Restart (Yes/No)
             - Temperature Control (Yes/No)
             - Airflow (in CFM or m³/hr)
             - Cooling Area (in sq. ft)
    
           - **Smart Features**:
             - Wi-Fi Connectivity (Yes/No)
             - App Compatibility (list compatible apps if applicable)
             - Voice Assistant Support (e.g., Alexa, Google Assistant)
             - Smart Diagnostics (Yes/No)
    
           - **Power & Efficiency**:
             - Power Consumption (in watts)
             - Energy Consumption per Year (if available)
             - Annual Energy Saving (if available)
    
           - **Build & Design**:
             - Material (e.g., Plastic, Metal)
             - Color Options
             - Dimensions (L x W x H in cm)
             - Weight (in kg)
    
           - **Additional Features**:
             - Anti-Bacterial Filter (Yes/No)
             - Dust Filter (Yes/No)
             - Dehumidification (Yes/No)
             - Auto Clean Function (Yes/No)
    
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
            "productName": "Air Conditioner A",
            "brand": "Brand A",
            "specifications": {
                "General": { ... },
                "Cooling & Performance Features": { ... },
                "Smart Features": { ... },
                "Power & Efficiency": { ... },
                "Build & Design": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Air Conditioner B",
            "brand": "Brand B",
            "specifications": {
                "General": { ... },
                "Cooling & Performance Features": { ... },
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
      Compare the detailed specifications, features, and purchasing options for three Air Conditioners: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Air Conditioner on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Air Conditioners, such as cooling capacity, energy efficiency, and other important features like filtration and connectivity. Exclude any unrelated functionalities.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
     
      Return the comparison as an array of JSON objects, where each object corresponds to an Air Conditioner and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the Air Conditioner.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **General**:
           - Type (e.g., Split, Window, Inverter)
           - Cooling Capacity (in BTU or Tons)
           - Energy Rating (e.g., 5 Star, 3 Star)
           - Inverter Technology (Yes/No)
           - Refrigerant Type (e.g., R32, R410A)
           - Noise Level (in dB)
         
         - **Cooling & Performance Features**:
           - Modes (e.g., Cool, Dry, Fan)
           - Turbo Mode (Yes/No)
           - Auto-Restart (Yes/No)
           - Temperature Control (Yes/No)
           - Airflow (in CFM or m³/hr)
           - Cooling Area (in sq. ft)
  
         - **Smart Features**:
           - Wi-Fi Connectivity (Yes/No)
           - App Compatibility (list compatible apps if applicable)
           - Voice Assistant Support (e.g., Alexa, Google Assistant)
           - Smart Diagnostics (Yes/No)
  
         - **Power & Efficiency**:
           - Power Consumption (in watts)
           - Energy Consumption per Year (if available)
           - Annual Energy Saving (if available)
  
         - **Build & Design**:
           - Material (e.g., Plastic, Metal)
           - Color Options
           - Dimensions (L x W x H in cm)
           - Weight (in kg)
  
         - **Additional Features**:
           - Anti-Bacterial Filter (Yes/No)
           - Dust Filter (Yes/No)
           - Dehumidification (Yes/No)
           - Auto Clean Function (Yes/No)
  
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
          "productName": "Air Conditioner A",
          "brand": "Brand A",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Air Conditioner B",
          "brand": "Brand B",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Air Conditioner C",
          "brand": "Brand C",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
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
      Compare the detailed specifications, features, and purchasing options for four Air Conditioners: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Air Conditioner on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Air Conditioners, such as cooling capacity, energy efficiency, and other important features like filtration and connectivity. Exclude any unrelated functionalities.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
     
      Return the comparison as an array of JSON objects, where each object corresponds to an Air Conditioner and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the Air Conditioner.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **General**:
           - Type (e.g., Split, Window, Inverter)
           - Cooling Capacity (in BTU or Tons)
           - Energy Rating (e.g., 5 Star, 3 Star)
           - Inverter Technology (Yes/No)
           - Refrigerant Type (e.g., R32, R410A)
           - Noise Level (in dB)
         
         - **Cooling & Performance Features**:
           - Modes (e.g., Cool, Dry, Fan)
           - Turbo Mode (Yes/No)
           - Auto-Restart (Yes/No)
           - Temperature Control (Yes/No)
           - Airflow (in CFM or m³/hr)
           - Cooling Area (in sq. ft)
  
         - **Smart Features**:
           - Wi-Fi Connectivity (Yes/No)
           - App Compatibility (list compatible apps if applicable)
           - Voice Assistant Support (e.g., Alexa, Google Assistant)
           - Smart Diagnostics (Yes/No)
  
         - **Power & Efficiency**:
           - Power Consumption (in watts)
           - Energy Consumption per Year (if available)
           - Annual Energy Saving (if available)
  
         - **Build & Design**:
           - Material (e.g., Plastic, Metal)
           - Color Options
           - Dimensions (L x W x H in cm)
           - Weight (in kg)
  
         - **Additional Features**:
           - Anti-Bacterial Filter (Yes/No)
           - Dust Filter (Yes/No)
           - Dehumidification (Yes/No)
           - Auto Clean Function (Yes/No)
  
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
          "productName": "Air Conditioner A",
          "brand": "Brand A",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Air Conditioner B",
          "brand": "Brand B",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Air Conditioner C",
          "brand": "Brand C",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
              "Smart Features": { ... },
              "Power & Efficiency": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Air Conditioner D",
          "brand": "Brand D",
          "specifications": {
              "General": { ... },
              "Cooling & Performance Features": { ... },
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
