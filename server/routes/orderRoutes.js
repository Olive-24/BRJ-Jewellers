const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

module.exports = router;