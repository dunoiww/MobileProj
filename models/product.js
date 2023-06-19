const mongoose = require('mongoose')

// id mongo tự tăng
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: BigInt,
    required: true
  },
  describe: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  types: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)