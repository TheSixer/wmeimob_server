const jwt = require('jwt-simple')

module.exports = async (ctx, next) => {
  /**
   * 校验token
   */
  const token = ctx.request.header.authorization
  if (token) {
    const user = jwt.decode(token, 'wmeimob')
    const now = new Date()
    /**
     * token是否过期
     */
    if (now < user.expires) {
      ctx.request.body.uid = user.id
      next()
    } else {
      ctx.response.body = {
        code: -1,
        msg: 'token已失效'
      }
    }
  } else {
    ctx.response.body = {}
  }
}
