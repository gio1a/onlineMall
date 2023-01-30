const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/order.middleware");
const { create, findAll, update } = require("../controller/order.controller");

const router = new Router({ prefix: "/orders" });

//生成订单
router.post(
  "/",
  auth,
  validator({
    address_id: "int",
    goods_info: "string",
    total: "string",
  }),
  create
);

router.get("/", auth, findAll);

router.patch("/:id", auth, validator({ status: "number" }), update);

module.exports = router;
