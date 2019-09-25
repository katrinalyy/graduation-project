<?php
	include "public.php";
	/*设置跨域请求*/
	header("Access-Control-Allow-Origin:*");
	$originpwd = $_POST["originpwd"];
	$newpwd = $_POST["newpwd"];
	$uname = $_POST["username"];
	//编写sql语句，进行查询的操作。
	$sql = "select * from users where username = '$uname'";
	
	//执行sql语句
	$res = mysql_query($sql);   //执行select操作，返回一个结果集
	
	//取出结果集中的数据
	$arr = mysql_fetch_array($res);	  //取出结果集中的一行数据   返回一个数组
	/*echo $originpwd."<br>";
	echo $newpwd."<br>";*/
//	echo $uname;
	
//	print_r($arr);
	if($arr){
		if($originpwd == $arr["password"]){
			$sql2 = "UPDATE users SET password='$newpwd'  WHERE username = '$uname'";
			$row = mysql_query($sql2);
			if($row){
				echo 4; //更新成功
			}else{
				echo 3; //更新失败
			}
		}else{
			echo 2; //初始密码错误
		}
	}else{
		echo 1;  //用户名不存在
	}
?>