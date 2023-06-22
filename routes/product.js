const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Getting all
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product)
})

// Creating one
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    describe: req.body.describe,
    screen: req.body.screen,
    operating_system: req.body.operating_system,
    rear_camera: req.body.rear_camera,
    front_camera: req.body.front_camera,
    ram: req.body.ram,
    rom: req.body.rom,
    chip: req.body.chip,
    sim: req.body.sim,
    images: req.body.images,
    color: req.body.color,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // Updating One
// router.patch('/:id', getCart, async (req, res) => {
//   if (req.body.product_id != null) {
//     res.cart.product_id = req.body.product_id
//   }
//   if (req.body.product_name != null) {
//     res.cart.product_name = req.body.product_name
//   }
//   if (req.body.user_id != null) {
//     res.cart.user_id = req.body.user_id
//   }
//   if (req.body.quantity != null) {
//     res.cart.quantity = req.body.quantity
//   }
//   try {
//     const updatedCart = await res.cart.save()
//     res.json(updatedCart)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted product' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.product = product
  next()
}

module.exports = router