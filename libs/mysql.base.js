const mysql = require('mysql');
const config = require('../config/default.js')

const pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
})

module.exports = {
  query: function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          resolve( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
}

const posts=
`create table if not exists posts(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 title VARCHAR(40) NOT NULL,
 content  VARCHAR(40) NOT NULL,
 uid  VARCHAR(40) NOT NULL,
 moment  VARCHAR(40) NOT NULL,
 comments  VARCHAR(40) NOT NULL DEFAULT '0',
 pv  VARCHAR(40) NOT NULL DEFAULT '0',
 PRIMARY KEY ( id )
);`

const comment=
`create table if not exists comment(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 content VARCHAR(40) NOT NULL,
 postid VARCHAR(40) NOT NULL,
 PRIMARY KEY ( id )
);`

// const createTable = function( sql ) {
//   return query( sql, [] )
// }
//
// // 建表
// createTable(posts)
// createTable(comment)

// 注册用户
const insertUser = async function( value ) {
  let _sql = `insert into users(name,pass) values('${value.name}','${value.pass}');`
  return await query( _sql, value)
}
// 发表文章
const insertPost = async function( value ) {
  let _sql = "insert into posts(name,title,content,uid,moment) values(?,?,?,?,?);"
  return await query( _sql, value )
}
// 更新文章评论数
const updatePostComment = async function( value ) {
  let _sql = "update posts set  comments=? where id=?"
  return await query( _sql, value )
}

// 更新浏览数
const updatePostPv = async function( value ) {
  let _sql = "update posts set  pv=? where id=?"
  return await query( _sql, value )
}

// 发表评论
const insertComment = async function( value ) {
  let _sql = "insert into comment(name,content,postid) values(?,?,?);"
  return await query( _sql, value )
}
// 通过名字查找用户
const findDataByName = async function (  name ) {
  const _sql = `SELECT * FROM users where name='${name}'`
  return await query(_sql)
}
// 通过id查找用户
const findUserById = async function (id) {
  const _sql = `SELECT * from users where id=${id};`
  return await query(_sql)
}
// 通过文章的名字查找用户
const findDataByUser = async function (  name ) {
  let _sql = `
    SELECT * from posts
      where name="${name}"
      `
  return await query( _sql)
}
// 通过文章id查找
const findDataById = async function (  id ) {
  let _sql = `
    SELECT * from posts
      where id="${id}"
      `
  return await query( _sql)
}
// 通过评论id查找
const findCommentById = async function ( id ) {
  let _sql = `
    SELECT * FROM comment where postid="${id}"
      `
  return await query( _sql)
}

// 查询所有文章
const findAllPost = async function (  ) {
  let _sql = `
    SELECT * FROM posts
      `
  return await query( _sql)
}
// 更新修改文章
const updatePost = async function(values){
  let _sql=`update posts set  title=?,content=? where id=?`
  return await query(_sql,values)
}
// 删除文章
const deletePost = async function(id){
  let _sql=`delete from posts where id = ${id}`
  return await query(_sql)
}
// 删除评论
const deleteComment = async function(id){
  let _sql=`delete from comment where id = ${id}`
  return await query(_sql)
}
// 删除所有评论
const deleteAllPostComment = async function(id){
  let _sql=`delete from comment where postid = ${id}`
  return await query(_sql)
}
// 查找
const findCommentLength = async function(id){
  let _sql=`select content from comment where postid in (select id from posts where id=${id})`
  return await query(_sql)
}
// module.exports = {
//   query,
//   createTable,
//   insertUser,
//   findUserById,
//   findDataByName,
//   insertPost,
//   findAllPost,
//   findDataByUser,
//   findDataById,
//   insertComment,
//   findCommentById,
//   updatePost,
//   deletePost,
//   deleteComment,
//   findCommentLength,
//   updatePostComment,
//   deleteAllPostComment,
//   updatePostPv
// }
