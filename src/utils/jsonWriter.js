const fs = require('fs')

function jsonWriter(filePath, data, cb) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      return cb?.(err)
    }
  })
}

module.exports = { jsonWriter }
