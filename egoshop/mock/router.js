const express = require('express');
const router = express.Router();
//处理post
const bodyParser = require('body-parser');
//处理get
const url = require('url');
//连接数据库
const SQLConnect = require('./SQLConnect.js');
//token
const jwt = require('jsonwebtoken');
const config = require('./token');
//fs
const fs = require('fs')
//multer图片处理
const multer = require("multer");

router.use(bodyParser.urlencoded({extended: true}))

//登录接口
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = "select * from login where username=? and password=?";
    var arr = [username, password]
    SQLConnect(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                username: username,
                password: password
            }, config.jwtSecret)
            res.send({
                status: 200,
                data: result,
                token: token
            })
        } else {
            res.send({
                status: 500,
                msg: '用户名密码错误'
            })
        }
    })
})

/*商品查询
* 请求方式 get
* 参数 page页
* */
router.get('/backend/item/selectTbItemAllByPage', (req, res) => {
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result
                }
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
/*
* 数据总条数接口
* */
router.get("/total", (req, res) => {
    const sql = "select count(*) from project where id";
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查询失败"
            })
        }
    })
})
/**
 *商品删除接口
 * id
 */
router.get('/backend/item/deleteItemById',(req,res)=>{
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from project where id=?";
    console.log(id);
    const arr = [id];
    SQLConnect(sql, arr, result => {
        // 删除返回的是影响行数
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 类目选择接口
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?";
    var arr = [id]
    SQLConnect(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 图片上传接口
 * 第三方依赖：multer,cors
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

const uploadFolder = './upload/';
createFolder(uploadFolder);
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 添加商品接口
 */
router.get("/backend/item/insertTbItem",(req,res) =>{
    var title = url.parse(req.url,true).query.title || "";
    var cid = url.parse(req.url,true).query.cid || "";
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";
    var price = url.parse(req.url,true).query.price || "";
    var num = url.parse(req.url,true).query.num || "";
    var desc = url.parse(req.url,true).query.desc || "";
    var image = url.parse(req.url,true).query.image || "";

    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)"
    var arr = [title,image,sellPoint,price,cid,num,desc];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"添加失败"
            })
        }
    })
})

/**
 * 预更新接口
 */
router.get("/backend/item/preUpdateItem",(req,res) =>{
    const id = url.parse(req.url,true).query.id;
    const sql = "select * from project where id=?"
    const arr = [id];
    SQLConnect(sql,arr,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                data:result[0]
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

/**
 * 商品修改接口
 */
router.get("/backend/item/updateTbItem",(req,res) =>{
    var id = url.parse(req.url,true).query.id;
    var title = url.parse(req.url,true).query.title || "";
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";
    var price = url.parse(req.url,true).query.price || "";
    var num = url.parse(req.url,true).query.num || "";

    var sql = "update project set title=?,sellPoint=?,price=?,num=? where id=?";
    var arr = [title,sellPoint,price,num,id];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            })
        }
    })
})
module.exports = router;