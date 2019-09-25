window.onload = function(){
	
	
	
	//轮播图的设置
	var index = 0;
	var timer = setInterval(autoplay,2000);
	$img = $(".banner").find("img");
	function autoplay(){
		index++;
		if(index == $img.length){
			$img.eq($img.length-1).animate({left:-1200},500,function(){
				$(this).css("left",1200);
			})
			index = 0;
		}
		$(".icon").find("div").eq(index).addClass("active")
			.siblings()
			.removeClass("active");
		$img.eq(index).stop().animate({left:0},500)
		.prev().stop().animate({left:-1200},500,function(){
			$(this).css("left",1200);
			
		});
		
	}
	
	$(".icon div").hover(function(){
		clearInterval(timer);
		if(index > $(this).index()){
			index = $(this).index()-1;
			$img.eq(index+1).css("left",0).siblings().css("left",1200);
		}else{
			index = $(this).index()-1;
		}
		
		autoplay();
		
	},function(){
		timer = setInterval(autoplay,2000);
	})
	
	
	/*尖货推介区域的透明度的改变*/
	
	$(".topadvice div").find("img").hover(function(){
		$(this).fadeTo(300,0.8);
	},function(){
		$(this).fadeTo(300,1);
	})
	
	/*更多主题区域*/
	$(".moretheme>a").find("img").hover(function(){
		$(this).fadeTo(300,0.9);
	},function(){
		$(this).fadeTo(300,1);
	})
	
	$("#menu").hover(function(){
	/*菜单设计*/
		$(".menu").css("display","block");
	},function(){
		$(".menu").css("display","none");
	})
	/*点击回到顶部效果*/
	$(".menu").find("a").eq(5).click(function(){
		$("html,body").animate({"scrollTop":0},1000);
	})
	
}


/*轮播图的设置*/
$.ajax({
	type:"get",
	url:"http://localhost:3000/getImg",
	success:function(res){
		for(var i = 0 ; i < res.files.length ;i++){
			$(".banner img").eq(i).attr("src",res.files[i].title);
		}
//		console.log(res);
	}
});