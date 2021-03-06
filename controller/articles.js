const Sequelize = require('sequelize')

const Articles = require('../model/articles')

// 添加新用户
const article = Articles.sync({
  force: false
})

const addArticle = (data) => {
  // 向 articles 表中插入数据
  return Articles.create({
    id: data.id,
    title: data.title,
    desc: data.desc,
    topic: data.topic,
    content: data.content
  })
}

// 查找文章
const findArticle = function (id) {
  return Articles.findOne({
    where: {
      id
    }
  })
}

// 修改文章
const editArticle = function (data, id) {
  return Articles.update(data, {
    where: {
      id
    }
  })
}

// 寻找所有文章
const getAll = function () {
  return Articles.findAll()
}
const getArticles = function (page, pageSize) {
  return Articles.findAndCountAll({
    where: '', //为空，获取全部，也可以自己添加条件
    offset: (page - 1) * pageSize, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    limit: pageSize, //每页限制返回的数据条数
    order: [['createdAt', 'DESC']]
  })
}

// 根据浏览量查询
const getArticlesByType = (type, index) => {
  return Articles.findAll({
    limit: parseInt(index), //每页限制返回的数据条数
    order: [[`${type}`, 'DESC']]
  })
}

// 删除制定文章
const deleteArticle = function (id) {
  return Articles.destroy({
    where: {
      id
    }
  })
}

// 增加文章浏览量
const addArticleViewCount = async (id) => {
  let article = await Articles.findOne({
    where: {
      id
    }
  })
  return Articles.update({
    view: article.view + 1
  }, {
    where: {
      id
    }
  })
}

// 模糊查询
const fuzzyQuery = async (info, page, pageSize) => {
  return Articles.findAndCountAll({
    where: {
      [Sequelize.Op.or]: [
        {
          title: {
            [Sequelize.Op.like]: `%${info}%`
          }
        },
        {
          content: {
            [Sequelize.Op.like]: `%${info}%`
          }
        },
        {
          topic: {
            [Sequelize.Op.like]: `%${info}%`
          }
        },
        {
          createdAt: {
            [Sequelize.Op.like]: `%${info}%`
          }
        },
      ]
    },
    offset: (page - 1) * pageSize, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    limit: pageSize, //每页限制返回的数据条数
    order: [['createdAt', 'DESC']]
  })
}

module.exports = {
  getAll,
  getArticles,
  addArticle,
  deleteArticle,
  findArticle,
  editArticle,
  addArticleViewCount,
  fuzzyQuery,
  getArticlesByType,
}