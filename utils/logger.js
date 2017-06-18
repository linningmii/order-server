const log4js = require('log4js')
const logger = log4js.getLogger()

log4js.configure({
  appenders: [{
    type: 'file',
    filename: 'logs/count.log'
  }]
})

module.exports = logger