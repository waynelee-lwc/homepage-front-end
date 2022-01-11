
/*调整比例大小*/

document.getElementsByTagName('html')[0].style.fontSize = (16/1920) * window.innerWidth + "px";
window.onresize = function(){
	// console.log("当前尺寸为：" + window.innerWidth);
	document.getElementsByTagName('html')[0].style.fontSize = (16/1920) * window.innerWidth + "px";
}



$.ajaxSetup({
	xhrFields: {
	  withCredentials: true
	},
	crossDomain: true
});

/*页面加载成功时，获取所有url参数*/

console.log('页面加载成功，当前页面url为：' + location);
if(location.href.indexOf('?') != -1){
	var param = decodeURI(window.location.href.split('?')[1]).split('&');
	console.log('当前页面参数有：' + JSON.stringify(param));
	for(var i = 0;i < param.length;i++){
		sessionStorage.setItem(param[i].split('=')[0],param[i].split('=')[1]);
	}
}

console.log(sessionStorage.getItem('user'));
// if(sessionStorage.getItem('user') == ''){
// 	$.ajax({
// 		url:'http://localhost:2048/user/checkLogin.action',
// 		type:'get',
// 		async:false,
// 		crossDomain:true,
// 		success:function(result){
// 			console.log("验证登录成功")
// 			console.log(result);
// 			sessionStorage.setItem('user',result);
// 		}
// 	})
// }


var serverAddress = {
	dev:'http://127.0.0.1:2048',
	online:'http://60.205.211.19:2048'
}

var currentEnvironment = 'online';

var getPath = function(){
	switch(currentEnvironment){
		case 'online':return serverAddress.online;
		case 'dev':return serverAddress.dev;
	}
};

var hideMask = function(){
	$('#loading-mask').fadeOut(200)
}