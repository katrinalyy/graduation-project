//1、设置时间格式函数	
function chinaTime(day){
	var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var _y = day.getFullYear();
	var _m = day.getMonth()+1;
	var _d = day.getDate();
	var _h = add0(day.getHours());
	var _f = add0(day.getMinutes());
	var _s = add0(day.getSeconds());
	var _w = day.getDay();
	var str = _y + "/" + _m + "/" + _d  + " " ;
	str += _h + ":" + _f + ":" + _s  + " ";
	str += arr[_w];
	return str;
}

//2、判断如果时间小于10，拼接0;
function add0(num){
	return num < 10 ? ("0"+num) :num;
}

//	3．数学对象封装随机函数
	function math(min,max){
		return Math.round( Math.random()*(max-min) ) + min;
	}
	
//	4．随机获取六位十六进制颜色
	function getColor(){
		var str = "0123456789abcdef";
		var color = "#";  //定义一个字符串，用来最后输出得到的颜色。
		for( var i = 0 ;i < 6 ; i++){
			color += str.charAt( math(0,15) );
		}
		return color ;
	}
	
//	5、获取id元素
	function $id(id){
		return document.getElementById(id);
	}
	
//	6、得出两个日期之间的秒值
	function diff(start,end){
		return (end.getTime()-start.getTime())/1000;
	}
	
// 	7、创建一个新的元素
	function create(ele){
		return document.createElement(ele);
	}

// 兼容IE的getElementsByClassName方法。
	function getClassName(name){
		if( document.getElementsByClassName ){
			return document.getElementsByClassName(name);
		}else{
			var str = [];
			var all = document.getElementsByTagName("*");
			for( var i = 0 ; i < all.length ; i++ ){
				if( all[i].className == name ){
					str.push(all[i]);
				}
			}
		}
		return str;
	}


 
