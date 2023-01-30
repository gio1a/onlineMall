// 业务
const path = require("path");

const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require("koa-parameter"); // 参数校验中间件

const errHandler = require("./errHandler");
const router = require("../router");

const app = new Koa();

// koa-body本身是一个函数，所以要在所有路由处理之前注册这个中间件
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配置选项中不推荐使用相对路径
      // option里的相对路径不是相对的当前文件，而是相对process.cwd()
      // process.cwd() 是当前Node.js进程执行时的文件夹地址——工作目录，保证了文件在不同的目录下执行时，路径始终不变
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"], // 参数会挂载到ctx.request.body
  })
);

app.use(parameter(app)); // 在ctx原型上注册方法

// 把该目录设置为静态资源文件夹
app.use(KoaStatic(path.join(__dirname, "../upload")));

// 注册路由
app.use(router.routes()); // 会把router文件夹下所有路由文件都加载进来（通过router/index.js）

app.use(router.allowedMethods()); // 规定只能使用路由里的请求方式，否则会报405或501

app.on("error", errHandler); // 进行统一的错误处理

module.exports = app;
