const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/AuthMiddleware');
const { getWishlist, toggleWishlist } = require('../controllers/wishlistController');

router.use(protect);

router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);

module.exports = router;