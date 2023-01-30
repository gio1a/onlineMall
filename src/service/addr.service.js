const { Op } = require("sequelize");
const Address = require("../model/addr.model");

class AddrService {
  async createAddr(addr) {
    return await Address.create(addr);
  }

  async findAllAddr(user_id) {
    return await Address.findAll({
      where: { user_id },
      attributes: ["id", "consignee", "phone", "address", "is_default"],
    });
  }

  async updateAddr(params) {
    const { id, consignee, phone, address } = params;
    return await Address.update(
      { consignee, phone, address },
      { where: { id } }
    );
  }

  async removeAddr(id) {
    return await Address.destroy({ where: { id } });
  }

  async setDefaultAddr(user_id, id) {
    // 先把当前用户的所有地址设置为非默认
    await Address.update({ is_default: false }, { where: { user_id } });
    // 再把传入的id对应地址设置为默认
    return await Address.update(
      { is_default: true },
      { where: { [Op.and]: { user_id, id } } }
    );
  }
}

module.exports = new AddrService();
