const path = require("path");

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsId,
} = require("../constant/err.type");

const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findAllGoods,
} = require("../service/goods.service");

class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files; // file对应请求体中的key名
    const fileTypes = ["image/jpg", "image/png", "image/jpeg"]; // 支持类型
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods方法来操作数据库
    try {
      const { createAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: " 发布商品成功",
        result: res,
      };
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", publishGoodsError, ctx);
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改商品成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async remove(ctx) {
    const res = await removeGoods(ctx.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        message: "下架商品成功",
        result: "",
      };
    } else {
      return ctx.app.emit("error", invalidGoodsId, ctx);
    }
  }

  async restore(ctx) {
    const res = await restoreGoods(ctx.params.id);
    if (res) {
      ctx.body = {
        code: 0,
        message: "上架商品成功",
        result: "",
      };
    } else {
      return ctx.app.emit("error", invalidGoodsId, ctx);
    }
  }

  async findAll(ctx) {
    // 1.解析pageNum和pageSize
    const { pageNum = 1, pageSize = 10 } = ctx.request.query; // get请求的参数存放在query
    // 2.调用数据处理的相关方法
    const res = await findAllGoods(pageNum, pageSize);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "获取商品列表成功",
      result: res,
    };
  }
}

module.exports = new GoodsController();
