<?php
	include "public.php";
	/*设置跨域请求*/
	header("Access-Control-Allow-Origin:*");
	
	$uname = $_POST["username"];
	$email = $_POST["email"];
	$sex   = $_POST["sex"];
	$birthday = $_POST["birthday"];
	$address = $_POST["address"];
	$originname = $_POST["originname"];
//	echo $uname."-".$email."-".$sex."-".$birthday."-".$address."-".$originname

	$sql = "select * from users where username = '$originname'";
	$res = mysql_query($sql);   //执行select操作，返回一个结果集
	$arr = mysql_fetch_array($res);	  //取出结果集中的一行数据   返回一个数组
	
	if($arr){
		$sql2 = "UPDATE users SET username='$uname',sex='$sex',birthday='$birthday',adress='$address',email='$email' WHERE username='$originname'";
		$row = mysql_query($sql2);
		if($row){
			echo 3; //更新成功
		}else{
			echo 2; //更新失败
		}
	}else{
		echo 1;  //用户名不存在
	}
?>