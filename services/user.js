const moment = require('moment')
const {User} = require('../models')

module.exports = function () {
  return {
    /**
     * 获取用户列表
     * @returns {Promise.<TResult>|Promise|*}
     */
    getList () {
      const curTime = moment().unix()

      return User
        .find()
        .then(resp => resp.map(user => ({
            id: user._id,
            username: user.username,
            name: user.name,
            sex: user.sex,
            latestOrder: user.date.filter(date => (date < curTime)).slice(-1) // todo latestOrder这里也许需要改为不实时统计
          }))
        )
    },

    /**
     * 添加用户
     * @param user
     * @returns {Promise|Promise.<TResult>|*}
     */
    addUser (user) {
      return new User(user)
        .save()
        .then(res => {
          user = Object.assign({}, res._doc)
          user.id = user._id
          delete user._id

          return user
        })
    }
  }
}