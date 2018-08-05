const {
  newArticle,
  queryAllPosts,
  queryPostsById
} = require('../../modules/article')

class articleCtrl {

  static async queryAll (ctx) {

    const data = await queryAllPosts()
    console.log(data);
    ctx.response.body = {
      code: 0,
      data,
      msg: 'success'
    }
  }

  static async newArticle (ctx, next) {
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
  }

  static async queryPostsById (ctx, next) {
    const { id } = ctx.params
    if (!isNaN(Number(id))) {
      const data = await queryPostsById(id)
      ctx.response.body = data[0]
    } else {
      ctx.response.status = 404
      ctx.response.body = {
        code: -1,
        msg: '文章不存在'
      }
    }
  }
}

module.exports = articleCtrl
