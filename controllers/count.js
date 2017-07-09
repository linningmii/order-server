const {count} = require('../services')

module.exports = function (router) {
  router
    .get('/count', async function (ctx) {
      ctx.body = {
        result: await count().countFromLog()
      }
    })
    .get('/count/update', async function (ctx) {
      ctx.body = {
        result: await count().countFromDB()
      }
    })
    .get('/count/update/startTime/:startTime/endTime/:endTime', async function (ctx) {
      let
        startTime = parseInt(ctx.params.startTime),
        endTime = parseInt(ctx.params.endTime)

      ctx.body = {
        result: await count().countFromDB(startTime, endTime)
      }
    })
}