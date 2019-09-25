window.onload = function(){
	
	$(".wokao").click(function(){
		var json = {};
		if(flagTel && falgYzm && falgMess){
			/*利用ajax实现效果*/
			var data = `name=${$(".tel").val()}&id=${new Date().getTime()}`;
			var url = `http://127.0.0.1/lyyproject/src/js/register.php`;
			var pro = ajaxPromise(url,data);
			pro.then(function(res){
				if(res == 1){
					alert("注册成功");
					alert("您的初始密码为:123456,请点击个人资料进行修改.");
					location.href = "index.html";
					json = {
						"username" : $(".tel").val()
					}
					setCookie("user",JSON.stringify(json),1);
				}else if(res == 2){
					alert("注册失败")
					location.href = "register.html";
				}
			},function(msg){
				alert(msg);
			})
		}else{
			alert("提交失败")
		}
		
	})
	
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
	var flagTel = null;
	$(".tel").focus(function(){
		if($(this).val() == "手机号码"){
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
			$(this).val("手机号码");
			$(this).css("color","#afafaf")
		}else{
			$(this).val(tel);
		}
		
		/*手机号码验证*/
		
		var reg = /^[1-9]\d{10}$/;
		if(!reg.test(tel)){
			flagTel = false;
			if(tel == ""){
				$(".error").html("请输入有效的手机号");
			}else{
				$(".error").html("手机号格式错误");
			}
		}else{
			flagTel = true;
			$(".error").html("");
			$(".yz").css("display","block");
		}
		
	})

	var falgYzm = null;
	/*验证码输入框的设置*/
	$(".inputyzm").focus(function(){
		if($(this).val() == "验证码"){
			$(this).val("");
		}
		$(this).css({
			"border":"1px solid #7fbfe7",
			"color" : "#000"
		})
		$(this).prev().css("display","block")
	}).blur(function(){
		var va = $(this).val();
		$(this).css("border","1px solid #d8d8d8")
		$(this).prev().css("display","none")
		if(va == ""){
			$(this).val("验证码");
			$(this).css("color","#afafaf")
		}else{
			$(this).val(va);
		}
		
		/*验证码有效性验证*/
		if(va == $(".yzm").html().toLowerCase() || va == $(".yzm").html().toUpperCase() || va == $(".yzm").html()){
			falgYzm = true;
			$(this).css("background","url(images/login/true.png) no-repeat right center");
		}else{
			$(this).css("background","url(images/login/error.png) no-repeat right center");
			falgYzm = false;
		}
	})
	/*验证码的设置*/
	function yzm(){
 		var str = "";
 		for( var i = 0 ; i < 6 ; i++  ){
 			var code = math(48,122);
 			if(code<=64 && code>=58 || code <= 96 && code >=91){
 				i--;
 			}else{
 				str += String.fromCharCode(code);
 			}
 		}
 		return str;
	}
	$(".yzm").html(yzm())
	$(".yzm").css("color",getColor())
	
	/*点击换一换改变验证码*/
	$(".change").click(function(){
		$(".yzm").html(yzm())
		$(".yzm").css("color",getColor())
		$(".inputyzm").val("");
		return false;  //阻止浏览器的默认行为
	})
	
	/*点击获取验证码的设置*/
	var canflag = true; //
	var messnum = null; 
	var time = 60;
	$(".require").click(function(){
		/*在开关开启的时候能进行点击*/
		if(canflag){
			/*设置60s后才能进行点击操作*/
			var timer = setInterval(function(){
				canflag = false;
				if(time == 0){
					canflag = true;
					clearInterval(timer);
					$(".require").html("重新获取验证码")
					time = 60;
				}else{
					$(".require").html(time-- + "s");
				}
				
			},1000)
			//获取手机验证码
			var str = mess();
			messnum = str;
			if(confirm("点击确定获取验证码")){
				alert("您的验证码已经书写完毕");
				$(".message").val(str);
				falgMess = true;
			}else{
				alert("您的验证码为：" + str);
			}
		}else{
			alert("太频繁获取验证码");
		}
		
		
		
	})
	
	var falgMess = null; 
	/*短信验证码框的设置*/
	$(".message").focus(function(){
		if($(this).val() == "短信验证码"){
			$(this).val("");
		}
		$(this).css({
			"border":"1px solid #7fbfe7",
			"color" : "#000"
		})
		$(this).prev().css("display","block")
	}).blur(function(){
		var va = $(this).val();
		$(this).css("border","1px solid #d8d8d8")
		$(this).prev().css("display","none")
		if(va == ""){
			$(this).val("短信验证码");
			$(this).css("color","#afafaf")
		}else{
			$(this).val(va);
		}
		
		/*短信验证码验证*/
		if(va == messnum){
			falgMess = true;
			$(".erroryz").html("");
//			console.log(messnum);
		}else{
			falgMess = false;
//			console.log(messnum);
			if(va == ""){
				$(".erroryz").html("请输入您收到的验证码");
			}else{
				$(".erroryz").html("验证码输入错误");
			}
			
		}
	})
	
	
	/* 获取手机验证码的函数，随机获取四位数*/
	function mess(){
		var str = "";
		for( var i = 0 ; i < 4 ; i++ ){
			str += math(0,9);
		}
		return str;
	}
	
	
	
	
}
