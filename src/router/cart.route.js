const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
const {
  add,
  findAll,
  update,
  remove,
  selectAll,
  getTotal,
} = require("../controller/cart.controller");

const router = new Router({ prefix: "/carts" });

//加入购物车
router.post("/", auth, validator({ goods_id: "number" }), add);

// 列表
router.get("/", auth, findAll);

// 修改 修改选中状态和数量
router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

// 删除
router.delete("/", auth, validator({ ids: "array" }), remove);

// 全选中/全部取消选中
router.post("/selectAll", auth, validator({ selected: "bool" }), selectAll);

// 获取购物车中商品总数
router.get("/total", auth, getTotal);

module.exports = router;
