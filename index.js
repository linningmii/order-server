const CONFIG = require('./config')

const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const cors = require('kcors')
const router = require('koa-router')()
const {deleteV} = require('./middlewares')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost/orderDB')

app.use(convert(cors()))
app.use(router.routes())
router.use(deleteV())

const apis = require('./apis')
apis(router, db)

app.listen(CONFIG.PORT)
console.log(`server run on port ${CONFIG.PORT}`)