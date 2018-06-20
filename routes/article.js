const router = require('koa-router')()
const articleCtrl = require('../controllers/article/articleCtrl')
const authorize = require('../controllers/authorize')

router.prefix('/article')
/**
 * 查找所有文章
 */
router.get('/all', articleCtrl.queryAll)
/**
 * 新建文章
 */
router.post('/new', articleCtrl.newArticle, authorize)

module.exports = router
