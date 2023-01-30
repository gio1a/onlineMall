const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/addr.middleware");
const {
  create,
  findAll,
  update,
  remove,
  setDefault,
} = require("../controller/addr.controller");

const router = new Router({ prefix: "/address" });

// 添加地址
router.post(
  "/add",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  create
);

//获取地址列表
router.get("/", auth, findAll);

// 修改
router.put(
  "/:id",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  update
);

// 删除
router.delete("/:id", auth, remove);

//设置默认
router.patch("/:id", auth, setDefault);

module.exports = router;
