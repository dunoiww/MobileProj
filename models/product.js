const mongoose = require('mongoose')

// image
const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

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
  screen: {
    type: String,
    required: true
  },
  operating_system: {
    type: String,
    required: true
  },
  rear_camera: {
    type: String,
    required: true
  },
  front_camera: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  rom: {
    type: String,
    required: true
  },
  chip: {
    type: String,
    required: true
  },
  sim: {
    type: String,
    required: true
  },
  images: {
    type: [imageSchema],
    required: true
  },
  types: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)