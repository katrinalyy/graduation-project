window.onload = function(){
	/*点击展开按钮的相应设置*/
	var falgs = true;  //开关为true时可以点击进行显示操作
	$(".unfold").click(function(){
		if(falgs){
			falgs = false;
			/*设置出现搜索框*/
			$(".searchbox").css("display","block");
			/*设置按钮的样式*/
			$(this).html("收起");
			$(this).css("background-position","0 -60px")
			/*设置滑动效果*/
			if($(this).html()=="收起"){
				$(this).hover(function(){
					$(this).css("background-position","0 -80px")
				},function(){
					$(this).css("background-position","0 -60px")
				})
			}
			/*品牌的隐藏和显示*/
			$(".pinpai").css("overflow","visible");	
			/*设置出现滚动条*/
			$(".pinpai .pinpailist>ul").css({
				"height"   : "180px",
				"overflow" : "auto"
			})
			/*品牌标题区域的背景填充*/
			$(".pinpai .headline").css("padding","15px 38px 202px 10px");
		}else{
			falgs = true;
			/*隐藏搜索框*/
			$(".searchbox").css("display","none");
			/*设置按钮的样式*/
			$(this).html("展开");
			$(this).css("background-position","0 -20px")
			/*设置滑动效果*/
			if($(this).html()=="展开"){
				$(this).hover(function(){
					$(this).css("background-position","0 -40px")
				},function(){
					$(this).css("background-position","0 -20px")
				})
			}
			/*品牌的隐藏和显示*/
			$(".pinpai").css("overflow","hidden");	
			/*设置隐藏滚动条*/
			$(".pinpai .pinpailist>ul").css({
				"height"   : "",
				"overflow" : ""
			})
			/*品牌标题区域的背景填充*/
			$(".pinpai .headline").css("padding","15px 38px 47px 10px");
		}
		
		
		return false;
	})
	
	
	/*点击多选按钮的相应操作*/
	$(".morecheck").click(function(){
		/*设置出现搜索框*/
		$(".searchbox").css("display","block");
		
		/*品牌的隐藏和显示*/
		$(".pinpai").css("overflow","visible");	
		/*设置出现滚动条*/
		$(".pinpai .pinpailist>ul").css({
			"height"   : "180px",
			"overflow" : "auto"
		})
		
		/*设置确定和取消按钮的显示*/
		$(".buttons").css("display","block");
		
		/*设置多选和展开消失*/
		$(this).css("display","none");
		$(".unfold").css("display","none")
		
		/*品牌标题区域的背景填充*/
		$(".pinpai .headline").css("padding","15px 38px 248px 10px");
		return false;
	})
	
	/*点击取消按钮恢复原来的状态*/
	$(".cancel").click(function(){
		/*设置隐藏搜索框*/
		$(".searchbox").css("display","none");
		
		/*品牌的隐藏和显示*/
		$(".pinpai").css("overflow","hidden");	
		/*设置隐藏滚动条*/
		$(".pinpai .pinpailist>ul").css({
			"height"   : "",
			"overflow" : ""
		})
		
		/*设置确定和取消按钮的隐藏*/
		$(".buttons").css("display","none");
		
		/*设置多选和展开显示*/
		$(".morecheck").css("display","block");
		$(".unfold").css("display","block")
		
		/*品牌标题区域的背景填充*/
		$(".pinpai .headline").css("padding","15px 38px 47px 10px");
		
	})
	
/*价格区域输入框聚焦显示背景设置*/
	$(".priceif").find("input[type=text]").focus(function(){
		$(".priceif").css("background","#efefef")
	}).blur(function(){
		$(".priceif").css("background","#fff")
	})
	
/*颜色区域的多选按钮点击效果*/
	$(".morecheck1").click(function(){
		
		$(".goodscolor").css("overflow","visible");	
		
		/*设置确定和取消按钮的显示*/
		$(".buttons1").css("display","block");
		
		/*设置多选和展开消失*/
		$(this).css("display","none");
		$(".unfold1").css("display","none")
		
		$(".goodscolor .headline").css("padding","15px 38px 98px 10px");
		return false;
	})
	
	/*点击取消按钮恢复原来的状态*/
	$(".cancel1").click(function(){
		/*品牌的隐藏和显示*/
		$(".goodscolor").css("overflow","hidden");	
		
		/*设置确定和取消按钮的隐藏*/
		$(".buttons1").css("display","none");
		
		/*设置多选和展开显示*/
		$(".morecheck1").css("display","block");
		$(".unfold1").css("display","block")
		
		/*品牌标题区域的背景填充*/
		$(".goodscolor .headline").css("padding","15px 38px 15px 10px");
		
	})
	
	/*点击展开按钮的相应设置*/
	var falgs1 = true;  //开关为true时可以点击进行显示操作
	$(".unfold1").click(function(){
		if(falgs1){
			falgs1 = false;
			/*设置按钮的样式*/
			$(this).html("收起");
			$(this).css("background-position","0 -60px")
			/*设置滑动效果*/
			if($(this).html()=="收起"){
				$(this).hover(function(){
					$(this).css("background-position","0 -80px")
				},function(){
					$(this).css("background-position","0 -60px")
				})
			}
			$(".goodscolor").css("overflow","visible");	
			$(".goodscolor .headline").css("padding","15px 38px 52px 10px");
		}else{
			falgs1 = true;
			/*设置按钮的样式*/
			$(this).html("展开");
			$(this).css("background-position","0 -20px")
			/*设置滑动效果*/
			if($(this).html()=="展开"){
				$(this).hover(function(){
					$(this).css("background-position","0 -40px")
				},function(){
					$(this).css("background-position","0 -20px")
				})
			}
			/*品牌的隐藏和显示*/
			$(".goodscolor").css("overflow","hidden");	
			/*品牌标题区域的背景填充*/
			$(".goodscolor .headline").css("padding","15px 38px 15px 10px");
		}
		
		
		return false;
	})
	
	
	/*点击更多选项显示颜色等*/
	flagcolor = true;
	$(".more").find("a").click(function(){
		if(flagcolor){
			$(".goodscolor").css("display","block")
			$(this).css("background-position-y","-583px")
		}else{
			$(".goodscolor").css("display","none")
			$(this).css("background-position-y","-562px")
		}
		flagcolor = !flagcolor;
		return false;
	})
	
	
	/*吸顶效果navWrap*/
	$(window).scroll(function(){
		var stop = $("html,body").scrollTop();
		if(stop > 81){
			$("#navWrap").css({"position":"fixed","top":0,"opacity":0.9,"z-index":2});
		}else{
			$("#navWrap").css({"position":"","opacity":1});
		}
//		console.log($("#navWrap").offset().top);
	})
	
	
	/*滑过dl出现div*/
	$(".listcontent dl").hover(function(){
		$(this).find("dt>div").animate({bottom:0},200);
	},function(){
		$(this).find("dt>div").css("bottom","-68px");
	})
	
	
	
	/*var dls = $(".listcontent dl");
	for(var i = 0 ;i < dls.length ;i++){
		if( i % 4 == 3){
			$(".listcontent dl").eq(i).css("margin-right","0");
		}
		console.log($(".listcontent dl").eq(i).css("margin-right"));
	}*/
	
	$.ajax({
		type:"get",
		url:"http://localhost:3000/getshop",
		success:function(res){
			//统计总共有多少商品
			$(".goods span").html(res.files.length);
			
			
			var str = "";
			for(var i = 0 ; i < res.files.length ; i++){
				str += `<dl>
							<dt>
								<a href="xiangqing.html"><img src="images/list/${res.files[i].gsrc}" alt="" /></a>
								<div>
									<p>可售尺码 :</p>
									<a>均码</a>
								</div>
							</dt>
							<dd>
								<p>${res.files[i].gtype}</p>
								<a href="#">${res.files[i].gtitle} ${res.files[i].gcolor}</a>
								<p><span>￥</span><span>${res.files[i].goprice}</span> <del>￥<span>${res.files[i].gnprice}</span></del></p>
							</dd>
						</dl>`;
			}
			
			$(".listcontent").html(str);
			var dls = $(".listcontent dl");
			for(var j = 0 ;j < dls.length ;j++){
				if( j % 4 == 3){
					$(".listcontent dl").eq(j).css("margin-right","0");
				}
			}
		}
	});	
	
	/*$.getJSON("js/list.json",function(res){
		//统计总共有多少商品
		$(".goods span").html(res.length)
		
		
		var str = "";
		for(var i = 0 ; i < res.length ; i++){
			str += `<dl>
						<dt>
							<a href="xiangqing.html"><img src="images/list/${res[i].src}" alt="" /></a>
							<div>
								<p>可售尺码 :</p>
								<a>均码</a>
							</div>
						</dt>
						<dd>
							<p>${res[i].type}</p>
							<a href="#">${res[i].title} ${res[i].color}</a>
							<p><span>￥</span><span>${res[i].afterprice}</span> <del>￥<span>${res[i].preprice}</span></del></p>
						</dd>
					</dl>`;
		}
		
		$(".listcontent").html(str);
		var dls = $(".listcontent dl");
		for(var j = 0 ;j < dls.length ;j++){
			if( j % 4 == 3){
				$(".listcontent dl").eq(j).css("margin-right","0");
			}
		}
		
		
	})
	*/
	
	/*底部轮播广告*/
	var timer = setInterval(advFun,3000);
	var index = 0;
	var divs = $(".recommandlistWrap").find("div")
	function advFun(){
		divs.eq(index).css("left",0).siblings().css("left","952px");
		++index;
		if(index == divs.length){
			divs.eq(divs.length-1).stop().animate({left:-952},1000,function(){
				$(this).css("left","952px");
			})
			index = 0;
		}
		
		divs.eq(index).stop().animate({left:0},1000)
			.prev().stop().animate({left:-952},1000,function(){
				$(this).css("left","952px");
			});
		
			
//		console.log(index)
	}
	
	/*滑动到recommandlist区域计时器停止*/
	$(".wrapR").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(advFun,3000);
	})
	
	/*点击右箭头*/
	$(".rightarrow").click(function(){
		clearInterval(timer);
		divs.eq(index).css("left",0).siblings().css("left","952px");
		index++;
		if(index == divs.length){
			index = divs.length-1;
		}else{
			divs.eq(index).stop().animate({left:0},1000)
			.prev().stop().animate({left:-952},1000,function(){
			$(this).css("left","952px");
			});
		}
		return false;
	})
	
	/*点击右箭头*/
	$(".leftarrow").click(function(){
		clearInterval(timer);
		divs.eq(index).css("left",0).siblings().css("left","-952px");
		index--;
		if(index < 0){
			index = 0
		}else{
			divs.eq(index).stop().animate({left:0},1000)
			.next().stop().animate({left:952},1000);
		}
		return false;
	})
	
	

}
