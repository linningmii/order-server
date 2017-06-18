const moment = require('moment')
const {logger} = require('../utils')

module.exports = function (router, {User}) {
  router
    .get('/count', function (ctx) {
      ctx.body = {
        result: {
          count: 100,
          countTime: 1497627794
        }
      }
    })
    .get('/count/update/startTime/:startTime/endTime/:endTime', async function (ctx) {
      let
        count = 0,
        countStart = moment().unix(),
        countTime,
        cost

      const
        startTime = parseInt(ctx.params.startTime),
        endTime = parseInt(ctx.params.endTime)

      await User
        .find()
        .then(users => {
          users.forEach(user => user.date.find(date => date >= startTime && date < endTime) && count++)
        })

      countTime = moment().unix()
      cost = countTime - countStart

      // logger.info(countTime)

      ctx.body = {
        result: {
          cost,
          count,
          countTime
        }
      }
    })
}