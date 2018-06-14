const crypto = require('crypto')
const router = require('koa-router')()
const jwt = require('jwt-simple')
const moment = require('moment')
const authorize = require('../controllers/authorize')
const {
  insertUser,
  findUserById,
  verifyingPhone,
  findUserByName
} = require('../modules/users')

router.prefix('/users')
/**
 * 注册
 */
router.post('/register', async (ctx, next) => {
  const { phone, code, pwd } = ctx.request.body
  let decipher = crypto.createDecipher('aes192', 'wmeimob')
  let password = decipher.update(pwd,'hex','utf8')
      password += decipher.final('utf8')
  /*
    判断手机号是否存在
   */
  const user = await verifyingPhone(phone)

  if (user.length) {
    ctx.response.body = {
      code: -1,
      msg: '该手机号已注册'
    }
  } else {
    const params = { phone, pwd }

    const data = await insertUser(params)
    /**
     * 拿到返回的用户ID生成token
     */
    params.id = data.insertId
    params.expires = moment().add('days', 7).valueOf()
    const token = jwt.encode(params, 'wmeimob')
    ctx.response.body = {
      code: 0,
      data: {
        token,
        expires: params.expires
      },
      msg: 'success'
    }
  }
})
/*
登录
 */
router.post('/login', async (ctx, next) => {
  const { phone, pwd } = ctx.request.body
  //  解析用户输入密码
  let decipher = crypto.createDecipher('aes192', 'wmeimob')
  let password = decipher.update(pwd, 'hex', 'utf8')
      password += decipher.final('utf8')
  //  根据手机号查找用户
  const user = await verifyingPhone(phone)

  if (user.length) {
    const userInfo = user[0]
    console.log(userInfo)
    //  解析数据库密码，和用户输入的对比
    let decipher2 = crypto.createDecipher('aes192', 'wmeimob')
    let password2 = decipher2.update(userInfo.password, 'hex', 'utf8')
        password2 += decipher2.final('utf8')
    if (password === password2) {
      /**
       * 拿到返回的用户ID生成token
       */
      let params = { phone, pwd, id: userInfo.id }
      params.expires = moment().add('days', 7).valueOf()
      const token = jwt.encode(params, 'wmeimob')
      ctx.response.body = {
        code: 0,
        data: {
          token,
          expires: params.expires,
          user: userInfo
        },
        msg: 'success'
      }
    } else {
      ctx.response.body = {
        code: -1,
        msg: '密码错误'
      }
    }
  } else {
    ctx.response.body = {
      code: -1,
      msg: '账号不存在'
    }
  }
})
/*
新增用户
 */
router.post('/', async (ctx, next) => {
  const formData = ctx.request.body
  /*
    判断手机号是否存在
   */
  const user = await verifyingPhone(formData.phone)

  if (user.length) {
    ctx.response.body = {
      code: -1,
      msg: '该手机号已注册'
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
