module.exports = function () {
  return async function (ctx, next) {
    await next()
    deleteV(ctx.body.result)
  }
}

function deleteV(o) {
  if (o.hasOwnProperty('__v')) {
    delete o.__v
  }
}