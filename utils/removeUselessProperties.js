const conditions = [0, '', false]

/**
 * return handled object, the original object will not be modified
 * @param obj
 * @returns {*}
 */
module.exports = function (obj) {
  let cloneObj = Object.assign({}, obj)
  Object.keys(obj).filter(key => !obj[key] && !~conditions.indexOf(obj[key])).forEach(key => delete cloneObj[key])
  return cloneObj
}