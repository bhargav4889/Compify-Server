import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyCfmu-PMGP2ZuKlgRMEWNa0m9feROp0uG8";

export const smartWatchComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two Smart Watches: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the smartwatch on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
    
        **Strict Warning**: Please focus strictly on specifications relevant to Smart Watches, such as display, battery life, health and fitness tracking features, connectivity, and build quality. Exclude any non-wearable or unrelated functionalities.
    
        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
      
        Return the comparison as an array of JSON objects, where each object corresponds to a Smart Watch and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the watch.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           
           - **Display**:
             - Screen Size & Resolution
             - Display Type (e.g., AMOLED, LCD)
             - Brightness (in nits)
             - Always-On Display (Yes/No)
             - Touchscreen Sensitivity (if applicable)
           
           - **Health & Fitness Tracking**:
             - Heart Rate Monitoring (Yes/No)
             - SpO2 Monitoring (Yes/No)
             - Step Count (Yes/No)
             - Sleep Tracking (Yes/No)
             - ECG Monitoring (Yes/No, if applicable)
             - Workout Modes (list types supported)
             - GPS Support (Yes/No)
             - Stress Monitoring (Yes/No)
             - Menstrual Cycle Tracking (Yes/No)
    
           - **Smart Features**:
             - Operating System (e.g., WearOS, Tizen)
             - App Support (list key compatible apps)
             - Voice Assistant Compatibility (e.g., Google Assistant, Siri, Alexa)
             - Notification Mirroring (Yes/No)
             - Music Storage (Yes/No, with storage capacity)
             - Call Functionality (Yes/No)
             - NFC Payments (Yes/No)
             - Customizable Watch Faces (Yes/No)
             - Sleep and Stress Monitoring (Yes/No)
    
           - **Battery & Power**:
             - Battery Life (in days/hours)
             - Charging Type (e.g., magnetic, wireless)
             - Charging Time (in hours)
             - Battery Capacity (in mAh if available)
             - Power-Saving Mode (Yes/No)
    
           - **Connectivity**:
             - Wi-Fi Support (Yes/No)
             - Bluetooth Version (e.g., Bluetooth 5.0)
             - Cellular Connectivity (e.g., LTE support)
             - GPS Support (Yes/No)
    
           - **Build & Design**:
             - Case Material (e.g., aluminum, stainless steel)
             - Strap Material and Compatibility (e.g., silicone, leather, interchangeable)
             - Waterproof Rating (e.g., 5ATM, IP68)
             - Weight (in grams)
             - Dimensions (L x W x H in mm)
             - Color Options
             - Display Shape (e.g., round, square)
    
           - **Additional Features**:
             - AI-based Health Insights (Yes/No)
             - Fall Detection (Yes/No)
             - Find My Watch Feature (Yes/No)
             - Customizable Widgets (Yes/No)
             - Haptic Feedback (Yes/No)
             - Third-Party App Integration (Yes/No)
    
           - **Product Information**:
             - Release Date
             - Special Features (mention any unique features, such as built-in GPS or special fitness modes)
      
        4. **priceandsuggestion**: 
           - **price**: Current Indian price.
           - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
           - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
           - **offers**: Best offers available on Amazon and Flipkart.
           - **recommendation**: Provide recommendations for each product, if applicable.
    
        The final output should look like this:
    
       [
        {
            "productName": "Smart Watch A",
            "brand": "Brand A",
            "specifications": {
                "Display": { ... },
                "Health & Fitness Tracking": { ... },
                "Smart Features": { ... },
                "Battery & Power": { ... },
                "Connectivity": { ... },
                "Build & Design": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Smart Watch B",
            "brand": "Brand B",
            "specifications": {
                "Display": { ... },
                "Health & Fitness Tracking": { ... },
                "Smart Features": { ... },
                "Battery & Power": { ... },
                "Connectivity": { ... },
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
      Compare the detailed specifications, features, and purchasing options for three Smart Watches: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
  
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the smartwatch on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Smart Watch and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the smartwatch.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **Display**:
           - Screen Size & Resolution
           - Display Type (e.g., AMOLED, LCD)
           - Brightness (in nits)
           - Always-On Display (Yes/No)
           - Customizable Watch Faces (Yes/No)
           
         - **Health & Fitness Tracking**:
           - Heart Rate Monitoring (Yes/No, with continuous monitoring if applicable)
           - SpO2 (Blood Oxygen) Measurement (Yes/No)
           - Sleep Tracking (Yes/No)
           - Workout Modes (list key modes like running, cycling, swimming)
           - GPS Tracking (Yes/No, with type if applicable)
           - Step Counter (Yes/No)
           - Calorie Tracking (Yes/No)
           - Stress Monitoring (Yes/No)
           - Menstrual Cycle Tracking (Yes/No, if applicable)
           
         - **Smart Features**:
           - Operating System (e.g., WearOS, proprietary)
           - Voice Assistant Compatibility (e.g., Google Assistant, Alexa)
           - Notifications Support (Yes/No, with customization options if applicable)
           - Music Control (Yes/No)
           - Contactless Payments (Yes/No, with type if applicable)
           - Third-Party App Support (Yes/No)
           - Built-in Games (Yes/No, if any)
           
         - **Battery & Charging**:
           - Battery Life (e.g., in hours/days)
           - Battery Capacity (in mAh)
           - Charging Type (e.g., wireless, magnetic)
           - Quick Charging Support (Yes/No)
           - Standby Time (in days)
           
         - **Connectivity**:
           - Bluetooth Support and Version
           - Wi-Fi (Yes/No)
           - Cellular Connectivity (e.g., LTE/4G, Yes/No)
           - NFC Support (Yes/No)
           - USB Port (Yes/No, if applicable)
           
         - **Build & Design**:
           - Material (e.g., aluminum, stainless steel)
           - Water Resistance (e.g., IP rating or ATM depth)
           - Weight
           - Strap Options (e.g., replaceable, various materials)
           - Available Colors
           
         - **Additional Features**:
           - Customizable Widgets (Yes/No)
           - Smart Alerts (Yes/No, for inactivity, hydration, etc.)
           - Safety Features (e.g., fall detection, emergency SOS)
           - Digital Crown (Yes/No, if applicable)
           - Temperature Sensor (Yes/No)
           - Compass (Yes/No)
           - Barometer (Yes/No)
  
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
  
      The final output should look like this:
  
     [
      {
          "productName": "Smart Watch A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
          }
      },
      {
          "productName": "Smart Watch B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
          }
      },
      {
          "productName": "Smart Watch C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
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
      Compare the detailed specifications, features, and purchasing options for four Smart Watches: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.

      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.

      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the smartwatch on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.

      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Smart Watch and contains the following details:

      1. **productName**: The full product name.
      2. **brand**: The brand of the smartwatch.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **Display**:
           - Screen Size & Resolution
           - Display Type (e.g., AMOLED, LCD)
           - Brightness (in nits)
           - Always-On Display (Yes/No)
           - Customizable Watch Faces (Yes/No)
           
         - **Health & Fitness Tracking**:
           - Heart Rate Monitoring (Yes/No, with continuous monitoring if applicable)
           - SpO2 (Blood Oxygen) Measurement (Yes/No)
           - Sleep Tracking (Yes/No)
           - Workout Modes (list key modes like running, cycling, swimming)
           - GPS Tracking (Yes/No, with type if applicable)
           - Step Counter (Yes/No)
           - Calorie Tracking (Yes/No)
           - Stress Monitoring (Yes/No)
           - Menstrual Cycle Tracking (Yes/No, if applicable)
           
         - **Smart Features**:
           - Operating System (e.g., WearOS, proprietary)
           - Voice Assistant Compatibility (e.g., Google Assistant, Alexa)
           - Notifications Support (Yes/No, with customization options if applicable)
           - Music Control (Yes/No)
           - Contactless Payments (Yes/No, with type if applicable)
           - Third-Party App Support (Yes/No)
           - Built-in Games (Yes/No, if any)
           
         - **Battery & Charging**:
           - Battery Life (e.g., in hours/days)
           - Battery Capacity (in mAh)
           - Charging Type (e.g., wireless, magnetic)
           - Quick Charging Support (Yes/No)
           - Standby Time (in days)
           
         - **Connectivity**:
           - Bluetooth Support and Version
           - Wi-Fi (Yes/No)
           - Cellular Connectivity (e.g., LTE/4G, Yes/No)
           - NFC Support (Yes/No)
           - USB Port (Yes/No, if applicable)
           
         - **Build & Design**:
           - Material (e.g., aluminum, stainless steel)
           - Water Resistance (e.g., IP rating or ATM depth)
           - Weight
           - Strap Options (e.g., replaceable, various materials)
           - Available Colors
           
         - **Additional Features**:
           - Customizable Widgets (Yes/No)
           - Smart Alerts (Yes/No, for inactivity, hydration, etc.)
           - Safety Features (e.g., fall detection, emergency SOS)
           - Digital Crown (Yes/No, if applicable)
           - Temperature Sensor (Yes/No)
           - Compass (Yes/No)
           - Barometer (Yes/No)

      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.

      The final output should look like this:

     [
      {
          "productName": "Smart Watch A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
          }
      },
      {
          "productName": "Smart Watch B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
          }
      },
      {
          "productName": "Smart Watch C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
          }
      },
      {
          "productName": "Smart Watch D",
          "brand": "Brand D",
          "specifications": {
              "Display": { ... },
              "Health & Fitness Tracking": { ... },
              "Smart Features": { ... },
              "Battery & Charging": { ... },
              "Connectivity": { ... },
              "Build & Design": { ... },
              "Additional Features": { ... }
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
