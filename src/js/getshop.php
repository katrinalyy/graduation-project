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
	$arrall = array();
	while($arr = mysql_fetch_array($res)){
		$arr2 = array("sid"=>$arr["sid"],"snumber"=>$arr["snumber"],"sprice"=>$arr["sprice"],"type"=>$arr["type"],"title"=>$arr["title"],"src"=>$arr["src"],"scolor"=>$arr["scolor"]);
		$index = array_push($arrall,$arr2);
//		echo json_encode($arr2);
	}
	echo $arra = json_encode(array("index"=>$index,"arr"=>$arrall));
	
?>