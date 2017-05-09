module.exports = function () {
  return async function (ctx, next) {
    await next()

    try {
      deleteV(ctx.body.result)
    } catch (err) {
    }
  }
}

function deleteV(o) {
  if (!o) {
    return
  }

  if (o.hasOwnProperty('__v')) {
    delete o.__v
  }
}