const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");

class CartService {
  async createOrUpdate(user_id, goods_id) {
    // 根据user_id和goods_id同时查找，看有没有记录
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });

    if (res) {
      // 已经存在记录了,将number加一
      await res.increment("number");
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }

  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  async updateCart(params) {
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);
    if (!res) return "";

    number ? (res.number = number) : "";
    selected ? (res.selected = selected) : "";

    return await res.save();
  }

  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  async selectAllCarts(user_id, selected) {
    return await Cart.update(
      { selected },
      {
        where: {
          user_id,
        },
      }
    );
  }

  async findTotal(user_id) {
    return await Cart.count({ where: { user_id } });
  }
}

module.exports = new CartService();
