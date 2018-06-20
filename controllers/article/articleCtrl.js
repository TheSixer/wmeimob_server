const {
  newArticle,
  queryAllPosts
} = require('../../modules/article')

class articleCtrl {

  static async queryAll (ctx) {

    const data = await queryAllPosts()
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
}

module.exports = articleCtrl
