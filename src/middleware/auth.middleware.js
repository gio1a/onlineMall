const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");
const {
  tokenExpiredError,
  invalidToken,
  notBeforeError,
  hasNotPermission
} = require("../constant/err.type");

// 认证
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.headers;
  const token = authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, JWT_SECRET); // 返回payload的信息
    ctx.state.user = user; // 将当前登录的用户信息保存到ctx.state.user
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("token无效", err);
        return ctx.app.emit("error", invalidToken, ctx);
      case "NotBeforeError":
        console.error("jwt not active", err);
        return ctx.app.emit("error", notBeforeError, ctx);
    }
  }
  await next();
};

// 授权
const hasPermission = async (ctx, next) => {
  const {is_admin} = ctx.state.user //先登录ctx.state.user才有值
  if(!is_admin) {
    console.error('该用户没有操作权限',ctx.state.user)
    return ctx.app.emit('error', hasNotPermission, ctx)
  }

  await next()
}

module.exports = {
  auth,
  hasPermission
};
