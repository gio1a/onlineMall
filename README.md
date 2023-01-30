
#### 线上商城项目

- Koa + MySQL(Sequelize)
- M(db) - V(router) - C(controller)
- 功能：
  - 用户注册、登录、修改密码、修改地址
  - 商品查询、发布、修改、上架、下架
  - 订单生成、查询、更新
  - 购物车加入、查询、删除、全选、取消全选


##### 数据库操作

sequelize：基于` promise` 的 Node.js `ORM`

ORM：对象关系映射

- 数据表映射一个类
- 表中的数据行映射一个对象
- 字段映射为对象的属性
- 数据表的操作映射对象的方法

`npm i sequelize`

`npm i mysql2`


##### 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在app中使用`app.on`监听

##### 加密

使用加盐加密(使用`bcrcyptjs`

##### 用户认证与授权

登录成功后，会给用户办法令牌`token`，用户在以后的每一次请求中都会携带这个令牌。

使用`jwt`(`jsonwebtoken`)
