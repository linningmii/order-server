const log4js = require('log4js')

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: 'logs/count.log'
  }]
})

const logger = log4js.getLogger()
logger.setLevel('info')

module.exports = logger