const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

let merchants = [];

const dataFilePath = path.join(__dirname, "data.json");

// Loading data from the file
try {
  const data = fs.readFileSync(dataFilePath, "utf8");
  merchants = JSON.parse(data);
} catch (error) {
  console.error("Error reading data.json file:", error.message);
}

exports.createProduct = (req, res) => {
  const merchantId = req.params.merchantId;
  let merchant = merchants.find((m) => m.id === merchantId);

  if (!merchant) {
    merchant = {
      id: merchantId,
      products: [],
    };
    merchants.push(merchant);
  }

  const { productId, name, description, price } = req.body;
  const existing = merchant.products.find((p) => p.productId === productId);
  if (existing) {
    return res.status(404).json({ error: "ProductId already exist" });
  } else {
    const newProduct = {
      productId: uuidv4(),
      name,
      description,
      price,
      addedDate: new Date(),
    };

    merchant.products.push(newProduct);
    saveData();

    res.json(newProduct);
  }
};

exports.getAllProducts = (req, res) => {
  const merchantId = req.params.merchantId;
  const merchant = merchants.find((m) => m.id === merchantId);

  if (!merchant) {
    return res.status(404).json({ error: "Merchant not found" });
  }

  res.json(merchant.products);
};

exports.getProduct = (req, res) => {
  const merchantId = req.params.merchantId;
  const productId = req.params.productId;

  const merchant = merchants.find((m) => m.id === merchantId);

  if (!merchant) {
    return res.status(404).json({ error: "Merchant not found" });
  }

  const product = merchant.products.find((m) => m.productId === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  } else {
    res.status(200).json({
      status: "Success",
      product
    });
  };
  }


exports.updateProduct = (req, res) => {
  const merchantId = req.params.merchantId;
  const productId = req.params.productId;

  const merchant = merchants.find((m) => m.id === merchantId);

  if (!merchant) {
    return res.status(404).json({ error: "Merchant not found" });
  }

  const productIndex = merchant.products.findIndex((p) => p.productId === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  } else {
    const { name, description, price } = req.body;

    merchant.products[productIndex] = {
      ...merchant.products[productIndex],
      name,
      description,
      price,
    };

    saveData();
    res.status(200).json({
      status: "Product updated successfully!",
      product: merchant.products[productIndex]
    });
  }
};

exports.deleteProduct = (req, res) => {
  const merchantId = req.params.merchantId;
  const productId = req.params.productId;

  const merchant = merchants.find((m) => m.id === merchantId);

  if (!merchant) {
    return res.status(404).json({ error: "Merchant not found" });
  }

  const productIndex = merchant.products.findIndex((p) => p.productId === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  } else {
    const deletedProduct = merchant.products.splice(productIndex, 1)[0];
    saveData();

    res.status(200).json({
      status: "Product deleted!",
      product: deletedProduct,
    });
  }
};

function saveData() {
  fs.writeFileSync(dataFilePath, JSON.stringify(merchants, null, 2));
}

module.exports = exports;
