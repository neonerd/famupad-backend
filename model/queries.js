const puresql = require('puresql')
const fs = require('fs')

const files = fs.readdirSync(__dirname + '/sql')
const queries = {}

files.map(file => {
  queries[file.split('.')[0]] = puresql.loadQueries(__dirname + '/sql/' + file)
})

module.exports = queries
