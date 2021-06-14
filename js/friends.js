var friends = new Vue({
	el:".friends",
	data:{
		friendLink:[],
		friendForm:{
			address:'',
			name:''
		},
		bgm:{
			paused:true,
			containerClass:'friends-player-container-paused',
			maskControlClass:'friends-player-mask-control-paused'
		}
	},
	methods:{
		loadFriendLink:function(){//加载友链列表
			console.log('blog page is loading friend links');
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/friendlink/getAccept.action',
				type:'GET',
				crossDomain:true,
				success:function(result){
					console.log('friend link load successfully');
					that.friendLink = result;
				},
				error:function(e){
					console.log('失败了');
						
					console.log(e);
				}
			});
		},
		addFriendLink:function(){
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/friendlink/leave.action',
				type:'POST',
				crossDomain:true,
				data:that.friendForm,
				success:function(result){
					if(result.code == 1){
						alert('error ' + result.error);
						return;
					}else{
						alert('提交成功，感谢支持，博主会尽快添加的，请保持主页可访问哦');
						that.friendForm = {
							name:'',
							address:''
						};
					}
				}
			})
		},
		bgmControl:function(){//控制背景音乐
			var audio1 = document.getElementById('audio1');
			var audio2 = document.getElementById('audio2');
			if(this.bgm.paused){//背景音乐播放
				audio1.play();
				audio2.play();
				this.bgm = {
					paused:false,
					containerClass:'friends-player-container-playing',
					maskControlClass:'friends-player-mask-control-playing'
				}
			}else{				//背景音乐暂停
				audio1.pause();
				audio2.pause();
				this.bgm = {
					paused:true,
					containerClass:'friends-player-container-paused',
					maskControlClass:'friends-player-mask-control-paused'
				}
			}
		}
	},
	created:function(){
		
		this.loadFriendLink();
		
	}
})

$(function(){
	var audio1 = document.getElementById('audio1');
	var audio2 = document.getElementById('audio2');
	
	setTimeout(function(){
		
		audio2.currentTime = 2.5;
		
		$('#audio1').on('ended',function(){
			audio1.play();
		})
		
		$('#audio2').on('ended',function(){
			audio2.play();
		})
		
		// $('.friends-player-mask').click();
	});
	
})