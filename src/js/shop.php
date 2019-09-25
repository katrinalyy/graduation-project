<?php
	//导入公共文件代码
	include "public.php";
	header("Access-Control-Allow-Origin:*");
	/*获取浏览器数据*/
	$uname = $_POST["username"];  //用户名
	$titles = $_POST["titles"];
	$types = $_POST["types"];
	$prices = $_POST["prices"];
	$numbers = $_POST["numbers"];
	$colors = $_POST["colors"];
	$srcs = $_POST["srcs"];
//	echo $uname."-".$titles."-".$types."-".$prices."-".$numbers."-".$colors."-".$srcs;

	//4。编写sql语句
	$sql = "INSERT INTO shops(`username`, `snumber`, `sprice`, `type`, `title`, `src`, `scolor`) VALUES ('$uname',$numbers,'$prices','$types','$titles','$srcs','$colors');";
	
	//5.执行sql语句
	$row = mysql_query($sql); //执行， insert  delete update操作时，返回的是受影响的行数
	
	
	
	//判断，如果$row 是1 ，提示用户，注册成功，否则失败。
	
	if($row){
		echo 1;  //加入购物车成功
		
	}else{
		echo 2;  //加入购物车失败
	}
?>

