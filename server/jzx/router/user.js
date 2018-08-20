//引入dbhelp
const  db = require('../db/dbhelp');
//为了统一格式所创造的自定义模块
const  apiResult = require('../utils/apiResult');
//引入token模块
const jw = require('jsonwebtoken');
//mongodb 自带的方法  获取它的id
const ObjectID = require('mongodb').ObjectID;
let express = require("express");
let app = express();
//暴露一个方法，需要传入app
module.exports = {
    login:(app)=>{
        app.post('/login', async (request,response)=>{
            //获取前端数据
            var data = {
                username:request.body.username,
                password:request.body.password
            }
            try{

                let result = await db.mongodb.inquire('one',data);

                if(result.status){
                    //生成token ，这是名字
                    let  secret = 'lleenToken';
                    //生成token -> 第一个参数{}必须是对象
                    let token = jw.sign({username:request.body.username},secret,{
                        'expiresIn':60*60*24    //设置时间，token一天后过期
                    });
                    response.send(apiResult(200,token));     
                                   
                }else{
                    response.send(apiResult(false));                    
                }
            }catch(error){
                response.send(apiResult(false));
            }
        });

    /*   局部匹配，按需调用(在index已经全局过滤了，所以不需要这个了)
        // let filter = (request,response,next)=>{
        //     //登陆成功 -> 写入 -> 判断 -> 
        //     //读取前端放入请求头的token
        //     let  token = request.headers['auth'];
        //     //加密的密匙，与生成的名字是一样的
        //     let secret = 'lleenToken';
        //     if(!token){
        //         response.send(apiResult(false,"",'token error'));
        //     }else{
        //         //第一个参数，读取的token，第二个参数，之前保持的密钥
        //         //回掉     一个错误   一个响应
        //         jw.verify(token,secret,async (error,response)=>{
        //             if(error){
        //                 response.send(apiResult(false,error));
        //             }else{
        //                 next();
        //             }
        //         });
        //     }
        // };
    */

        app.get('/adduser',async (request,response)=>{
            console.log(request)
            //此上已经全局过滤了判断是否在登陆状态,成功查询并返回这个表的所有数据
            let data = await db.mongodb.inquire('one');
            response.send(apiResult(true,data));
        });

        //修改密码
        app.post('/updata',async (require,response)=>{
            let query = {
                username:require.body.username,
                password:require.body.password,
                newpwd:require.body.newpwd
            }
            let dataset = await db.mongodb.inquire('one',{username:require.body.username,password:require.body.password});
            if(dataset.status){
                //当前的密码等于新输入的密码
                dataset.data[0].password = query.newpwd;
                //获取mongodb自带的id
                let _id = new  ObjectID(dataset.data[0]['_id']);
                //mongidb的修改方法    表名    id     修改后的数组
                let result = await db.mongodb.update('one',{_id},dataset.data[0]);
                response.send(apiResult(true,result));
            }else{
                response.send(apiResult(false));
            }
        });
    }
    
}
