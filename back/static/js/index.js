/*菜单的点击收放效果*/
$("li").has("ul").click(function(){
	$(this).children("ul").toggle();

})

/*首页的4个功能项目跳转*/
$(".own").click(function(){
//	location.reload();
	$(".amends").css("display","none");
	$(".newaddshop").css("display","none");
	$(".shop").css("display","none");
	$(".amendc").css("display","none");
	$(".c2").css("display","none");
	$(".c1").css("display","none");
	$(".c3").css("display","none");
	$(".customer").css("display","none");
	$(".owncontent").css("display","block");
	return false;
})
$(".ad").click(function(){
	$(".amends").css("display","none");
	$(".newaddshop").css("display","none");
	$(".shop").css("display","none");
	$(".amendc").css("display","none");
	$(".c1").css("display","none");
	$(".c2").css("display","none");
	$(".customer").css("display","none");
	$(".owncontent").css("display","none");
	$(".c3").css("display","block");
	$.ajax({
		type:"get",
		url:"http://localhost:3000/getImg",
		success:function(res){
			var str = "";
			for(var i = 0 ; i < res.files.length ;i++){
				str += `<ul>
							<li>${res.files[i].iid}</li>
							<li>${res.files[i].src}</li>
							<li>${res.files[i].title}</li>
							<li><a href="#">删除</a></li>
						</ul>`;
			}
			$(".adcontent").html(str);
		}
	});
	return false;
})
$(".cus").click(function(){
	$(".amends").css("display","none");
	$(".newaddshop").css("display","none");
	$(".shop").css("display","none");
	$(".amendc").css("display","none");
	$(".c1").css("display","none");
	$(".c3").css("display","none");
	$(".c2").css("display","none");
	$(".owncontent").css("display","none");
	$(".customer").css("display","block");
	$.ajax({
		type:"get",
		url:"http://localhost:3000/getUsers",
		success:function(res){
			var str = "";
			for(var i = 0 ; i < res.files.length ;i++){
				str += `<ul>
							<li>${res.files[i].uid}</li>
							<li>${res.files[i].username}</li>
							<li>${res.files[i].password}</li>
							<li>${res.files[i].sex}</li>
							<li>${res.files[i].birthday}</li>
							<li>${res.files[i].adress}</li>
							<li>${res.files[i].email}</li>
							<li><a href="#" class="amend">修改</a>---<a href="#" class="remove">删除</a></li>
						</ul>`;
			}
			$(".ccontent").html(str);
		}
	});
	return false;
})
$(".addad,.ad2").click(function(){
	$(".amends").css("display","none");
	$(".newaddshop").css("display","none");
	$(".shop").css("display","none");
	$(".amendc").css("display","none");
	$(".c2").css("display","none");
	$(".owncontent").css("display","none");
	$(".customer").css("display","none");
	$(".c3").css("display","none");
	$(".c1").css("display","block");
	return false;
})

/*商品列表*/
$(".adshop").click(function(){
	$(".amends").css("display","none");
	$(".newaddshop").css("display","none");
	$(".shop").css("display","block");
	$(".amendc").css("display","none");
	$(".c2").css("display","none");
	$(".owncontent").css("display","none");
	$(".customer").css("display","none");
	$(".c3").css("display","none");
	$(".c1").css("display","none");
	
	$.ajax({
		type:"get",
		url:"http://localhost:3000/getshop",
		success:function(res){
			var str = "";
			for(var i = 0 ; i < res.files.length ; i++){
				str += `<ul>
							<li>${res.files[i].gid}</li>
							<li>${res.files[i].gname}</li>
							<li>${res.files[i].goprice}</li>
							<li>${res.files[i].gnprice}</li>
							<li>${res.files[i].gtype}</li>
							<li>${res.files[i].gtitle}</li>
							<li>${res.files[i].gcolor}</li>
							<li>${res.files[i].gsrc}</li>
							<li>${res.files[i].gstore}</li>
							<li><a href="#" class="amend">修改</a>---<a href="#" class="remove">删除</a></li>
						</ul>`;
				}
			$(".shopcontent").html(str);
		}
		
	});
	
	return false;
})




/*点击logo刷新页面*/
$(".header h1").click(function(){
	location.reload();
	return false;
})


/*提交密码时的验证*/
$('.owncontent').submit(function(){
	if($(".new1").val() == $(".new2").val()){
		return true;
	}else{
		alert("新密码重复输出不同");
		return false;
	}
})

/*图片删除功能*/
$(".adcontent").on("click","a",function(){
//	console.log($(this).parent().parent().children("li").eq(0).html());
//	console.log($(this).parent().parent().children("li").eq(1).html());
	$.ajax({
		type:"get",
		url:"http://localhost:3000/delAdv",
		data:{
			"id":$(this).parent().parent().children("li").eq(0).html()
		},	
		success:function(res){
			if(res == "删除成功"){
				alert("删除成功");
			}else{
				alert("删除失败");
			}
			location.reload();
		}
	});
	return false;
})

/*客户删除*/
$(".ccontent").on("click",".remove",function(){
	var username = $(this).parent().parent().children("li").eq(1).html();
//	alert(username);
	$.ajax({
		type:"get",
		url:"http://localhost:3000/delCustomer",
		data:{
			"id":$(this).parent().parent().children("li").eq(0).html()
		},	
		success:function(res){
			if(res == "删除成功"){
				$.ajax({
					type:"get",
					url:"http://localhost:3000/delShops",
					data:{
						"username":username
					},
					success:function(res1){
						alert(res1);
					}
					
				});
			}else{
				alert("用户删除失败");
			}
			location.reload();
		}
	});
	return false;
})

$(".ccontent").on("click",".amend",function(){
	var liObj = $(this).parent().parent().children("li");
	$(".amendc").css("display","block");
	$(".customer").css("display","none");
	$(".amendc0").val(liObj.eq(0).html());
	$(".amendc1").val(liObj.eq(0).html());
	$(".amendc2").val(liObj.eq(1).html());
	$(".amendc3").val(liObj.eq(2).html());
	$(".amendc4").val(liObj.eq(3).html());
	$(".amendc5").val(liObj.eq(4).html());
	$(".amendc6").val(liObj.eq(5).html());
	$(".amendc7").val(liObj.eq(6).html());
	return false;
})

$(".newadd,.newadd2").click(function(){
	$(".amends").css("display","none");
	$(".amendc").css("display","none");
	$(".c2").css("display","none");
	$(".owncontent").css("display","none");
	$(".customer").css("display","none");
	$(".c3").css("display","none");
	$(".c1").css("display","none");
	$(".newaddshop").css("display","block");
	$(".shop").css("display","none");
	
	return false;
})

/*删除商品功能*/
$(".shopcontent").on("click",".remove",function(){
	var gid = $(this).parent().parent().children("li").eq(0).html();
	$.ajax({
		type:"get",
		url:"http://localhost:3000/delShop",
		data:{
			"gid" : gid
		},
		success:function(res){
			alert(res);
			location.reload();
		}
	});
	return false;
})

/*商品修改功能*/
$(".shopcontent").on("click",".amend",function(){
	var liObj = $(this).parent().parent().children("li");
	$(".amends").css("display","block");
	$(".shop").css("display","none");
	$(".amends0").val(liObj.eq(0).html());
	$(".amends1").val(liObj.eq(0).html());
	$(".amends2").val(liObj.eq(1).html());
	$(".amends3").val(liObj.eq(2).html());
	$(".amends4").val(liObj.eq(3).html());
	$(".amends5").val(liObj.eq(4).html());
	$(".amends6").val(liObj.eq(5).html());
	$(".amends7").val(liObj.eq(6).html());
	$(".amends8").val(liObj.eq(7).html());
	$(".amends9").val(liObj.eq(8).html());
	return false;
})