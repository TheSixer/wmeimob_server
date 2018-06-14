const query = require('../libs/mysql.base')

const posts=
`create table if not exists posts(
  id int unsigned not null auto_increment comment '主键id',
  uid int unsigned not null comment '用户ID',
  title varchar(255) not null default '' comment '标题',
  status tinyint unsigned not null default '0' comment '状态： 2-审核中；1-启用；0-禁用',
  content longtext not null comment '文章内容',
  date varchar(255) not null default '' comment '统计日期',
  mtime bigint(20) not null comment '修改时间',
  ctime bigint(20) not null comment '创建时间',
  primary key (id),
  unique key unique_date (date),
  key idx_date (date),
  key idx_ctime (ctime)
)engine=innodb default charset=utf8 comment '这是一张文章表';`

const createTable = function(sql) {
  return query( sql, [] )
}

// 建表
createTable(posts)

// 查找所有文章
const queryAllPosts = async function(value) {
  const now = (new Date().getTime())
  let _sql = `select * from posts;`
  return await query( _sql, value)
}

// 新增文章
const newArticle = async function(value) {
  const now = (new Date().getTime())
  let _sql = `insert into posts(
    uid,
    title,
    content,
    date,
    mtime,
    ctime
  ) values('${value.uid}','${value.title}','${value.content}','${now}','${now}','${now}');`
  return await query( _sql, value)
}

module.exports = {
  newArticle,
  queryAllPosts
}