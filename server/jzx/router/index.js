//引入express 
const express = require('express');
const apiResult = require('../utils/apiResult')
const app = express();

//转码
const bodyprser = require('body-parser');
const encoloed = bodyprser.urlencoded({ extended: false });
//全局过滤，全部都会有这个功能
app.use(encoloed);

//跨域代码

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,auth");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") {
        res.send(200);/*让options请求快速返回*/
    } else {
        
        next();
    }
});



//静态资源文件加载
const path = require('path');//原始自带路径模块
app.use(express.static(path.join(__dirname, '../')));

//引入token模块
const jw = require('jsonwebtoken');
//url模块
const url = require('url');

//引入自定义模块
const users = require('./user');

console.log(users)

//有时候l路径并不需要这样的过滤，所以我们可以定义一个数组，把它们拿取出来
const fliterLister = ['/login','/add'];

//全局匹配，过滤
app.use((request, response, next) => {
    var pathname = url.parse(request.url, true).pathname;
    if (fliterLister.includes(pathname)) {
        next();
    } else {
        //登陆成功 -> 写入 -> 判断 -> 读取前端放入请求头的token
        let token = request.headers['auth'];
        //加密的密匙，与生成的名字是一样的
        let secret = 'lleenToken';
        if (!token) {
            response.send(apiResult(false, "", 'token error'));
        } else {
            //第一个参数，读取的token，第二个参数，之前保持的密钥
            //回掉     一个错误   一个响应
            jw.verify(token, secret, async (error, response) => {
                if (error) {
                    response.send(apiResult(false, error));
                } else {
                    next();
                }
            });
        }
    }

});

//暴露模块
module.exports = {
    start: (_port) => {
        users.login(app);
        app.listen(_port || 3002, () => {
            console.log(`server is running http://localhost:${_port || 3002}`);
        });
    }
}