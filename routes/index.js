const router = require('koa-router')()
const {
  insertUser,
  findUserById
} = require('../libs/mysql.base');
/**
 * 验证token中间件
 */
const authorize = require('../controllers/authorize')

router.get('/', authorize, async (ctx, next) => {
  ctx.response.body = ctx.response.body + ', I am.'
})

router.get('/token', async (ctx, next) => {
  const id = parseInt(ctx.query.id)
  const user = await findUserById(id)
  ctx.response.body = user[0]
})

module.exports = router
