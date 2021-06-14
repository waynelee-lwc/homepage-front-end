var bg = new Vue({
	el:"#bg",
	data:{
		blogRetrieval:'',
		user:null,
		userSelected:{
			login:false,
			register:false
		},
		userLogin:{
			phone:'',
			password:''
		},
		userRegister:{
			phone:'',
			nickname:'',
			password:''
		},
		canvas:false
	},
	methods:{
		retrivalBlog:function(){//检索博客
			if(this.blogRetrieval == '')
				return;
			window.open('blog.html?title=' + this.blogRetrieval);
		},
		showLogin:function(){//展示登录框
			this.hideRegister();
			$(".bg-login").animate({
				right:"0rem"
			});
			this.userSelected.login = true;
		},
		hideLogin:function(){//隐藏登录框
			if(!this.userSelected.login)
				return;
			$(".bg-login").animate({
				right:"-25rem"
			});
			this.userSelected.login = false;
		},
		showRegister:function(){//展示注册框
			this.hideLogin();
			$(".bg-register").animate({
				right:"0rem"
			});
			this.userSelected.register = true;
		},
		hideRegister:function(){//隐藏注册框
			if(!this.userSelected.register)
				return;
			$(".bg-register").animate({
				right:"-25rem"
			})
			this.userSelected.register = false;
		},
		login:function(){//登录
			var that = this;
			// $.ajax({
			// 	url:getPath() +  '/user/login.action',
			// 	type:'post',
			// 	data:that.userLogin,
			// 	crossDomain:true,
			// 	async:false,
			// 	xhrFields: {
			// 		withCredentials: true  //携带跨域cookie
			// 	},
			// 	withCredentials:true,
			// 	success:function(result){
			// 		if(result.code != 0){
			// 			alert('登录失败：' + result.error);
			// 			return;
			// 		}
			// 		console.log('login successfully wecome ' + result.user.nickname);
			// 		sessionStorage.setItem('user',JSON.stringify(result.user));
			// 		that.user = result.user;
			// 		that.hideLogin();
			// 		that.hideRegister();
					
			// 		that.userLogin = {
			// 			phone:'',
			// 			password:''
			// 		}
			// 	}
			// })
			// window.location.reload();
			$.ajax({
				url:getPath() + '/user/login',
				type:'POST',
				data:that.userLogin,
				headers:{
					Authorization:sessionStorage.getItem('token')
				},
				crossDomain:true,
				async:false,
				success:function(res){
					if(res.code == 200){
						alert('登录成功');
						// sessionStorage.setItem('user',JSON.stringify(user));
						sessionStorage.setItem('token',res.data);
						
						$.ajaxSetup({
							headers:{
								Authorization:sessionStorage.getItem('token')
							}
						});
						
						$.ajax({
							url:getPath() + '/user/loginInfo',
							type:'GET',
							// headers:{
							// 	Authorization:sessionStorage.getItem('token')
							// },
							async:false,
							success:function(res){
								sessionStorage.setItem('user',JSON.stringify(res.data));
								that.user = res.data;
								that.hideLogin();
								that.hideRegister();
								
								that.userLogin = {
									phone:'',
									password:''
								}
							}
						})
						
					}else{
						alert('登录失败,' + res.message);
					}
				}
			})
		},
		register:function(){//注册
			var that = this;
			$.ajax({
				url:getPath() + '/user/register',
				type:'post',
				data:that.userRegister,
				crossDomain:true,
				async:false,
				success:function(result){
					
					//注册失败，打印信息
					if(result.code != 200){
						alert('注册失败:' + result.message);
						return;
					}
					//注册成功
					alert('注册成功');
					// console.log('register successfully');
					//隐藏窗口
					that.hideLogin();
					that.hideRegister();
					
					//自动登录
					that.userLogin.phone = that.userRegister.phone;
					that.userLogin.password = that.userRegister.password;
					that.userRegister = {
						phone:'',
						password:'',
						nickname:''
					}
					that.login();
				}
			})
		},
		logout:function(){//注销
			if(!confirm("确认注销？")){
				return;
			}
			var that = this;
			$.ajax({
				url:getPath() + '/user/logout',
				type:'get',
				crossDomain:true,
				async:false,
				headers: {
					Authorization:sessionStorage.getItem('token')
				},
				
				success:function(result){
					if(result.code != 200){
						alert("登出失败," + result.message);
						return;
					}
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('token');
					that.user = ''
					console.log('logout successfully');
				}
				
			})
		}
	},
	created:function(){
		console.log(sessionStorage.getItem('user'));
		this.user = JSON.parse(sessionStorage.getItem('user'));
	}
})