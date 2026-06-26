const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Gold', 'Silver', 'Diamond', 'Rose Gold', 'Platinum']
  },
  subCategory: {
    type: String,
    required: true,
    enum: [
      'Rings', 'Chains', 'Earrings', 'Necklaces', 'Bangles',
      'Bracelets', 'Pendants', 'Mangalsutra', 'Nose Pins', 'Anklets'
    ]
  },
  style: {
    type: String,
    enum: ['Antique', 'Temple', 'Contemporary', 'Traditional', 'Minimalist', 'Bridal'],
    default: 'Contemporary'
  },
  gender: {
    type: String,
    enum: ['Women', 'Men', 'Unisex', 'Kids'],
    default: 'Women'
  },
  occasion: {
    type: String,
    enum: ['Daily Wear', 'Wedding', 'Festive', 'Party', 'Office Wear'],
    default: 'Daily Wear'
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  weight: {
    type: Number, // in grams
    required: true
  },
  purity: {
    type: String, // e.g. "22K", "18K", "925 Silver", "950 Platinum"
    required: true
  },
  images: {
    type: [String], // array of image URLs (placeholders for now)
    default: []
  },
  stock: {
    type: Number,
    default: 10
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);