const router = require('koa-router')()
const {
  insertUser,
  findUserById,
  findUserByName
} = require('../modules/users')

router.prefix('/users')
/*
根据id查找用户
 */
router.get('/', async (ctx, next) => {
  const id = parseInt(ctx.query.id)
  const user = await findUserById(id)

  if (user.length) {
    ctx.response.body = user[0]
  } else {
    ctx.response.body = {
      code: -1,
      msg: '用户不存在'
    }
  }
})
/*
新增用户
 */
router.post('/', async (ctx, next) => {
  const formData = ctx.request.body
  /*
    判断用户名是否存在
   */
  const user = await findUserByName(formData.app_name)

  if (user.length) {
    ctx.response.body = {
      code: -1,
      msg: '用户名已存在'
    }
  } else {
    await insertUser(formData)
    ctx.response.body = {
      code: 0,
      msg: 'success'
    }
  }
})

module.exports = router
