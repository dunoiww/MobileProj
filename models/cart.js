const mongoose = require('mongoose')

// id mongo tự tăng
const cartSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
     default: 1
  }
})

module.exports = mongoose.model('Cart', cartSchema)