const fs = require('fs')

const load = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString())
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {}
    }
  }
}
module.exports = load