import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyBQuhO902O-DzW2p5P2Vtm8qE060JQVhjg";

export const laptopComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const  promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two laptops, **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the laptop on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
        
        **Strict Warning**: Please show the Operating System and which OS is supported and pre-installed and not include sim and dual sim point strictly warning.

        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
      
        For the **Operating System** information, please specify whether the laptop is compatible with Windows, macOS, Linux, or other operating systems.
    
        Return the comparison as an array of JSON objects, where each object corresponds to a laptop and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the laptop.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           - **Display**:
             - Screen Size & Resolution
             - Display Type (e.g., LED, IPS, OLED) and Touchscreen support (Yes/No)
             - Refresh Rate (Hz)
        
           - **Memory & Storage**:
             - RAM (in GB)
             - Storage capacity (in GB, SSD/HDD)
             - Expandable storage options (Yes/No)
        
           - **Processor & Performance**:
             - CPU Model
             - Chipset
             - GPU model and memory (if applicable)
        
           - **Build & Dimensions**:
             - Weight
             - Thickness
             - Dimensions (L x W x H)
             - Available colors
        
           - **Battery**:
             - Battery capacity and type
             - Battery life (in hours)
             - Fast Charging (Yes/No)
        
           - **Connectivity**:
             - Wi-Fi version
             - Bluetooth version
             - USB ports (USB-C, USB-A, etc.)
             - HDMI port availability (Yes/No)
             - Ethernet port (Yes/No)
             - Audio jack
        
           - **Operating System**:
             - Pre-installed OS (Windows/macOS/Linux)
             - OS Compatibility
        
           - **Security Features**:
             - Fingerprint Sensor (Yes/No)
             - Facial Recognition (Yes/No)
        
           - **Camera & Microphone**:
             - Camera resolution
             - Built-in microphone details
           
           - **Product Information**:
             - Release Date
             - Special Features
        
        4. **priceandsuggestion**: 
           - **price**: Current Indian price.
           - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
           - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
           - **offers**: Best offers available on Amazon and Flipkart.
           - **recommendation**: Provide Both Products Recommendations.
        
        The final output should look like this:
    
       [
        {
            "productName": "Laptop A",
            "brand": "Brand A",
            "specifications": {
                "Display": { ... },
                "Memory & Storage": { ... },
                "Processor & Performance": { ... },
                "Build & Dimensions": { ... },
                "Battery": { ... },
                "Connectivity": { ... },
                "Operating System": { ... },
                "Security Features": { ... },
                "Camera & Microphone": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Laptop B",
            "brand": "Brand B",
            "specifications": {
                "Display": { ... },
                "Memory & Storage": { ... },
                "Processor & Performance": { ... },
                "Build & Dimensions": { ... },
                "Battery": { ... },
                "Connectivity": { ... },
                "Operating System": { ... },
                "Security Features": { ... },
                "Camera & Microphone": { ... },
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
      Compare the detailed specifications, features, and purchasing options for three laptops: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the laptop on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
      
      **Strict Warning**: Please show the Operating System and which OS is supported and pre-installed, and strictly exclude any mention of sim or dual sim functionality.
    
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      For the **Operating System** information, please specify whether the laptop is compatible with Windows, macOS, Linux, or other operating systems.
    
      Return the comparison as an array of JSON objects, where each object corresponds to a laptop and contains the following details:
    
      1. **productName**: The full product name.
      2. **brand**: The brand of the laptop.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         - **Display**:
           - Screen Size & Resolution
           - Display Type (e.g., LED, IPS, OLED) and Touchscreen support (Yes/No)
           - Refresh Rate (Hz)
    
         - **Memory & Storage**:
           - RAM (in GB)
           - Storage capacity (in GB, SSD/HDD)
           - Expandable storage options (Yes/No)
    
         - **Processor & Performance**:
           - CPU Model
           - Chipset
           - GPU model and memory (if applicable)
    
         - **Build & Dimensions**:
           - Weight
           - Thickness
           - Dimensions (L x W x H)
           - Available colors
    
         - **Battery**:
           - Battery capacity and type
           - Battery life (in hours)
           - Fast Charging (Yes/No)
    
         - **Connectivity**:
           - Wi-Fi version
           - Bluetooth version
           - USB ports (USB-C, USB-A, etc.)
           - HDMI port availability (Yes/No)
           - Ethernet port (Yes/No)
           - Audio jack
    
         - **Operating System**:
           - Pre-installed OS (Windows/macOS/Linux)
           - OS Compatibility
    
         - **Security Features**:
           - Fingerprint Sensor (Yes/No)
           - Facial Recognition (Yes/No)
    
         - **Camera & Microphone**:
           - Camera resolution
           - Built-in microphone details
         
         - **Product Information**:
           - Release Date
           - Special Features
    
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
    
      The final output should look like this:
    
     [
      {
          "productName": "Laptop A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Laptop B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Laptop C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
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
      Compare the detailed specifications, features, and purchasing options for four laptops: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the laptop on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
      
      **Strict Warning**: Please show the Operating System and which OS is supported and pre-installed, and strictly exclude any mention of sim or dual sim functionality.
    
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      For the **Operating System** information, please specify whether the laptop is compatible with Windows, macOS, Linux, or other operating systems.
    
      Return the comparison as an array of JSON objects, where each object corresponds to a laptop and contains the following details:
    
      1. **productName**: The full product name.
      2. **brand**: The brand of the laptop.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         - **Display**:
           - Screen Size & Resolution
           - Display Type (e.g., LED, IPS, OLED) and Touchscreen support (Yes/No)
           - Refresh Rate (Hz)
    
         - **Memory & Storage**:
           - RAM (in GB)
           - Storage capacity (in GB, SSD/HDD)
           - Expandable storage options (Yes/No)
    
         - **Processor & Performance**:
           - CPU Model
           - Chipset
           - GPU model and memory (if applicable)
    
         - **Build & Dimensions**:
           - Weight
           - Thickness
           - Dimensions (L x W x H)
           - Available colors
    
         - **Battery**:
           - Battery capacity and type
           - Battery life (in hours)
           - Fast Charging (Yes/No)
    
         - **Connectivity**:
           - Wi-Fi version
           - Bluetooth version
           - USB ports (USB-C, USB-A, etc.)
           - HDMI port availability (Yes/No)
           - Ethernet port (Yes/No)
           - Audio jack
    
         - **Operating System**:
           - Pre-installed OS (Windows/macOS/Linux)
           - OS Compatibility
    
         - **Security Features**:
           - Fingerprint Sensor (Yes/No)
           - Facial Recognition (Yes/No)
    
         - **Camera & Microphone**:
           - Camera resolution
           - Built-in microphone details
         
         - **Product Information**:
           - Release Date
           - Special Features
    
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
    
      The final output should look like this:
    
     [
      {
          "productName": "Laptop A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Laptop B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Laptop C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Laptop D",
          "brand": "Brand D",
          "specifications": {
              "Display": { ... },
              "Memory & Storage": { ... },
              "Processor & Performance": { ... },
              "Build & Dimensions": { ... },
              "Battery": { ... },
              "Connectivity": { ... },
              "Operating System": { ... },
              "Security Features": { ... },
              "Camera & Microphone": { ... },
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