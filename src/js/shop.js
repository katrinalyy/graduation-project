/*获取cookie*/
	var coo = JSON.parse(getCookie("user"));
//	console.log(coo);
	if(coo){
		$(".user").css("display","inline-block");
		$(".login,.regi").css("display","none")
//		console.log(coo.username);
		$(".log").html(coo.username);
	}else{
		$(".login,.regi").css("display","inline-block");
		$(".user").css("display","none");
	}
	$(".out").click(function(){
		$(".login,.regi").css("display","inline-block");
		$(".user").css("display","none");
		/*清理cookie*/
		delCookie("user");
		return false;
	})

	$.ajax({
		type:"post",
		url:"http://127.0.0.1/lyyproject/src/js/shopnum.php",
		data:{
			"username" : $(".log").html()
		},
		
		success:function(res){
			if(res>0){
				$(".nolist").css("display","none");
				$(".top").css("display","block");
				
				$.ajax({
					type:"post",
					url:"http://127.0.0.1/lyyproject/src/js/getshop.php",
					data:{
						"username" : $(".log").html()
					},
					success:function(res){
						var res = JSON.parse(res);
						/*console.log(res.index);*/
						var str = "";
						for(var i = 0 ; i < res.index ; i++){
							str += `<ul>
										<li><input type="checkbox" /></li>
										<li>${res.arr[i].sid}</li>
										<li>
											<div>
												<img src="images/xiangqing/${res.arr[i].src}"/>
											</div>
											<div>
												<span>${res.arr[i].type}</span>
												<span>${res.arr[i].title}</span>
												<span>颜色：<i>${res.arr[i].scolor}</i></span>
											</div>
										</li>
										<li class="priceshop">${res.arr[i].sprice}</li>
										<li>
											<span class="reduce">-</span>
											<span class="numshop">${res.arr[i].snumber}</span>
											<span class="addshop">+</span>
										</li>
										<li><a href="" class="delshop">删除</a></li>
									</ul>`;
						}
						$(".shoplist").html(str);	
						
					}
				});
				
			}else{
				$(".nolist").css("display","block");
				$(".top").css("display","none")
			}
		}
	});
	
	
	/*购物车相应功能实现*/
	/*统计商品有几件*/
	var num = 0 ; //存储数量,勾选商品的数量信息;
	var all = 0;
	$(".allcheck").click(function(){
		$(".shoplist>ul>li>input").prop("checked",$(this).prop("checked"));
		var a = $(".shoplist>ul>li>input:checked");
		num = a.length;
		$(".checknum").html(num);
		
		/*总计功能的实现*/
		
	})
	
	$(".shoplist").on("click","input",function(){
		if($(this).prop("checked")){
			++num;
		}else{
			--num;
		}
		$(".checknum").html(num);
	})
	
	$(".shoplist").on("click","a",function(){
		$.ajax({
			type:"post",
			url:"http://127.0.0.1/lyyproject/src/js/delshop.php",
			data:{
				"sid" : $(this).parent().parent().children("li").eq(1).html() 
			},
			success:function(res){
				console.log(res)
			}
		});
		
		return false;
	})
	
	
	
