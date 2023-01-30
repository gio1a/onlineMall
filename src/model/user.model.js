// 通过sequelize的ORM定义的模型
const { DataTypes } = require("sequelize"); // 数据类型
const seq = require("../db/seq");

// 创建模型
// Model zd_user对应的数据表：zd_users 自动推断表名加上s
const User = seq.define("zd_user", {
  // 添加属性：字段
  // id会被sequelize自动创建 管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名 唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员，0-不是（默认），1-是管理员",
  }
}
// ,{
//   timestamps:false
//   // 把timestamp设为false就不会自动生成createAt和updateAt属性(字段)
//   // createAt和updateAt由sequelize自动维护
// }
);

// 强制同步模型到数据库
// User.sync({ force: true }); // force: true 如果原来就存在这个表，就把原来的表删掉重新创建

module.exports = User