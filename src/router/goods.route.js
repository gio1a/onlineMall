const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { auth, hasPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");
const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll,
} = require("../controller/goods.controller");

// 商品图片上传
router.post("/upload", auth, hasPermission, upload);

//发布商品
router.post("/", auth, hasPermission, validator, create);

// 修改商品(只能修改没被下架的商品)
router.put("/:id", auth, hasPermission, validator, update);

//删除商品
// router.delete("/:id", auth, hasPermission, remove);// 硬删除(不推荐使用)
// 软删除：上架下架 paranoid:true 偏执表
router.post("/:id/off", auth, hasPermission, remove);
// 软删除(下架)后，不会删除数据库里的记录，而是更新deleteAt字段下的值

// 上架商品（必须deleteAt不为null才能上架）
router.post("/:id/on", auth, hasPermission, restore);

// 获取商品列表
router.get("/", findAll);

module.exports = router;
