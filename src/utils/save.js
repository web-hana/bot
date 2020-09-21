const fs = require('fs')
const path = require('path')

const save = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(path.dirname(filePath))
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }
  }
}
module.exports = save