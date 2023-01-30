// 总入口文件 HTTP服务
const {APP_PORT} = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})