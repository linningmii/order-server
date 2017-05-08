function parsePostData(context) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ''
      context.req.addListener('data', (data) => {
        postData += data
      })
      context.req.addListener("end", function () {
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

module.exports = parsePostData