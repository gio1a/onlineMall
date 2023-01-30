const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Address = seq.define("zd_addr", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "收货人",
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: "电话号码",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "地址",
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: "是否为默认地址",
  },
});

// Address.sync({ force: true });

module.exports = Address;
