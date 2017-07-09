const moment = require('moment')
const {logger} = require('../utils')
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)

module.exports = function (router, {User}) {
  router
    .get('/count', async function (ctx) {
      let
        count,
        countTime

      await readFile(path.resolve(__dirname, '../logs/count.log'), 'utf8')
        .then(log => {
          const logs = log.split('\n')
          let latestLog = logs[logs.length - 2]
          const kv = latestLog.slice(latestLog.indexOf('time')).split(',')
          let logData = {}
          kv.forEach(kv => {
            let separator = kv.indexOf(':')
            logData[kv.slice(0, separator)] = parseInt(kv.slice(separator + 1))
          })

          count = logData.count
          countTime = logData.time
        })

      ctx.body = {
        result: {
          count,
          countTime
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

      logger.info(`time:${countTime},count:${count},cost:${cost}`)

      ctx.body = {
        result: {
          cost,
          count,
          countTime
        }
      }
    })
}