window.onload = function(){
	

//选项卡效果
$("#span-right").click(function(){
	$(this).css({"background":"#f16e23","color":"#fff"});
	$("#span-left,#span-pwd").css({"background":"#eae8e8","color":"#333"});
	$(".con-click,.con3-click").css({"display":"none"});
	$(".con2-click").css({"display":"block"});
})
$("#span-left").click(function(){
	$(this).css({"background":"#f16e23","color":"#fff"});
	$("#span-right,#span-pwd").css({"background":"#eae8e8","color":"#333"});
	$(".con-click").css({"display":"block"});
	$(".con2-click,.con3-click").css({"display":"none"});
})
$("#span-pwd").click(function(){
	$(this).css({"background":"#f16e23","color":"#fff"});
	$("#span-right,#span-left").css({"background":"#eae8e8","color":"#333"});
	$(".con3-click").css({"display":"block"});
	$(".con2-click,.con-click").css({"display":"none"});
})

/*账号鼠标聚焦效果*/
var falgUser = null; 
$(".username").focus(function(){
	$(this).next().css("display","inline-block");
}).blur(function(){
	var str = $(this).val();
	var reg = /^\w{6,20}$/;
	if(str){
		/*长度小于6个的判断*/
		if(str.length < 6 || str.length > 20){
			$(this).next().html("账号长度只能在6-20位字符之间");
			$(this).next().css("color","red");
			falgUser = false;
		}else{
			/*长度满足之后的判断*/
			if(reg.test(str)){
				falgUser = true;
				$(this).next().css("display","none");
				$(this).next().html("");
			}else{
				falgUser = false;
				$(this).next().html("账号只能由字母、数字或'_'组成");
				$(this).next().css("color","red");
			}
		}
	}else{
		falgUser = false;
		$(this).next().html("账号不能为空");
		$(this).next().css("color","red");
	}
	
})

/*性别设置*/
function checkSex(){
	var oSex = $("input[name=gender]");
	for(var i = 0 ; i < oSex.length; i++){
		if(oSex[i].checked){
			return true;
		}
	}
	return false;
	
}

/*邮箱设置*/
var flagemail=null;
$(".email").blur(function(){
	var str = $(this).val();
	var reg = /^\w+@\w+(.\w+)+$/;
	if(reg.test(str)){
		flagemail = true;
	}else{
		flagemail = false;
	}
})

/*年月日的设计*/
$(".year").change(function(){
	$(".month").val("");
	$(".day1").val("");
	var year = $(".year").val();   //存储年份
	$(".month").change(function(){
		$(".day1").val("");
		$(".day1").html("<option ></option>");
		var str = $(this).val();  //存储月份
		var str1 = "'1','3','5','7','8','10','12'";
		var str2 = "'4','6','9','11'";
		var str3 = "";
		var index = 0;
		if(str == "2"){
			if(year % 4 == 0 && year % 100 != 0 || year % 400 ==0){
				index = 29;
			}else{
				index = 28;
			}
		}else if(str1.indexOf(str) != -1){
			index = 31;
		}else if(str2.indexOf(str) != -1){
			index = 30;
		}
		
//		console.log(index,str);
		for(var i = 0 ; i < index ; i++){
			str3  += `<option>${i+1}</option>`;
		}
		$(".day1").append(str3);
		
	})
	
})

// 地址设置
var provArr = ["北京","天津","贵州"];

var cityArr = [["北京市"],["天津市"],["贵阳市","遵义市","六盘水市","安顺市","毕节市","铜仁市"]];
                                 						
var countyArr = [[["东城区","西城区","海淀区","朝阳区","丰台区","昌平区"]], [["和平区","河西区","河东区","河北区","南开区","红桥区"]],  [["南明区","云岩区","花溪区","乌当区","白云区","小河区"],["红花岗区","汇川区","遵义县","赤水市","仁怀市"],["钟山区","六枝特区","盘县"],["西秀区","平坝区","普定县"],["大方县","黔西县","织金县"],["碧江区","万山区","江口县"]]];
									

for(var i = 0 ; i < provArr.length ;i++){
	$("#prov").append("<option value="+i+">"+provArr[i]+"</option>");
}

var provhtml = null;
var cityhtml = null;
var index = null;
$("#prov").change(function(){
	$("#city")[0].length = 1; 
	$("#county")[0].length = 1;
	index = $(this).val(); 
	if(index){
		var _cityArr = cityArr[index];
		for(var i = 0 ; i < _cityArr.length ; i++){
			$("#city").append("<option value="+i+">"+_cityArr[i]+"</option>");
		}
	}
	provhtml = $("#prov").children("option").eq(parseInt(index)+1).text();
})

$("#city").change(function(){
	var tindex = 0;
	$("#county")[0].length = 1;
	if(index){
		var _countyArr = countyArr[index];
		tindex = $(this).val();
		if(tindex){
			var __countyArr = _countyArr[tindex];
			for(var j = 0 ; j < __countyArr.length ;j++){
				$("#county").append("<option>"+__countyArr[j]+"</option>");
			}
			
		}
		
	}
	cityhtml = $("#city").children(`option[value=${tindex}]`).text();
	
})


/*点击提交事件*/
var json = {};
$(".button").click(function(){
	$(".hiddenuser").val($(".log").html());
	var sex=null;
	if(falgUser && checkSex()&& flagemail){
		if($("input[name=gender]").prop("checked")){
			sex = "男";
		}else{
			sex = "女";
		}
		$.ajax({
			url:"js/basicinfo.php",
			type:"post",
			data:{
				"username" : $(".username").val(),
				"email"	   : $("input[name=email]").val(),
				"sex"	   : sex,
				"birthday" : $(".year").val()+"/"+$(".month").val()+"/"+$(".day1").val(),
				"address"  : provhtml+cityhtml+$("#county").val(),
				"originname":$(".hiddenuser").val()
			},
			success:function(res){
				if(res == 1){
					alert("请登录后进行操作");
				}else if(res == 2){
					alert("服务器目前繁忙,请稍后重试");
				}else if(res == 3){
					json = {
						"username" : $(".username").val()
					}
					setCookie("user",JSON.stringify(json),1);
					alert("资料保存成功");
				}
				location.reload();
			}
			
		})
	}else{
		alert("请填写完整并且按照要求");
	}
})


/*修改密码区域设置*/
$(".chagepwd").click(function(){
	$(".hiddenuser").val($(".log").html());
	var newpwd = $(".newpwd").val();
	var cnewpwd = $(".cnewpwd").val();
	if($(".originpwd").val()){
		if(!newpwd){
			alert("新密码不能为空");
		}else if(!cnewpwd){
			alert("再次输入密码不能为空");
		}else{
			if(newpwd == cnewpwd){
				$.ajax({
					url:"js/info.php",
					type:"post",
					data:{
						"username"  : $(".hiddenuser").val(),
						"originpwd" : $(".originpwd").val(),
						"newpwd"    : newpwd
					},
					success:function(res){
						if(res == 1){
							alert("请登录后进行操作");
							
						}else if(res == 2){
							alert("初始密码错误,请重新设置");
						}else if(res == 3){
							alert("请稍后重试,服务器繁忙");
						}else if(res == 4){
							alert("密码修改成功");
						}
						location.reload();
					}
					
				})
				
			}else{
				alert("输入的两次密码不相同");
			}
		}
		
		
	}else{
		alert("初始密码不能为空");
	}
	
})

	

}