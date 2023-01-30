const User = require("../model/user.model");

class UserService {
  // 主要用于操作数据库
  async createUser(user_name, password) {
    // User的create方法：数据库里的insert
    const res = await User.create({ user_name, password });
    // await表达式:成功则返回promise对象的值，失败则抛出异常
    // await后面接的表达式必须是一个promise对象，如果不是，await会把其转成promise对象
    console.log("service createUser --->", res);

    return res.dataValues;
    // async函数 会把return结果封装成一个promise对象
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      // SELECT 查询单条记录
      attributes: ["id", "user_name", "password", "is_admin"], // 用*查询效率会降低
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }

  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};

    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0;
  }
}

module.exports = new UserService();
