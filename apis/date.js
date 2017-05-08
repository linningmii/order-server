const {parsePostData} = require('../utils')

module.exports = function (router, db) {
  router
    .get('/date/all', function (ctx) {
      db.find('User')
        .then(users => ctx.body = users)
    })
    .get('/date/:userId', async function (ctx) {
      console.log(ctx.params)
    })
    .post('/date/:userId', async function () {
      await parsePostData(ctx)
    })
}