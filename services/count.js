const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const {User} = require('../models')
const moment = require('moment')
const {logger} = require('../utils')

module.exports = function () {
  return {

    /**
     * 获取统计日志中最新的统计数据
     * @returns {Promise|Promise.<TResult>|*}
     */
    countFromLog: function () {
      return readFile(path.resolve(__dirname, '../logs/count.log'), 'utf8')
        .then(log => {
          let logData = {}
          const logs = log.split('\n')
          let latestLog = logs[logs.length - 2]
          const kv = latestLog.slice(latestLog.indexOf('time')).split(',')
          kv.forEach(kv => {
            let separator = kv.indexOf(':')
            logData[kv.slice(0, separator)] = parseInt(kv.slice(separator + 1))
          })

          return {
            count: logData.count,
            countTime: logData.time
          }
        })
    },

    /**
     * 根据起始时间和结束时间从DB中计算人数
     * @param startTime 默认值为当天0点
     * @param endTime 默认值为startTime向后推一天
     * @returns {Promise|Promise.<TResult>|*}
     */
    countFromDB: function (startTime, endTime) {
      if (!startTime) {
        startTime = moment(moment().format('YYYY-MM-DD')).unix()
      }

      if (!endTime) {
        endTime = startTime + moment.duration(1, 'days').asSeconds()
      }

      let
        count = 0,
        countStart = moment().unix(),
        countTime,
        cost

      return User
        .find()
        .then(users => {
          users.forEach(user => user.date.find(date => date >= startTime && date < endTime) && count++)

          countTime = moment().unix()
          cost = countTime - countStart

          logger.info(`time:${countTime},count:${count},cost:${cost}`)

          return {
            count,
            countTime,
            cost
          }
        })

    }
  }
}