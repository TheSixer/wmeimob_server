const router = require('koa-router')()
const articleCtrl = require('../controllers/article/articleCtrl')
const authorize = require('../controllers/authorize')

router.prefix('/article')
/**
* 根据Id查询文章
*/
router.get('/:id', articleCtrl.queryPostsById)
/**
 * 查找所有文章
 */
router.get('/', articleCtrl.queryAll)
/**
 * 新建文章
 */
router.post('/', articleCtrl.newArticle, authorize)

module.exports = router
