const {
  createOrUpdate,
  findCarts,
  updateCart,
  removeCarts,
  selectAllCarts,
  findTotal,
} = require("../service/cart.service");

const { addToCartError, cartFormatError } = require("../constant/err.type");

class CartController {
  async add(ctx) {
    // 将商品添加到购物车
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    try {
      const res = await createOrUpdate(user_id, goods_id);
      ctx.body = {
        code: 0,
        message: "添加到购物车成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      addToCartError.result = error;
      return ctx.app.emit("error", addToCartError, ctx);
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const res = await findCarts(pageNum, pageSize);
    ctx.body = {
      code: 0,
      message: "获取购物车列表成功",
      result: res,
    };
  }

  async update(ctx) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;
    if (!number && !selected) {
      cartFormatError.message = "number和selected不能同时为空";
      return ctx.app.emit("error", cartFormatError, ctx);
    }
    const res = await updateCart({ id, number, selected });
    ctx.body = {
      code: 0,
      message: "更新购物车成功",
      result: res,
    };
  }

  async remove(ctx) {
    const { ids } = ctx.request.body;
    const res = await removeCarts(ids);
    ctx.body = {
      code: 0,
      message: "删除成功",
      result: res,
    };
  }

  async selectAll(ctx) {
    const user_id = ctx.state.user.id;
    const { selected } = ctx.request.body;
    const res = await selectAllCarts(user_id, selected);
    ctx.body = {
      code: 0,
      message: selected ? "全部选中" : "全部取消选中",
      result: res,
    };
  }

  async getTotal(ctx) {
    const user_id = ctx.state.user.id;
    const res = await findTotal(user_id);
    ctx.body = {
      code: 0,
      message: "获取总数成功",
      result: res,
    };
  }
}

module.exports = new CartController();
