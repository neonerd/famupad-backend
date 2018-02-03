const R = require('ramda')
const moment = require('moment')

const crypto = require('crypto')
const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const user = (await queries.user.get_by_email({email: ctx.request.body.email}, ctx.sqlAdapter))[0]

  const hash = crypto.createHash('sha1')
  hash.update(ctx.request.body.password)
  
  if (user && user.password.toUpperCase() === hash.digest('hex').toUpperCase()) {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    ctx.sessionStore.set('user_session_' + token, user)

    ctx.body = {
      status: 'OK',
      data: {
        token,
        expires_at: moment().utc() + 3600,
        user
      }
    }
  } else {
    ctx.status = 403
    ctx.body = {status: 'ERROR', data: {
      message: 'Wrong email or password!'
    }}
  }
}
