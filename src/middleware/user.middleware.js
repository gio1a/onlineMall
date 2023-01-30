const bcrypt = require("bcryptjs");

const { getUserInfo } = require("../service/user.service");
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPwd,
} = require("../constant/err.type");

const userValidator = async (ctx, next) => {
  // 验证合法性
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  // 验证合理性
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户名已存在", { user_name });
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

// 加密
const cryptPwd = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10); // 加盐10次
  const hash = bcrypt.hashSync(password, salt); // 对传进来的密码进行加密,将加密后的密文传给hash

  ctx.request.body.password = hash; // 将密文挂载到密码里，覆盖明文密码
  await next();
};

const verifyLogin = async (ctx, next) => {
  //登录验证
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户不存在", { user_name });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPwd, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    return ctx.app.emit("error", userLoginError, ctx);
  }

  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  cryptPwd,
  verifyLogin,
};
