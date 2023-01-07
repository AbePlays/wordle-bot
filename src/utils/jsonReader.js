const fs = require('fs')

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb?.(err)
    }
    try {
      const object = JSON.parse(fileData)
      return cb?.(null, object)
    } catch (err) {
      return cb?.(err)
    }
  })
}

module.exports = { jsonReader }
