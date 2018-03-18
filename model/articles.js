const SeqStandard = require('sequelize')
const sequelize = require('../dbConnection/mysql')

// 创建 model
const Articles = sequelize.define('articles', {
  id: {
    type: SeqStandard.STRING(50),
    primaryKey: true
  },
  title: {
    type: SeqStandard.TEXT,
    field: 'title',
    allowNull: false
  },
  content: {
    type: SeqStandard.TEXT,
    field: 'content',
    allowNull: false
  },
  topic: {
    type: SeqStandard.STRING,
    field: 'topic',
    defaultValue: 'talk'
  },
  desc: {
    type: SeqStandard.STRING,
    field: 'desc',
    defaultValue: 'write'
  },
  view: {
    type: SeqStandard.INTEGER,
    field: 'view',
    defaultValue: 0
  }
}, {
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: false,
  charset: 'utf8mb4'
})

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 force = false
//申请项目表数据库
Articles.sync({
  force: false  
})


module.exports = Articles