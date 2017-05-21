const CONFIG = require('./config')

const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const cors = require('kcors')
const session = require('koa-session')
const router = require('koa-router')()
const {deleteV} = require('./middlewares')

app.use(convert(cors()))
app.use(session(app))
app.use(router.routes())
router.use(deleteV())

const apis = require('./apis')
apis(router)

app.listen(CONFIG.PORT)
console.log(`server run on port ${CONFIG.PORT}`)