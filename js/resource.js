var rsboard = new Vue({
	el:".rsboard",
	data:{
		linkList:[],		//链接列表
		colList:[],			//分类列表
		colselected:''
	},
	methods:{
		loadColList:function(){		//获取分类列表
			var that = this;
			$.ajax({
				url:getPath() + '/resourceLink/getAllClassification.action',
				type:'get',
				crossDomain:true,
				async:false,
				success:function(result){
					that.colList = result;
				}
			});
		},
		loadLinkList:function(classification){	//获取链接列表
			var that = this;
			$.ajax({
				url:getPath() + '/resourceLink/getAllowedCollection.action',
				type:'get',
				crossDomain:true,
				async:true,
				data:{
					classification:classification
				},
				success:function(result){
					that.linkList = result;
				}
			})
		},
		shiftCol:function(col){//切换分类
			if(col == this.colselected){
				this.colselected = '';
			}else{
				this.colselected = col;
			}
			this.loadLinkList(this.colselected);
		}
	},
	created:function(){
		// alert("施工中，敬请期待。。。");
		// location.href = './index.html';
		
		console.log('load collection list');
		this.loadColList();
		
		console.log('load links list');
		this.loadLinkList();
	},
	mounted:function(){
		hideMask();
	}
})