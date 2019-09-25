<?php
	//导入公共文件代码
	include "public.php";
	header("Access-Control-Allow-Origin:*");
	$uname = $_GET["name"];
//	echo $uname;

	//4。编写sql语句
	$sql = "insert into users(username,password) values('$uname','123456')";
	
	//5.执行sql语句
	$row = mysql_query($sql); //执行， insert  delete update操作时，返回的是受影响的行数
	
	
	
	//判断，如果$row 是1 ，提示用户，注册成功，否则失败。
	
	if($row){
		echo 1;  //注册成功
		
	}else{
		echo 2;  //注册失败
	}
?>

