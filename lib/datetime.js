const R = require('ramda')
const moment = require('moment')

module.exports = {

  getObjectWithDatetimes (properties, obj) {
    return Object.assign({}, obj, R.zipObj(properties, properties.map(p => moment.utc().format('YYYY-MM-DD HH:mm:ss'))))
  }

}