var about = new Vue({
	el:".about",
	data:{
		editionRecord:[],
		accumulation:'23'
	},
	methods:{
		loadUpdate:function(){//获取网页版本更新
			var that = this
			$.ajax({
				url:'http://localhost:3004/editionRecord/',
				type:'get',
				crossDomain:true,
				async:false,
				success:function(result){
					//console.log(result.extend);
					that.editionRecord = result.extend
				}
			})
		},
		like:function(idx){//点赞
			var that = this
			$.ajax({
				url:'http://localhost:3004/editionRecord/like',
				type:'put',
				crossDomain:true,
				async:true,
				data:{
					id:that.editionRecord[idx].id
				},
				success:function(result){
					console.log(result)
					if(result.code == 200){
						that.editionRecord[idx].likes++;
					}else{
						alert('点赞失败!' + result.message)
					}
				}
			})
		},
		getTime:function(){
			let curr = new Date();
			let prev = '2021-01-20 12:00:00';
			let sub = curr.getTime() - new Date(prev).getTime();
			
			let days = Math.floor(sub / (1000 * 60 * 60 * 24));
			sub %= 1000 * 60 * 60 * 24;
			let hours = Math.floor(sub / (1000 * 60 * 60));
			sub %= 1000 * 60 * 60;
			let mins = Math.floor(sub / (1000 * 60));
			sub %= 1000 * 60;
			let secs = Math.floor(sub / (1000));
			
			return days + '天' + hours + '时' + mins + '分' + secs + '秒';
		}
	},
	created:function(){
		this.loadUpdate();
			
		let that = this;
		this.accumulation = this.getTime();
		setInterval(function(){
			that.accumulation = that.getTime();
		},1000);
	}
})