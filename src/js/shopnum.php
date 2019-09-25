<?php
	include "public.php";
	/*设置跨域请求*/
	header("Access-Control-Allow-Origin:*");
	
	$uname = $_POST["username"];
	//编写sql语句，进行查询的操作。
	$sql = "SELECT * FROM `shops` WHERE username='$uname';";
//	echo $uname;
	//执行sql语句
	$res = mysql_query($sql);   //执行select操作，返回一个结果集
	
	//取出结果集中的数据
	  //取出结果集中的一行数据   返回一个数组
//	echo $arr;
	
	$index = 0;
	while($arr = mysql_fetch_array($res)){
		++$index;
	}
	echo $index;
?>