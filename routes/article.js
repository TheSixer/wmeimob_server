const router = require('koa-router')()

const {
  newArticle,
  queryAllPosts
} = require('../modules/article')
const authorize = require('../controllers/authorize')

router.prefix('/article')
/**
 * 查找所有文章
 */
router.get('/all', async (ctx, next) => {

  const data = await queryAllPosts()
  ctx.response.body = {
    code: 0,
    data,
    msg: 'success'
  }
})
/**
 * 新建文章
 */
router.post('/new', async (ctx, next) => {
  /**
   * 先执行authorize中间件，验证权限
   */
  await next()

  const { uid, title, content } = ctx.request.body
  const params = { uid, title, content }

  await newArticle(params)
  console.log(ctx)
  ctx.response.body = {
    code: 0,
    msg: 'success'
  }
}, authorize)

module.exports = router
