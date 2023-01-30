const Router = require("koa-router");
const {
  userValidator,
  verifyUser,
  cryptPwd,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");
const { register, login, changePwd } = require("../controller/user.controller");

const router = new Router({ prefix: "/users" }); // 统一前缀

 // 注册
router.post("/register", userValidator, verifyUser, cryptPwd, register);

// 登录
router.post("/login", userValidator, verifyLogin, login);

// 修改密码
router.patch("/", auth, cryptPwd, changePwd);

module.exports = router;
