const { query } = require('../libs/mysql.base')

const users=
`create table if not exists users(
  id int unsigned not null auto_increment comment '主键id',
  app_id int unsigned not null default '0' comment '应用id',
  app_name varchar(255) not null default '' comment '应用名',
  click_cnt int unsigned not null default '0' comment '点击数',
  disp_cnt int unsigned not null default '0' comment '展示数',
  status tinyint unsigned not null default '0' comment '状态： 1-启用；0-禁用',
  click_rate float unsigned not null default '0' comment '点击率=点击数/展示数',
  note text not null comment '备注',
  date varchar(255) not null default '' comment '统计日期',
  mtime int unsigned not null comment '修改时间',
  ctime int unsigned not null comment '创建时间',
  primary key (id),
  unique key unique_date_appid (date,app_id),
  key idx_date (date),
  key idx_ctime (ctime)
)engine=innodb default charset=utf8 comment '这是一张示例表';`

const createTable = function(sql) {
  return query( sql, [] )
}

// 建表
createTable(users)

// 注册用户
const insertUser = async function( value ) {
  let _sql = `insert into users(
    app_name,
    note,
    date,
    mtime,
    ctime
  ) values('${value.app_name}','${value.note}','${(new Date().getTime())/1000}','${(new Date().getTime())/1000}','${(new Date().getTime())/1000}');`
  return await query( _sql, value)
}
// 通过名字查找用户
const findUserByName = async function (name) {
  const _sql = `SELECT * from users where app_name='${name}'`
  return await query(_sql)
}
// 通过id查找用户
const findUserById = async function (id) {
  const _sql = `SELECT * from users where id=${id};`
  return await query(_sql)
}

module.exports = {
  insertUser,
  findUserById,
  findUserByName
}
