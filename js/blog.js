var blogPage = new Vue({
	el:"#blog-page",
	data:{
		blogCount:0,		//文章数
		columnCount:0,		//分栏数	
		friendLink:[],		//友链列表
		noticeList:[],		//公告板列表
		blogRetrieval:{		//文章检索信息
			title:'',
			cid:'',
			page:1
		},	
		columnList:[],		//分栏列表
		columnSelected:0,	//分栏选择编号
		blogList:[],		//文章列表
		totalPage:0,		//分页总数
		totalNumber:0		//博客条数
	},
	methods:{
		loadFriendLink:function(){//装载友链
			// console.log('blog page is loading friend links');
			var that = this;
			$.ajax({
				async:false,
				url:'http://60.205.211.19:3004/friendLink/',
				type:'GET',
				// dataType:'jsonp',
				// jsonp:'jsoncallback',
				crossDomain:true,
				success:function(result){
					console.log(result);
					that.friendLink = result.extend;
				},
				error:function(e){
					console.log('失败了');
						
					console.log(e);
				}
			});
		},
		loadBlogCount:function(){//装载文章计数
			// console.log('blog page is loading blog count');
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/blog/count.action',
				type:'get',
				crossDomain:true,
				success:function(result){
					console.log('blog count load successfully');
					that.blogCount = result;
				}
			})
		},
		loadColumnCount:function(){//装载分栏计数
			// console.log('blog page is loading column count');
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/column/getCount.action',
				type:'get',
				crossDomain:true,
				success:function(result){
					console.log('load column count successfully');
					that.columnCount = result;
				}
			})
		},
		loadBlogs:function(){//获取文章列表
			// console.log('blog page is loading blog list');
			var that = this;
			$.ajax({
				async:false,
				url:'http://60.205.211.19:3004/blog/',
				data:that.blogRetrieval,
				type:'get',
				success:function(result){
					// console.log('load blog list successfully');
					console.log(result)
					that.totalNumber = result.extend.total
					that.blogList = result.extend.list;
					that.totalPage = result.extend.pages
				}
			})
		},
		loadMoreBlogs:function(){
			
			if(this.blogRetrieval.page > this.totalPage){
				this.blogRetrieval.page = this.totalPage
				return
			}
			
			var that = this;
			$.ajax({
				async:false,
				url:'http://60.205.211.19:3004/blog/',
				data:that.blogRetrieval,
				type:'get',
				success:function(result){
					// console.log('load blog list successfully');
					console.log(result)
					that.totalNumber = result.extend.total
					for(let i of result.extend.list){
						that.blogList.push(i)
					}
					that.totalPage = result.extend.pages
				}
			})
		},
		loadColumns:function(){//装载分栏
			// console.log('blog page is loading column list');
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/column/getAll.action',
				type:'get',
				crossDomain:true,
				success:function(result){
					console.log('load column list successfully');
					that.columnList = result;
				}
			});
		},
		loadNotices:function(){//加载公告
			// console.log('blog page is loading notice list');
			var that = this;
			$.ajax({
				async:false,
				url:getPath() + '/notice/getAll.action',
				type:'get',
				crossDomain:true,
				success:function(result){
					console.log('load notice list successfully');
					that.noticeList = result;
				}
			});
		}
	},
	created:function(){
		// console.log(sessionStorage);
		// console.log('blog page is loading data...');
		
		this.blogRetrieval.cid = sessionStorage.getItem('cid');
		this.blogRetrieval.title = sessionStorage.getItem('title')
		sessionStorage.removeItem('title');
		sessionStorage.removeItem('cid');
		
		//友链
		this.loadFriendLink();
		
		//博客计数
		this.loadBlogCount();
		
		//分栏计数
		this.loadColumnCount();
		
		//博客列表
		this.loadBlogs();
		
		//分栏列表
		this.loadColumns();
		
		//公告
		this.loadNotices();
	},
	mounted:function(){
		hideMask()
	}
})

window.onscroll = ()=>{
	// console.log(window.scrollY + '/' + window.innerHeight + '/' + document.height)
}