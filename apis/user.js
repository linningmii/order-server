const {parsePostData} = require('../utils')

module.exports = function (router, db) {
  const User = db.model('User', {
    name: String
  })

  router
    .post('/user', async function (ctx) {
      let params = {}
      let user = {}

      await parsePostData(ctx)
        .then(res => {
          Object.assign(params, res)
        })

      await new User({
        name: params.name
      })
        .save()

      ctx.body = {
        message: 'create user success',
        user: {
          name: params.name
        }
      }
    })
    .get('/user', function (ctx) {
      ctx.body = {
        id: 1,
        date: ['BOOM']
      }
    })
    .put('/user', function (ctx) {
      ctx.body = {
        message: 'update user success'
      }
    })
    .delete('/user', function (ctx) {
      ctx.body = {
        message: 'delete user success'
      }
    })

}