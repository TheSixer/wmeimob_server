const router = require('koa-router')()
const {
  insertUser,
  findUserById
} = require('../libs/mysql.base');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  const id = parseInt(ctx.query.id)
  const user = await findUserById(id)
  ctx.response.body = user[0]
})

router.post('/string', async (ctx, next) => {
  const formData = ctx.request.body

  await insertUser(formData)
  ctx.response.body = {
    code: 0,
    msg: 'success'
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
