const { orderFormatError } = require("../constant/err.type");

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error(error);
      orderFormatError.result = error;
      ctx.app.emit("error", orderFormatError, ctx);
    }
    await next();
  };
};

module.exports = { validator };
