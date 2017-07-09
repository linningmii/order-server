const CONFIG = require('./config')

const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
const session = require('koa-session')
const router = require('koa-router')()
const {deleteV} = require('./middlewares')
const {count} = require('./services')
const moment = require('moment')

app.use(cors())
app.use(session(app))
app.use(router.routes())
router.use(deleteV())

const apis = require('./controllers')
apis(router)

app.listen(CONFIG.PORT)
console.log(`server run on port ${CONFIG.PORT}`)

count().countFromDB()

setTimeout(() => {
  countPerHour()
}, (3600 + moment().minutes(0).seconds(0).unix() - moment().unix()) * 1000)

function countPerHour() {
  count().countFromDB()
  setTimeout(() => {
    countPerHour()
  }, 3600 * 1000)
}