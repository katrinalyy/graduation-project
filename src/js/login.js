window.onload = function(){
	$("form").submit(function(){
		if( $(".tel").val() == "" || $(".tel").val() == "手机号/邮箱/用户名"){
			$(".error").html("请输入用户名");
			return false;
		}else if( $(".pwd").val() == "" || $(".pwd").val() == "密码"){
			$(".error").html("请输入密码");
			return false;
		}else {
			/*利用ajax实现效果*/
			
			var data = `name=${$(".tel").val()}&pwd=${$(".pwd").val()}&id=${new Date().getTime()}`;
			var url = `http://127.0.0.1/lyyproject/src/js/login.php`;
			var pro = ajaxPromise(url,data);
			pro.then(function(res){
				switch(res){
					case "1" : 
						$(".error").html("用户名不存在!");
						break;
					case "2" : 
						alert("登录成功");
						location.href = "index.html";
						var json = {
							"username" : $(".tel").val()
						}
						setCookie("user",JSON.stringify(json),1);
						break;
					case "3" :
						$(".error").html("密码错误!");
						break;
				}
			},function(msg){
				alert(msg);
			})
			return false;
		}
	})
	/*利用promise实现ajax*/
	function ajaxPromise(url,data){
		if( arguments.length == 2 ){
			url = url + "?" + data;
		}
		var pro = new Promise(function(success,failed){
			var ajax = new XMLHttpRequest();
			ajax.open("GET",url);//url全称
			ajax.send();
			ajax.onreadystatechange = function(){
				if( ajax.readyState == 4 && ajax.status == 200 ){
					//表示请求成功 
					success( ajax.responseText );
				}
			}
			
			//经过5000    如果服务器没有返回数据      通知用户请求失败
			setTimeout(function(){
				failed("请求数据失败");
			},5000)
			
		})
		
		//返回一个promise对象
		return pro;
	}
	
	
	
	/*手机号码相应设置*/
//	var flagTel = null;
	$(".tel").focus(function(){
		if($(this).val() == "手机号/邮箱/用户名"){
			$(this).val("");
		}
		$(this).css({
			"border":"1px solid #7fbfe7",
			"color" : "#000"
		})
		$(this).prev().css("display","block")
	}).blur(function(){
		var tel = $(this).val();
		$(this).css("border","1px solid #d8d8d8")
		$(this).prev().css("display","none")
		if(tel == ""){
			$(this).val("手机号/邮箱/用户名");
			$(this).css("color","#afafaf")
		}else{
			$(this).val(tel);
		}
		
		
	})

	
	/*密码相应设置*/
//	var falgPwd = null;
	$(".pwd").focus(function(){
		$(this).attr("type","password");
		if($(this).val() == "密码"){
			$(this).val("");
		}
		$(this).css({
			"border":"1px solid #7fbfe7",
			"color" : "#000"
		})
		$(this).prev().css("display","block")
	}).blur(function(){
		var tel = $(this).val();
		$(this).css("border","1px solid #d8d8d8")
		$(this).prev().css("display","none")
		if(tel == ""){
			$(this).attr("type","text");
			$(this).val("密码");
			$(this).css("color","#afafaf")
		}else{
			$(this).val(tel);
		}
		
		
	})
	
	
	
	
}
