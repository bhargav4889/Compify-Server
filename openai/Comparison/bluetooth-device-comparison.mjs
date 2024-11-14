import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyBQuhO902O-DzW2p5P2Vtm8qE060JQVhjg";

export const bluetoothDeviceComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two Bluetooth devices: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Bluetooth device on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
    
        **Strict Warning**: Please focus strictly on specifications relevant to Bluetooth devices, such as audio quality, battery life, connectivity, and other important features like noise cancellation, water resistance, and wireless range. Exclude any unrelated functionalities.
    
        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
       
        Return the comparison as an array of JSON objects, where each object corresponds to a Bluetooth device (Airbuds, Speaker, Headphones) and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the Bluetooth device.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           
           - **General**:
             - Type (e.g., Airbuds, Speaker, Headphones)
             - Connectivity (e.g., Bluetooth 5.0, 5.1)
             - Wireless Range (in meters)
             - Noise Cancellation (Yes/No)
             - Water Resistance Rating (e.g., IPX4, IP67)
             - Weight (in grams)
             - Charging Port (e.g., USB-C, Micro-USB)
           
           - **Audio & Performance Features**:
             - Sound Quality (e.g., Hi-Fi, Stereo)
             - Drivers Size (in mm)
             - Frequency Response (Hz)
             - Bass Enhancement (Yes/No)
             - Volume Control (Yes/No)
             - Microphone (Yes/No)
             - Voice Assistant Integration (e.g., Siri, Google Assistant)
    
           - **Battery & Charging**:
             - Battery Life (in hours)
             - Charging Time (in hours)
             - Quick Charge Support (Yes/No)
    
           - **Build & Design**:
             - Material (e.g., Plastic, Metal)
             - Color Options
             - Foldable/Portable (Yes/No)
             - Dimensions (L x W x H in cm)
    
           - **Smart Features**:
             - App Compatibility (if applicable)
             - Multi-device Pairing (Yes/No)
             - Touch Controls (Yes/No)
             - Voice Control (Yes/No)
    
           - **Additional Features**:
             - Sweat or Water Resistance (Yes/No)
             - Customizable Sound Profiles (Yes/No)
             - Active Noise Cancellation (ANC) (Yes/No)
    
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
            "productName": "Bluetooth Device A",
            "brand": "Brand A",
            "specifications": {
                "General": { ... },
                "Audio & Performance Features": { ... },
                "Battery & Charging": { ... },
                "Build & Design": { ... },
                "Smart Features": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device B",
            "brand": "Brand B",
            "specifications": {
                "General": { ... },
                "Audio & Performance Features": { ... },
                "Battery & Charging": { ... },
                "Build & Design": { ... },
                "Smart Features": { ... },
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
      Compare the detailed specifications, features, and purchasing options for three Bluetooth Devices: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
  
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Bluetooth Device on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Bluetooth Devices, such as sound quality, battery life, connectivity options, and other important features like noise cancellation and voice assistant support. Exclude any unrelated functionalities.
  
      Use these formats for the links:
  
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
  
      Return the comparison as an array of JSON objects, where each object corresponds to a Bluetooth Device and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the Bluetooth Device.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
  
         - **General**:
           - Type (e.g., Earbuds, Over-Ear, On-Ear, Speaker)
           - Connectivity (e.g., Bluetooth 5.0, 4.2, etc.)
           - Battery Life (in hours)
           - Charging Time (in hours)
           - Charging Type (e.g., USB-C, Micro USB, Wireless)
           - Water Resistance (IP rating)
           - Weight (in grams)
  
         - **Sound Quality**:
           - Drivers (size in mm)
           - Frequency Range (Hz)
           - Impedance (ohms)
           - Noise Cancellation (Yes/No)
           - Bass Boost (Yes/No)
  
         - **Connectivity & Compatibility**:
           - Bluetooth Version (e.g., 4.2, 5.0)
           - Multi-Device Connectivity (Yes/No)
           - App Support (e.g., for sound customization)
           - Voice Assistant Support (e.g., Google Assistant, Siri, Alexa)
  
         - **Additional Features**:
           - Touch Controls (Yes/No)
           - Foldable Design (Yes/No)
           - Noise Isolation (Yes/No)
           - Microphone (Yes/No)
  
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
            "productName": "Bluetooth Device A",
            "brand": "Brand A",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device B",
            "brand": "Brand B",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device C",
            "brand": "Brand C",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
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
      Compare the detailed specifications, features, and purchasing options for four Bluetooth Devices: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.
  
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the Bluetooth Device on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Bluetooth Devices, such as sound quality, battery life, connectivity options, and other important features like noise cancellation and voice assistant support. Exclude any unrelated functionalities.
  
      Use these formats for the links:
  
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
  
      Return the comparison as an array of JSON objects, where each object corresponds to a Bluetooth Device and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the Bluetooth Device.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
  
         - **General**:
           - Type (e.g., Earbuds, Over-Ear, On-Ear, Speaker)
           - Connectivity (e.g., Bluetooth 5.0, 4.2, etc.)
           - Battery Life (in hours)
           - Charging Time (in hours)
           - Charging Type (e.g., USB-C, Micro USB, Wireless)
           - Water Resistance (IP rating)
           - Weight (in grams)
  
         - **Sound Quality**:
           - Drivers (size in mm)
           - Frequency Range (Hz)
           - Impedance (ohms)
           - Noise Cancellation (Yes/No)
           - Bass Boost (Yes/No)
  
         - **Connectivity & Compatibility**:
           - Bluetooth Version (e.g., 4.2, 5.0)
           - Multi-Device Connectivity (Yes/No)
           - App Support (e.g., for sound customization)
           - Voice Assistant Support (e.g., Google Assistant, Siri, Alexa)
  
         - **Additional Features**:
           - Touch Controls (Yes/No)
           - Foldable Design (Yes/No)
           - Noise Isolation (Yes/No)
           - Microphone (Yes/No)
  
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
            "productName": "Bluetooth Device A",
            "brand": "Brand A",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device B",
            "brand": "Brand B",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device C",
            "brand": "Brand C",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Bluetooth Device D",
            "brand": "Brand D",
            "specifications": {
                "General": { ... },
                "Sound Quality": { ... },
                "Connectivity & Compatibility": { ... },
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