var uploadBlog = new Vue({
	el:".uploadBlog",
	data:{
		columnList:[],
		columnSelected:[],
		blog:{
			title:'',
			text:'',
			publishTime:'',
			updateTime:'',
			comments:'',
			visits:'',
			abst:'',
			columns:[]
		},
		blogsExisted:[]
	},
	methods:{
		loadColumnList:function(){
			var that = this;
			$.ajax({
				url:"http://localhost:2048/column/getAllWithBlog.action",
				async:false,
				crossDomain:true,
				type:'get',
				success:function(result){
					console.log('load column list successfully');
					that.columnList = result;
				}
			})
		},
		uploadBlog:function(){
			console.log(this.columnSelected);
			
			var that = this;
			this.blog.columns = this.columnSelected;
			console.log(this.blog);
			$.ajax({
				url:'http://localhost:2048/blog/uploadBlog.action',
				async:false,
				crossDomain:true,
				type:'post',
				data:that.blog,
				success:function(result){
					alert('上传成功');
					that.blog = {
						title:'',
						text:'',
						publishTime:'',
						updateTime:'',
						comments:'',
						visits:'',
						abst:'',
						columns:[]
					};
					that.columnSelected = [];
					that.changeColumn();
					window.reload();
				}
			})
		},
		changeColumn:function(){
			console.log(this.columnSelected);
			var list = [];
			var col;
			for(var i = 0;i < this.columnSelected.length;i++){
				col = this.getColumnById(this.columnSelected[i]);
				// console.log(col);
				for(var j = 0;j < col.blogs.length;j++){
					// console.log(col.blogs[j].title);
					// console.log(list.indexOf(col.blogs[j].title));
					if(list.indexOf(col.blogs[j].title) == -1){
						list.push(col.blogs[j].title);
					}
				}
			}
			// console.log(list);
			this.blogsExisted = list;
		},
		getColumnById:function(id){
			for(var i = 0;i < this.columnList.length;i++){
				if(this.columnList[i].id == id){
					return this.columnList[i];
				}
			}
			return null;
		}
	},
	computed:{
		// currentColumn:function(){
		// 	return this.columnList[this.columnSelected];
		// }
	},
	created:function(){
		this.loadColumnList();
	}
})