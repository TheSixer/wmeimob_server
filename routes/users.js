const router = require('koa-router')()
const userCtrl = require('../controllers/users/userCtrl')

router.prefix('/users')
/**
 * 注册
 */
router.post('/register', userCtrl.register)
/*
登录
 */
router.post('/login', userCtrl.login)

module.exports = router
