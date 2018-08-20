const mongoClient = require('mongodb').MongoClient;
const apiResult = require('../utils/apiResult');

//用connect方法链接数据库
var  db;
mongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },(error,client)=>{
    if(error){
        console.log(error);
    }else{
        db = client.db('one')
    }
});

//暴露模块
module.exports = {
    //添加
    async addition(_formName,_data){
        let result = await db.collection(_formName).insert(_data);
        console.log(result);
    },

    //查询
    inquire:async (_formName,_data = {}) => {
        let result = await  db.collection(_formName).find(_data).toArray();
            if(result.length > 0){
                return  apiResult(true,result);
            }else{
                return apiResult(false,'','error');
            } 
    },
    //修改       
     update: async(_formName,_condition,_data) =>{
        //mongodb 的 updata 第一个参数是选择器  此时都会用到id    第二个参数是条件
        // console.log(db.collection(_formName).update(_condition, _data))
        let result = await db.collection(_formName).update(_condition,_data);
        //_formName  表名     _condition  选择谁（条件）    修改的数据
        if(result.result.n > 0){
            return apiResult(true,result);
        }else{
            return apiResult(false,'','error')
        }
    }

    
};