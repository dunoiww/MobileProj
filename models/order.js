const mongoose = require('mongoose')

// id mongo tự tăng
const orderSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  quantity: {
    type: NumberInt,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Order', orderSchema)