const Product = require('../models/Product');

// @desc    Get all products (with filters, search, sort)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      style,
      gender,
      occasion,
      minPrice,
      maxPrice,
      search,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (style) filter.style = style;
    if (gender) filter.gender = gender;
    if (occasion) filter.occasion = occasion;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'price_low') sortOption = { price: 1 };
    if (sort === 'price_high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products (for homepage)
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, getFeaturedProducts };