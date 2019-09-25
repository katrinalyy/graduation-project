/**
 * 这里是我们的总体服务 node就是架构  ---express
 * */
//引入express 模块
let express = require('express');
let fs = require('fs');
let multer = require('multer');
let pathLib = require('path');
let mysql = require('mysql');


//创建一个数据库链接
let db = mysql.createConnection({
    host:    'localhost',
    user:     'root',
    password: 'root',
    database: 'home',
});



//创建一个服务
let app = express();

//处理跨域
//设置跨域访问
app.all('*', function(req, res, next) {
   /* res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/static',express.static('./static'));

let cookieParser = require('cookie-parser');    //引入cookie
//let cookieSession  = require('cookie-session');
let expressSession = require('express-session');
app.listen(3000,function () {
    console.log('start')
});

let fileStore = require('session-file-store')(expressSession);   //将你的session 放进文件中
app.use(cookieParser());   //使用cookie
/*app.use(cookieSession({
    name: "lyy",
    maxAge: 1000*60*20,
    keys: ['aaa','bbbb','vccc']
}));*/
app.use(expressSession({
    store: new fileStore(),    //告诉 expressSession 进行文件存储
    cookie: {
        maxAge: 1000*60*20
    },
    secret: ['aaa','bbb']
}));



//使用multer
let multerObj = multer({
    dest: __dirname+'/static/img'
});

app.use(multerObj.any());
//思考  第一个接口  处理  'http://localhost:3000/'
// app.get('/',function () {
// });

//思考  接受一个图片上传  处理 http:localhost:3000/receiveImg
app.post('/receiveImg',function (req, res) {
//  console.log(req.files);

    //拿到files 时候 要进行改名 通过使用fs模块
    // oldPath原始路径  str是图片的后缀名  newPath 是你拼接后的路径
    let oldPath = req.files[0].path;
    let str = pathLib.extname(req.files[0].originalname);
    let imgName = req.body.tit+str;
    let newPath = req.files[0].destination+'/'+imgName;
    let imgsrc = 'http://localhost:3000/static/img/'+imgName;

    fs.rename(oldPath,newPath,function (err) {
//      console.log('改名成功');
        let sql = `INSERT INTO imgs(title, src) VALUES ('${imgsrc}','${imgName}')`;
        db.query(sql,function (err, data) {
//          console.log(data);
        })
    });

    res.send('ok')
});


//取图片  get post
app.get('/getImg',function (req, res) {
    let sql = "SELECT * FROM imgs";
    db.query(sql,function (err, data) {
        //这个data 是什么
        // console.log(data);
        let Obj = {
            code: 200,
            files: data
        };
        res.send(Obj)
    })
});

//取用户  get post
app.get('/getUsers',function (req, res) {
    let sql = "SELECT * FROM users";
    db.query(sql,function (err, data) {
        //这个data 是什么
        // console.log(data);
        let Obj = {
            code: 200,
            files: data
        };
        res.send(Obj)
    })
});



	
/*访问根页面,判断是否有cookie*/
app.get("/",function(req,res){
	if (req.session.logined){    //这里代表 已登录
		req.session.logined = true;
		console.log("已经登录")
        res.redirect('/static/view/index2.html');
    }else {    //走到这 代表 用户没有登录
    	req.session.logined = false;
    	console.log("没有登录")
        res.redirect('/static/view');
    }
        
})

	
/*登录页面*/
app.post('/getUser',function (req, res) {
	let sql = `SELECT * FROM admin WHERE aname='${req.body.user}'`;
	db.query(sql,function (err, data) {
		console.log(data);
		if(data.length>0){
			if(data[0].apwd == req.body.pwd){
				//让用户 的登录状态为true；
				req.session.logined = true; 
				req.session.name = req.body.user;
				 //用户成功登录后
	       		console.log("登录成功")
	        	res.redirect('/static/view/index2.html');
			}else{
				console.log("密码错误")
				res.redirect('/static/view');
			}
		}else{
			console.log("用户不存在")
			res.redirect('/static/view');
		}
	})
	
});

/*修改密码*/
app.post("/changepwd",function(req,res){
	
//	res.send(req.body.adpwd+"-"+req.body.radpwd);
	let sql = `SELECT * FROM admin WHERE aname='${req.session.name}'`;
	db.query(sql,function(err,data){
		if(data[0].apwd == req.body.adpwd){
			let sql2 = `UPDATE admin SET apwd='${req.body.radpwd}' WHERE aname='${req.session.name}'`;
			db.query(sql2,function(err,data){
				console.log(data);
			})
			console.log("更改成功")
			res.redirect('/static/view/index2.html');
		}else{
			console.log("原密码错误")
			res.redirect('/static/view/index2.html');
		}
	})

})

/*图片功能删除*/
app.get("/delAdv",function(req,res){
//	console.log(req.query.id);
	let sql = `DELETE FROM imgs WHERE iid=${req.query.id}`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			res.send("删除成功");
		}else{
			res.send("删除失败");
		}
		
	})
})

/*客户删除功能*/
app.get("/delCustomer",function(req,res){
//	console.log(req.query.id);
	let sql = `DELETE FROM users WHERE uid=${req.query.id}`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			res.send("删除成功");
		}else{
			res.send("删除失败");
		}
		
	})
})
/*删除相应客户的购物车功能*/
app.get("/delShops",function(req,res){
//	console.log(req.query.username);
	let sql = `SELECT * FROM shops WHERE username='${req.query.username}'`;
	db.query(sql,function(err,data){
		if(data.length>0){
			let sql2 = `DELETE FROM shops WHERE username=${req.query.username}`;
			db.query(sql2,function(err,data){
				if(data.affectedRows>0){
					res.send("该用户以及其购物车删除成功");
				}else{
					res.send("该用户购物车删除失败");
				}
				
			})
		}else{
			res.send("该用户购物车中没有东西可以删除");
		}
		
	})
	
})

/*更新用户资料信息功能*/
app.post("/changeInfo",function(req,res){
	let sql = `UPDATE users SET uid=${req.body.id},username='${req.body.username}',password='${req.body.pwd}',sex='${req.body.sex}',birthday='${req.body.birthday}',adress='${req.body.address}',email='${req.body.email}' WHERE uid=${req.body.oriid}`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			console.log("用户资料修改成功");
			res.redirect('/static/view/index2.html');
		}else{
			console.log("用户资料修改失败");
		}
		
	})
})

/*商品相应功能实现*/
app.post("/addshop",function(req,res){
	let sql = `INSERT INTO shop(gname, goprice, gnprice, gtype, gtitle, gcolor, gsrc, gstore) VALUES ('${req.body.gname}',${req.body.goprice},${req.body.gnprice},'${req.body.gtype}','${req.body.gtitle}','${req.body.gcolor}','${req.body.gsrc}',${req.body.gstore})`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			console.log("商品插入成功");
			res.redirect('/static/view/index2.html');
		}else{
			console.log("商品插入失败");
		}
		
	})
})

/*获取商品*/
app.get('/getshop',function (req, res) {
    let sql = "SELECT * FROM shop";
    db.query(sql,function (err, data) {
        //这个data 是什么
        // console.log(data);
        let Obj = {
            code: 200,
            files: data
        };
        res.send(Obj)
    })
});

/*商品删除功能*/
app.get("/delShop",function(req,res){
//	console.log(req.query.id);
	let sql = `DELETE FROM shop WHERE gid=${req.query.gid}`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			res.send("商品删除成功");
		}else{
			res.send("商品删除失败");
		}
		
	})
})

/*商品修改功能*/
app.post("/changeshop",function(req,res){
	let sql = `UPDATE shop SET gid=${req.body.gid},gname='${req.body.gname}',goprice=${req.body.goprice},gnprice=${req.body.gnprice},gtype='${req.body.gtype}',gtitle='${req.body.gtitle}',gcolor='${req.body.gcolor}',gsrc='${req.body.gsrc}',gstore=${req.body.gstore} WHERE gid=${req.body.goid}`;
	db.query(sql,function(err,data){
		if(data.affectedRows>0){
			console.log("商品修改成功");
			res.redirect('/static/view/index2.html');
		}else{
			console.log("商品修改失败");
		}
		
	})
})