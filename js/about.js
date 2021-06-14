var about = new Vue({
	el:".about",
	data:{
		editionRecord:[]
	},
	methods:{
		loadUpdate:function(){//获取网页版本更新
			var that = this
			$.ajax({
				url:getPath() + '/editionRecord/getAll.action',
				type:'get',
				crossDomain:true,
				async:false,
				data:{
					top:2
				},
				success:function(result){
					console.log(result);
					that.editionRecord = result
				}
			})
		},
		like:function(idx){//点赞
			var that = this
			$.ajax({
				url:getPath() + '/editionRecord/like.action',
				type:'get',
				crossDomain:true,
				async:true,
				data:{
					id:that.editionRecord[idx].id
				},
				success:function(result){
					if(result == 1){
						that.editionRecord[idx].likes++;
					}
				}
			})
		}
	},
	created:function(){
		this.loadUpdate();
		
	}
})