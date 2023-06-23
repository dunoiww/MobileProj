require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// app.use();
app.use(express.json())

const userRouter = require('./routes/user')
app.use('/user', userRouter)

const productRouter = require('./routes/product')
app.use('/product', productRouter)

const cartRouter = require('./routes/cart')
app.use('/cart', cartRouter)

const orderRouter = require('./routes/order')
app.use('/order', orderRouter)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const port = 3000;

app.listen(port, () => console.log('Server Started'))