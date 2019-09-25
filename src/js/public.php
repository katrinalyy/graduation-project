<?php
	header("content-type:text/html;charset=utf-8");
	//设置数据源
	//http://10.9.169.48/lyyproject/src项目下
	$db = mysql_connect("localhost","root","root");   //返回数据源  参数：主机名称   数据源登录用户名及密码
	
	//链接数据源
	mysql_select_db("home",$db);  //参数：数据库名称   数据源
	
	//设置字符编码（防止乱码）
	mysql_query("set names utf8");
?>