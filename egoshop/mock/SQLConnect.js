const mysql = require('mysql');
const client = mysql.createConnection({
    host:'localhost',//域名
    user:'root',//账号
    password:'root',//密码
    database:'ego_shop'//数据库名
})
function SQLConnect(sql,arr,callback) {
    client.query(sql,arr,(error,result)=>{
        if (error){
            console.log(error)
            return
        }
        callback(result)
    })
}
module.exports= SQLConnect;