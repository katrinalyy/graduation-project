window.onload = function(){
	
$(".verysmall a").mouseenter(function(){
	var index = $(this).index();
	$(this).css("opacity",1).siblings().css("opacity","0.5")
	$(".small img").attr("src","images/xiangqing/a"+(index+1)+"-small.jpg");
	$(".img1").attr("src","images/xiangqing/a"+(index+1)+".jpg");
})

$(".small").mouseover(function(){
		$(".mask").css({"display":"block"});
		$(".big").css({"display":"block"});
	}).mouseout(function(){
		$(".mask").css({"display":"none"});
		$(".big").css({"display":"none"});
	}).mousemove(function(e){
		var e=e||event;
		
		
		var x= e.pageX-$(".fdj-box").offset().left-$(".mask").width()/2;
		var y= e.pageY-$(".fdj-box").offset().top-$(".mask").height()/2;
		var maxX =$(".fdj-box").width()-$(".mask").width(); 
		var maxY =$(".fdj-box").height()-$(".mask").height(); 
//		console.log($(".mask").width())
		if(x<0){
			x=0;
		}else if(x>maxX){
			x=maxX;
		}
		if(y<0){
			y=0
		}else if(y>maxY){
			y=maxY
		}
		$(".mask").css({"left":x+"px"});
		$(".mask").css({"top":y+"px"});
		var bigX = x*($(".big").width()/$(".mask").width());
		var bigY = y*($(".big").height()/$(".mask").height());
//		console.log(bigX)
		$(".img1").css({"left":-bigX+"px"});
		$(".img1").css({"top":-bigY+"px"});
		
	})
	
$(".fdj2 p").eq(4).children("a").click(function(){
	$(this).css("background","url(images/xiangqing/fen.png) no-repeat").siblings().css("background","none");
	$(this).parent().attr("thiscolor",$(this).html());
	return false;
})

/*数量加减操作*/
$(".jia").click(function(){
	var index = $(this).prev().html();
	$(this).prev().html(++index);
	return false;
})

$(".jian").click(function(){
	var index = $(this).next().html();
	if(index == "1"){
		$(this).next().html("1");
	}else{
		$(this).next().html(--index);
	}
	
	return false;
})

/*选项卡，详情、评论和相关咨询*/
$(".xqtitle").on("click","a",function(){
	var index = $(this).index();
	$(this).css({
		"border-bottom" : "3px solid #464545",
		"color" : "#000"
	}).siblings()
	.css({
		"border-bottom" : "3px solid #fff",
		"color" : "#6E6C6D"
	})
	$(".xiangqingcontent>div").eq(index+1).css("display","block")
		.siblings().css("display","none")
		.eq(0).css("display","block");
	return false;
})


/*回到顶部效果*/
$(window).scroll(function(){
	var top = $("html,body").scrollTop();
	if(top>400){
		$(".huojian").css("display","block");
	}else{
		$(".huojian").css("display","none");
	}
})
$(".huojian a").click(function(){
	$("html,body").animate({"scrollTop":0},1200);
	return false;
})

/*加入购物袋的操作*/
$(".bag").click(function(){
	var titles = $(".titles").html();
	var types = $(".types").html();
	var prices = $(".prices").html();
	var numbers = $(".numbers").html();
	var colors = $(".colors").attr("thiscolor");
//	console.log(titles+"<br/>"+types+"<br/>"+prices+"<br/>"+numbers+"<br/>"+colors);
	var srcs = null;
	if(colors == "榉木款"){
		srcs = "color1.jpg";
	}else if(colors == "珍珠白"){
		srcs = "color2.jpg";
	}else if(colors == "刚毅黑"){
		srcs = "color3.jpg";
	}else if(colors == "火烈红"){
		srcs = "color4.jpg";
	}
//	console.log(srcs);
//	console.log($(".log").html());
	$.ajax({
		type:"post",
		url:"http://127.0.0.1/lyyproject/src/js/shop.php",
		data:{
			"titles"	: titles,
			"types"		: types,
			"prices"	: prices,
			"numbers"	: numbers,
			"colors"	: colors,
			"srcs"		: srcs,
			"username"	: $(".log").html()
		},
		success:function(res){
			if(res == 1){
				alert("加入购物车成功")
				location.reload();
			}else if(res == 2){
				alert("加入购物车失败，刷新后重新加购物车");
			}
		}
	});
	
	return false;
})


}