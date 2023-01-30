const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");

class UserController {
  // 获取数据 -> 操作数据库 -> 返回结果
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      console.log("controller createUser res --------->", res);
      ctx.body = {
        code: 0,
        message: "用户添加成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;

    try {
      // 获取用户信息，在token的payload中需要记录id，user_name，is_admin
      const { password, ...res } = await getUserInfo({ user_name }); // 对象解构,从返回对象中剔除password
      ctx.body = {
        code: 0,
        message: "用户登陆成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (error) {
      console.error("用户登录失败", err);
    }
  }

  async changePwd(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
  }
}

module.exports = new UserController();
