const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const products = require('./data/products');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for Seeding');

    // Clear existing products first
    await Product.deleteMany();
    console.log('🗑️  Old products removed');

    // Insert dummy products
    await Product.insertMany(products);
    console.log(`🌱 ${products.length} dummy products added successfully!`);

    process.exit();
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDB();