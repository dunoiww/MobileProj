const mongoose = require('mongoose')

// id mongo tự tăng
const cartSchema = new mongoose.Schema({
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
  }
})

module.exports = mongoose.model('Cart', cartSchema)