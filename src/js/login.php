<?php
	include "public.php";
	/*设置跨域请求*/
	header("Access-Control-Allow-Origin:*");
	$uname = $_GET["name"];
	$upwd = $_GET["pwd"];
	//编写sql语句，进行查询的操作。
	$sql = "select * from users where username = '$uname'";
	
	//执行sql语句
	$res = mysql_query($sql);   //执行select操作，返回一个结果集
	
	//取出结果集中的数据
	$arr = mysql_fetch_array($res);	  //取出结果集中的一行数据   返回一个数组
	
//	print_r($arr);
	if($arr){
		if($upwd == $arr["password"]){
			echo 2; //登录成功
		}else{
			echo 3; //密码错误
		}
	}else{
		echo 1;  //用户名不存在
	}
?>