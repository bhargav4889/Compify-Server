import axios from 'axios';

const baseURL = "https://generativelanguage.googleapis.com/v1beta";
const apiKey = "AIzaSyCfmu-PMGP2ZuKlgRMEWNa0m9feROp0uG8";

export const smartTVComparison = async (products = []) => {

    if(products.length == 2){
        const [firstProduct, secondProduct] = products;
    
        // Extract brand and model name for both products
        const FirstProduct = firstProduct.modelName; // Adjust according to your data structure
        const Firstbrand = firstProduct.brand; // Adjust according to your data structure
        const SecondproductName = secondProduct.modelName; // Adjust according to your data structure
        const Secondbrand = secondProduct.brand; // Adjust according to your data structure
    
        const promptforTwoProduct = `
        Compare the detailed specifications, features, and purchasing options for two Smart TVs: **${FirstProduct}** by **${Firstbrand}** and **${SecondproductName}** by **${Secondbrand}**.
        
        **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
    
        **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the TV on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
    
        **Strict Warning**: Please focus strictly on specifications relevant to Smart TVs, such as display technology, resolution, smart features, connectivity, and audio. Exclude any mobile or dual SIM functionalities.
    
        Use these formats for the links:
        
        - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
        - **Amazon Link Format**: https://www.amazon.in/s?k=productName
      
        Return the comparison as an array of JSON objects, where each object corresponds to a Smart TV and contains the following details:
    
        1. **productName**: The full product name.
        2. **brand**: The brand of the TV.
        3. **specifications**: An object containing detailed specifications covering the following aspects:
           
           - **Display**:
             - Screen Size & Resolution (e.g., 4K, 8K, Full HD)
             - Display Type (e.g., LED, OLED, QLED)
             - HDR Support (Yes/No, with HDR Type if applicable)
             - Refresh Rate (Hz)
             - Brightness (in nits)
             - Contrast Ratio
             - Viewing Angle (in degrees)
             - Backlight Technology (e.g., Edge-lit, Direct-lit, Mini-LED)
           
           - **Audio**:
             - Speaker Output (in Watts)
             - Audio Technology (e.g., Dolby Atmos, DTS)
             - Number of Speakers
             - Built-in Subwoofer (Yes/No)
             - Sound Modes (e.g., Cinema, Music, Sports)
    
           - **Smart Features**:
             - Operating System (e.g., Android TV, WebOS)
             - Supported Streaming Services (e.g., Netflix, Amazon Prime, Disney+)
             - Voice Assistant Compatibility (e.g., Google Assistant, Alexa)
             - Built-in Apps (list key apps pre-installed)
             - Screen Mirroring / Casting (Yes/No)
             - App Store Availability (Yes/No)
             - Gaming Mode or Low Latency Mode (Yes/No)
             - Parental Controls (Yes/No)
    
           - **Processor & Performance**:
             - Processor Type
             - Processor Cores (e.g., Quad-core)
             - RAM (in GB)
             - Storage capacity (in GB)
             - GPU (if applicable)
    
           - **Connectivity**:
             - Wi-Fi Support and Version (e.g., Wi-Fi 5, Wi-Fi 6)
             - Bluetooth Support and Version
             - HDMI Ports (number and type, e.g., HDMI 2.1)
             - USB Ports (number and type, e.g., USB 3.0)
             - Ethernet Port (Yes/No)
             - Optical Audio Out (Yes/No)
             - AV Input (Yes/No)
             - Screen Sharing / Miracast Support (Yes/No)
    
           - **Remote & Controls**:
             - Type of Remote (e.g., Voice-enabled, Smart Remote)
             - Remote Features (e.g., dedicated buttons for streaming apps, air mouse capability)
             - Mobile App Compatibility (Yes/No)
             - Universal Remote Support (Yes/No)
           
           - **Build & Design**:
             - Weight (without stand)
             - Dimensions (without stand, L x W x H)
             - Stand Type and Adjustability (e.g., Wall-mount compatible)
             - Color Options
             - Frame Material (e.g., plastic, metal)
             - Bezel Thickness
    
           - **Energy Efficiency**:
             - Energy Rating (Star rating)
             - Power Consumption (in Watts)
             - Eco Mode or Energy Saving Mode (Yes/No)
    
           - **Additional Features**:
             - Ambient Mode (Yes/No)
             - Art Mode (Yes/No, if the TV can display artworks when not in use)
             - AI-based Picture Enhancement (Yes/No)
             - AI Sound Mode (Yes/No)
             - Picture Modes (e.g., Standard, Cinema, Sports)
             - Motion Smoothing Technology (Yes/No, with type if applicable)
           
           - **Product Information**:
             - Release Date
             - Special Features (mention any unique features, such as built-in Alexa or special picture processing technologies)
    
        4. **priceandsuggestion**: 
           - **price**: Current Indian price.
           - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
           - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
           - **offers**: Best offers available on Amazon and Flipkart.
           - **recommendation**: Provide recommendations for each product, if applicable.
    
        The final output should look like this:
    
       [
        {
            "productName": "Smart TV A",
            "brand": "Brand A",
            "specifications": {
                "Display": { ... },
                "Audio": { ... },
                "Smart Features": { ... },
                "Processor & Performance": { ... },
                "Connectivity": { ... },
                "Remote & Controls": { ... },
                "Build & Design": { ... },
                "Energy Efficiency": { ... },
                "Additional Features": { ... },
                "Product Information": { ... }
            }
        },
        {
            "productName": "Smart TV B",
            "brand": "Brand B",
            "specifications": {
                "Display": { ... },
                "Audio": { ... },
                "Smart Features": { ... },
                "Processor & Performance": { ... },
                "Connectivity": { ... },
                "Remote & Controls": { ... },
                "Build & Design": { ... },
                "Energy Efficiency": { ... },
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
      Compare the detailed specifications, features, and purchasing options for three Smart TVs: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, and **${thirdproductName}** by **${thirdbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the TV on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Smart TVs, such as display technology, resolution, smart features, connectivity, and audio. Exclude any mobile or dual SIM functionalities.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Smart TV and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the TV.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **Display**:
           - Screen Size & Resolution (e.g., 4K, 8K, Full HD)
           - Display Type (e.g., LED, OLED, QLED)
           - HDR Support (Yes/No, with HDR Type if applicable)
           - Refresh Rate (Hz)
           - Brightness (in nits)
           - Contrast Ratio
           - Viewing Angle (in degrees)
           - Backlight Technology (e.g., Edge-lit, Direct-lit, Mini-LED)
         
         - **Audio**:
           - Speaker Output (in Watts)
           - Audio Technology (e.g., Dolby Atmos, DTS)
           - Number of Speakers
           - Built-in Subwoofer (Yes/No)
           - Sound Modes (e.g., Cinema, Music, Sports)
  
         - **Smart Features**:
           - Operating System (e.g., Android TV, WebOS)
           - Supported Streaming Services (e.g., Netflix, Amazon Prime, Disney+)
           - Voice Assistant Compatibility (e.g., Google Assistant, Alexa)
           - Built-in Apps (list key apps pre-installed)
           - Screen Mirroring / Casting (Yes/No)
           - App Store Availability (Yes/No)
           - Gaming Mode or Low Latency Mode (Yes/No)
           - Parental Controls (Yes/No)
  
         - **Processor & Performance**:
           - Processor Type
           - Processor Cores (e.g., Quad-core)
           - RAM (in GB)
           - Storage capacity (in GB)
           - GPU (if applicable)
  
         - **Connectivity**:
           - Wi-Fi Support and Version (e.g., Wi-Fi 5, Wi-Fi 6)
           - Bluetooth Support and Version
           - HDMI Ports (number and type, e.g., HDMI 2.1)
           - USB Ports (number and type, e.g., USB 3.0)
           - Ethernet Port (Yes/No)
           - Optical Audio Out (Yes/No)
           - AV Input (Yes/No)
           - Screen Sharing / Miracast Support (Yes/No)
  
         - **Remote & Controls**:
           - Type of Remote (e.g., Voice-enabled, Smart Remote)
           - Remote Features (e.g., dedicated buttons for streaming apps, air mouse capability)
           - Mobile App Compatibility (Yes/No)
           - Universal Remote Support (Yes/No)
         
         - **Build & Design**:
           - Weight (without stand)
           - Dimensions (without stand, L x W x H)
           - Stand Type and Adjustability (e.g., Wall-mount compatible)
           - Color Options
           - Frame Material (e.g., plastic, metal)
           - Bezel Thickness
  
         - **Energy Efficiency**:
           - Energy Rating (Star rating)
           - Power Consumption (in Watts)
           - Eco Mode or Energy Saving Mode (Yes/No)
  
         - **Additional Features**:
           - Ambient Mode (Yes/No)
           - Art Mode (Yes/No, if the TV can display artworks when not in use)
           - AI-based Picture Enhancement (Yes/No)
           - AI Sound Mode (Yes/No)
           - Picture Modes (e.g., Standard, Cinema, Sports)
           - Motion Smoothing Technology (Yes/No, with type if applicable)
         
         - **Product Information**:
           - Release Date
           - Special Features (mention any unique features, such as built-in Alexa or special picture processing technologies)
  
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
  
      The final output should look like this:
  
     [
      {
          "productName": "Smart TV A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Smart TV B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Smart TV C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
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
      Compare the detailed specifications, features, and purchasing options for four Smart TVs: **${FirstProduct}** by **${Firstbrand}**, **${SecondproductName}** by **${Secondbrand}**, **${ThirdProduct}** by **${Thirdbrand}**, and **${FourthProduct}** by **${Fourthbrand}**.
      
      **Strict Warning**: Please return the output **only** in the specified JSON array format below. Do not include any additional text, explanations, or information outside of this JSON structure. The output should start directly with an array of JSON objects without any leading or trailing symbols, such as \`json\`, \`\`\`, or any other markdown syntax.
  
      **Important Note**: For **amazonLink** and **flipkartLink**, use the search URLs provided below. These should lead to a search results page for the TV on the Indian Amazon and Flipkart sites. Replace productName with the actual product name.
  
      **Strict Warning**: Please focus strictly on specifications relevant to Smart TVs, such as display technology, resolution, smart features, connectivity, and audio. Exclude any mobile or dual SIM functionalities.
  
      Use these formats for the links:
      
      - **Flipkart Link Format**: https://www.flipkart.com/search?q=productName
      - **Amazon Link Format**: https://www.amazon.in/s?k=productName
    
      Return the comparison as an array of JSON objects, where each object corresponds to a Smart TV and contains the following details:
  
      1. **productName**: The full product name.
      2. **brand**: The brand of the TV.
      3. **specifications**: An object containing detailed specifications covering the following aspects:
         
         - **Display**:
           - Screen Size & Resolution (e.g., 4K, 8K, Full HD)
           - Display Type (e.g., LED, OLED, QLED)
           - HDR Support (Yes/No, with HDR Type if applicable)
           - Refresh Rate (Hz)
           - Brightness (in nits)
           - Contrast Ratio
           - Viewing Angle (in degrees)
           - Backlight Technology (e.g., Edge-lit, Direct-lit, Mini-LED)
         
         - **Audio**:
           - Speaker Output (in Watts)
           - Audio Technology (e.g., Dolby Atmos, DTS)
           - Number of Speakers
           - Built-in Subwoofer (Yes/No)
           - Sound Modes (e.g., Cinema, Music, Sports)
  
         - **Smart Features**:
           - Operating System (e.g., Android TV, WebOS)
           - Supported Streaming Services (e.g., Netflix, Amazon Prime, Disney+)
           - Voice Assistant Compatibility (e.g., Google Assistant, Alexa)
           - Built-in Apps (list key apps pre-installed)
           - Screen Mirroring / Casting (Yes/No)
           - App Store Availability (Yes/No)
           - Gaming Mode or Low Latency Mode (Yes/No)
           - Parental Controls (Yes/No)
  
         - **Processor & Performance**:
           - Processor Type
           - Processor Cores (e.g., Quad-core)
           - RAM (in GB)
           - Storage capacity (in GB)
           - GPU (if applicable)
  
         - **Connectivity**:
           - Wi-Fi Support and Version (e.g., Wi-Fi 5, Wi-Fi 6)
           - Bluetooth Support and Version
           - HDMI Ports (number and type, e.g., HDMI 2.1)
           - USB Ports (number and type, e.g., USB 3.0)
           - Ethernet Port (Yes/No)
           - Optical Audio Out (Yes/No)
           - AV Input (Yes/No)
           - Screen Sharing / Miracast Support (Yes/No)
  
         - **Remote & Controls**:
           - Type of Remote (e.g., Voice-enabled, Smart Remote)
           - Remote Features (e.g., dedicated buttons for streaming apps, air mouse capability)
           - Mobile App Compatibility (Yes/No)
           - Universal Remote Support (Yes/No)
         
         - **Build & Design**:
           - Weight (without stand)
           - Dimensions (without stand, L x W x H)
           - Stand Type and Adjustability (e.g., Wall-mount compatible)
           - Color Options
           - Frame Material (e.g., plastic, metal)
           - Bezel Thickness
  
         - **Energy Efficiency**:
           - Energy Rating (Star rating)
           - Power Consumption (in Watts)
           - Eco Mode or Energy Saving Mode (Yes/No)
  
         - **Additional Features**:
           - Ambient Mode (Yes/No)
           - Art Mode (Yes/No, if the TV can display artworks when not in use)
           - AI-based Picture Enhancement (Yes/No)
           - AI Sound Mode (Yes/No)
           - Picture Modes (e.g., Standard, Cinema, Sports)
           - Motion Smoothing Technology (Yes/No, with type if applicable)
         
         - **Product Information**:
           - Release Date
           - Special Features (mention any unique features, such as built-in Alexa or special picture processing technologies)
  
      4. **priceandsuggestion**: 
         - **price**: Current Indian price.
         - **amazonLink**: Use https://www.amazon.in/s?k=productName for search results on Amazon.
         - **flipkartLink**: Use https://www.flipkart.com/search?q=productName for search results on Flipkart.
         - **offers**: Best offers available on Amazon and Flipkart.
         - **recommendation**: Provide recommendations for each product, if applicable.
  
      The final output should look like this:
  
     [
      {
          "productName": "Smart TV A",
          "brand": "Brand A",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Smart TV B",
          "brand": "Brand B",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Smart TV C",
          "brand": "Brand C",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
              "Additional Features": { ... },
              "Product Information": { ... }
          }
      },
      {
          "productName": "Smart TV D",
          "brand": "Brand D",
          "specifications": {
              "Display": { ... },
              "Audio": { ... },
              "Smart Features": { ... },
              "Processor & Performance": { ... },
              "Connectivity": { ... },
              "Remote & Controls": { ... },
              "Build & Design": { ... },
              "Energy Efficiency": { ... },
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
