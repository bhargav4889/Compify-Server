// Importing required modules
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { productvalidator } from './openai/product-validate.mjs'; 
import { smartphoneComparison } from './openai/Comparison/smart-phone-comparison.mjs';
import { laptopComparison } from './openai/Comparison/laptop-comparison.mjs';
import { smartTVComparison} from './openai/Comparison/smart-tv-comparison.mjs';
import { airConditionerComparison } from './openai/Comparison/ac-comparison.mjs';
import { bluetoothDeviceComparison } from './openai/Comparison/bluetooth-device-comparison.mjs';
import { smartWatchComparison } from './openai/Comparison/smart-watch-comparison.mjs';
import { refrigeratorComparison } from './openai/Comparison/refrigerator-comparison.mjs';
import { washingMachinceComparison } from './openai/Comparison/washing-machine-comparison.mjs';


// Get the correct directory name for file paths in ES Modules
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use(express.static('build'));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Product Validator Check 
app.post('/v1/product-validate', async (req, res) => {
  const productType = req.headers['producttype'];
  const brand = req.headers['brand'];
  const productName = req.headers['productname'];

  if (!productType || !brand || !productName) {
    return res.status(400).json({ message: 'Missing required headers: productType, brand, productName' });
  }
  try {
    const isValid = await productvalidator(productType, brand, productName);
    res.json({ isValid });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Comparison Section

// Comparison - Smart Phone
app.post('/v1/comparison/smart-phone', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    // Validate the products array length
    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    // Fetch comparison data
    const comparisonData = await smartphoneComparison(products);

    // Send the comparison data back to the client
    return res.status(200).json(comparisonData);
  } catch (error) {
    console.error('Error generating comparison:', error);

    // Handle errors by sending an error response to the client
    return res.status(500).json({
      error: 'An error occurred while generating the comparison data.',
    });
  }
});

// Comparison - Smart  Watch
app.post('/v1/comparison/smart-watch', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await smartWatchComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});

// Comparison - Smart TV
app.post('/v1/comparison/smart-tv', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await smartTVComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});

// Comparison - Laptop
app.post('/v1/comparison/laptop', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await laptopComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});

// Comparison - AC
app.post('/v1/comparison/air-conditioner', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await airConditionerComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});

// Comparison - Refrigerator
app.post('/v1/comparison/refrigerator', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await refrigeratorComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});


// Comparison - Washing Machine
app.post('/v1/comparison/washing-machine', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await washingMachinceComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});


// Comparison - Bluetooth Devices
app.post('/v1/comparison/bluetooth-device', async (req, res) => {
  try {
    const products = req.body.products; // Using req.body for product data

    if (!Array.isArray(products) || products.length < 2 || products.length > 4) {
      return res.status(400).json({
        error: 'Please provide an array of 2 to 4 products for comparison.',
      });
    }

    const comparisonData = await bluetoothDeviceComparison(products);

    return res.json(comparisonData);
  } catch (error) {
    console.error("Error in comparison API:", error);
    return res.status(500).json({ error: 'Failed to generate comparison data.' });
  }
});

// Save the data and share 

const comparisonDataStore = {};

// Path to store the comparison data file
const comparisonDataFilePath = path.join(__dirname, 'comparisonData.json');

// Function to save comparison data to a file
function saveDataToFile() {
  try {
    fs.writeFileSync(comparisonDataFilePath, JSON.stringify(comparisonDataStore));
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
}

// Function to read comparison data from a file
function readDataFromFile() {
  try {
    if (fs.existsSync(comparisonDataFilePath)) {
      const data = fs.readFileSync(comparisonDataFilePath, 'utf-8');
      return JSON.parse(data);
    }
    return {};  // Return empty object if file doesn't exist
  } catch (error) {
    console.error('Error reading data from file:', error);
    return {};  // Return empty object if there's an error reading the file
  }
}

// Initialize comparisonDataStore from file
Object.assign(comparisonDataStore, readDataFromFile());

// Endpoint to store comparison data
app.post('/v1/share/save-comparison', (req, res) => {
  const { comparisonId, data } = req.body;
  if (!comparisonId || !data) {
    return res.status(400).json({ error: 'comparisonId and data are required' });
  }

  // Store the data in memory and write to file
  comparisonDataStore[comparisonId] = data;
  saveDataToFile();

  res.status(201).json({ message: 'Data saved successfully' });
});

// Endpoint to retrieve comparison data by ID
app.get('/v1/share/share-comparison/:sid', (req, res) => {
  const { sid } = req.params;

  // Fetch comparison data from the in-memory store
  const comparisonData = comparisonDataStore[sid];

  if (!comparisonData) {
    return res.status(404).json({ error: 'Data not found' });
  }

  res.json(comparisonData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
