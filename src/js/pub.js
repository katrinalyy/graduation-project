//我的走秀下的鼠标移入移出设置
$(".list").mouseenter(function(){
	$(this).css({
		color : "#d50215",
		background : "#fff"
	});
	$(this).find("span").html("∧")
	$(this).find("ul").css("display","block")
}).mouseleave(function(){
	$(this).css({
		color : "#d7d7d7",
		background : "#333"
	});
	$(this).find("span").html("∨")
	$(this).find("ul").css("display","none")
})

//搜索框的鼠标点击清空内容
$(".search").click(function(e){
	var e = e || event;
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	$value = $(this).find("input").val();
	if($value == "请搜索灯具试试"){
		$(this).find("input").val("");
	}
	
})

$("#headerWrap").click(function(){
	$value = $(".search").find("input").val();
	if($value == ""){
		$(".search").find("input").val("请搜索灯具试试");
	}
})

/*获取cookie*/
	var coo = JSON.parse(getCookie("user"));
//	console.log(coo);
	if(coo){
		$(".user").css("display","block");
		$(".login,.regi").css("display","none")
//		console.log(coo.username);
		$(".log").html(coo.username);
	}else{
		$(".login,.regi").css("display","block");
		$(".user").css("display","none");
	}
	$(".out").click(function(){
		$(".login,.regi").css("display","block");
		$(".user").css("display","none");
		/*清理cookie*/
		delCookie("user");
		location.reload();
		return false;
	})
	
	$.ajax({
		type:"post",
		url:"http://127.0.0.1/lyyproject/src/js/shopnum.php",
		data:{
			"username" : $(".log").html()
		},
		
		success:function(res){
			$(".shopnum").html(res);
		}
	});