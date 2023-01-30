// 通过sequelize的ORM定义的模型
const { DataTypes } = require("sequelize");
const seq = require("../db/seq");


const Goods = seq.define("zd_goods", {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "商品名称",
  },
  goods_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    comment: "商品价格",
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "商品库存",
  },
  goods_img:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'商品图片url'
  }
}, {
  paranoid:true // 用于软删除,会多一个deleteAt字段
});

// 强制同步模型到数据库
// Goods.sync({ force: true }); 
// force: true 如果原来就存在这个表，就把原来的表删掉重新创建

module.exports = Goods