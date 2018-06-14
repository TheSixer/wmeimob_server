const query = require('../libs/mysql.base')

const users=
`create table if not exists users(
  id int unsigned not null auto_increment comment '主键id',
  nick_name varchar(255) not null default '' comment '昵称',
  phone varchar(255) not null default '' comment '手机号',
  password varchar(255) not null default '' comment '密码',
  sex tinyint unsigned not null default '0' comment '性别： 0-男；1-女',
  avatars varchar(255) not null default '' comment '头像',
  email varchar(255) not null default '' comment '邮箱',
  status tinyint unsigned not null default '0' comment '状态： 1-启用；0-禁用',
  sign varchar(255) not null default '' comment '个性签名',
  note varchar(255) not null default '' comment '备注',
  date varchar(255) not null default '' comment '统计日期',
  mtime int unsigned not null comment '修改时间',
  ctime int unsigned not null comment '创建时间',
  primary key (id),
  unique key unique_phone_date (phone,date),
  key idx_phone (phone),
  key idx_date (date),
  key idx_ctime (ctime)
)engine=innodb default charset=utf8 comment '这是一张用户表';`

const createTable = function(sql) {
  return query( sql, [] )
}

// 建表
createTable(users)

// 注册用户
const insertUser = async function(value) {
  const now = (new Date().getTime()) / 1000
  let _sql = `insert into users(
    phone,
    password,
    date,
    mtime,
    ctime
  ) values('${value.phone}','${value.pwd}','${now}','${now}','${now}');`
  return await query( _sql, value)
}
// 通过名字查找用户
const findUserByName = async function (name) {
  const _sql = `SELECT * from users where nick_name='${name}'`
  return await query(_sql)
}
// 通过id查找用户
const findUserById = async function (id) {
  const _sql = `SELECT * from users where id=${id};`
  return await query(_sql)
}
// 通过phone查找用户
const verifyingPhone = async function (phone) {
  const _sql = `SELECT * from users where phone=${phone};`
  return await query(_sql)
}

module.exports = {
  insertUser,
  findUserById,
  findUserByName,
  verifyingPhone
}
