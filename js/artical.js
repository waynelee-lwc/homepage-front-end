var artical = new Vue({
	el:"#artical",
	data:{
		blog:{
			id:''
		},
		commentEditing:{
			bId:'',
			text:''
		}
	},
	methods:{
		readBlog:function(bId){
			$.ajax({
				async:false,
				type:'get',
				url:getPath() + '/blog/readBlog',
				crossDomain:true,
				data:{
					bId:bId
				},
				success:(res)=>{
				}
			})
		},
		loadBlog:function(){//加载博客
			console.log('loading artical ' + this.blog.id);
			var that = this;
			$.ajax({
				async:false,
				type:'get',
				url:getPath() + '/blog/getById.action',
				data:{
					id:that.blog.id
				},
				crossDomain:true,
				success:function(result){
					console.log('load artical succefully');
					that.blog = result;
					that.commentEditing.bId = that.blog.id;
					that.readBlog(result.id);
				}
			});
		},
		publishComment:function(){//发表评论
			if(this.commentEditing.text == ''){
				return;
			}
			var that = this;
			$.ajax({
				async:true,
				type:'post',
				url:getPath() + '/comment/addComment',
				data:that.commentEditing,
				xhrFields: {
					withCredentials: true  //携带跨域cookie
				},
				headers:{
					Authorization:sessionStorage.getItem('token')
				},
				success:function(result){
					if(result.code != 200){
						alert(result.message);
						return;
					}
					alert('评论成功')
					that.loadBlog();
					that.commentEditing.text='';
				}
			})
		},
		like:function(idx){
			var that = this;
			$.ajax({
				url:getPath() + '/comment/like.action',
				type:'get',
				crossDomain:true,
				async:true,
				data:{
					id:that.blog.comment[idx].id
				},
				success:function(result){
					if(result){
						that.blog.comment[idx].likes++;
					}
				}
			})
		}
	},
	created:function(){
		console.log('获取文章');
		this.blog.id = sessionStorage.getItem('bid');
		sessionStorage.removeItem('bid');
		if(this.blog.id == null){
			location.href = './blog.html';
		}
		
		this.loadBlog();
		// console.log('title:' + document.title);
		document.title = this.blog.title;
		

	},
	mounted:function(){
		hideMask()
	}
});

$(function(){
	console.log('解析文章');
	var preview=editormd.markdownToHTML("artical-content-text",{
		markdown:artical.blog.text,
		previewTheme:'dark',
		htmlDeCode:"style,script,iframe",
		path:'../editormd/lib/',
		previewTheme	:'dark',
		theme			:'gray',
		emoji           :true,
		taskList		:true,
		latex			:true,
		flowChart		:true,
		sequenceDiagram :true,
		tex				:true,
		codeFold		:true,
		tocm			:true,
	})
	preview.getMarkdown();
})