//获取id元素函数
function $id(id){
		return document.getElementById(id);
	}

//存储cookie函数
function setCookie(key,value,day){
	if(day){
		var d = new Date();
		d.setDate( d.getDate() + day );
		document.cookie = key + "=" + value + ";expires=" + d;
	}else{
		document.cookie = key + "=" + value;
	}
	
}


//获取cookie函数
function getCookie(key){
	if(document.cookie){
		var str = document.cookie;
		var arr = str.split("; ");
		for( var i = 0 ; i < arr.length ;i++ ){
			var item = arr[i].split("=");
			if( item[0] == key  ){
				return item[1];
			}
		}
		//有cookie数据，但是没有key 得不到cookie，返回一个空字符串
		return "";
	}
	return "";
}

//删除cookie
function delCookie(key){
	 setCookie(key,"",-1);
}
