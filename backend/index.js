require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const PORT = 3001
const getDataRouter = require('./src/routes/getData')
const authRouter = require('./src/routes/auth')
const paymentRouter = require('./src/routes/payments')

app.use(cors(
  {
    origin:{"https://food-ordering-app-yfgn.vercel.app"},
    methods:["POST","GET","PATCH"],
    credentials:true
  }
))
app.use(bodyParser.json());
app.use('/api',getDataRouter)
app.use('/auth',authRouter)
app.use('/cart',paymentRouter)

app.listen(PORT)
