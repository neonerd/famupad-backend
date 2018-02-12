module.exports = async function (ctx, next) {
  if (ctx.request.get('Authorization')) {
    const userSession = await ctx.sessionStore.get('user_session_' + ctx.request.get('Authorization'))
    if (userSession) {
      ctx.user = userSession
    } else {
      ctx.user = null
    }
  }
  return next()
}