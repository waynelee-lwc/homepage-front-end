var note = new Vue({
	el:".note",
	data:{
		noteList:[],
		noteNew:{
			content:'',
			nickname:''
		},
		replyInfo:{
			resId:'',
			respondent:'',
			replyPost:''
		},
		isEditing:false,
		isSecret:false
		
	},
	methods:{
		loadNoteList:function(){
			var that = this;
			$.ajax({
				url:getPath() + '/note/getAll',
				type:'get',
				crossDomain:true,
				async:false,
				success:function(result){
					that.noteList = result;
					console.log(result);
				}
			})
		},
		reply:function(replyPost,resId,respondent){
			this.replyInfo = {
				resId,
				respondent,
				replyPost
			}
			$('.note-editor-text').focus();
			this.isSecret = false;
		},
		cancelReply:function(){
			this.replyInfo = {
				resId:'',
				respondent:'',
				replyPost:''
			}
			$('.note-editor-text').focus();
		},
		reset:function(){
			this.replyInfo = {
				resId:'',
				respondent:'',
				replyPost:''
			};
			this.noteNew = {
				content:'',
				nickname:''
			}
			this.isSecret = false;
		},
		changeSecret:function(){
			if(this.isSecret){
				this.cancelReply();
			}
		},
		submitReply:function(){
			if(this.noteNew.content == ''){
				alert('说点什么吧...');
				return;
			}
			if(this.noteNew.nickname == ''){
				alert('昵称需要填哦...');
				return;
			}
			var that = this;
			if(this.replyInfo.resId == ''){
				$.ajax({
					crossDomain:true,
					url:getPath() + '/note/addMetaNote',
					type:'post',
					async:false,
					data:{
						content:that.noteNew.content,
						nickname:that.noteNew.nickname,
						isSecret:that.isSecret
					},
					success:(res)=>{
						if(res == 0){
							alert('留言失败，未知错误...');
							return;
						}
						alert('留言成功！');
						that.loadNoteList();
						that.reset();
					}
				})
			}else{
				$.ajax({
					crossDomain:true,
					url:getPath() + '/note/addFollowNote',
					type:'post',
					async:false,
					data:{
						content:that.noteNew.content,
						nickname:that.noteNew.nickname,
						resId:that.replyInfo.resId,
						replyPost:that.replyInfo.replyPost,
						isSecret:that.isSecret
					},
					success:(res)=>{
						if(res == 0){
							alert('回复失败，未知错误...');
							return;
						}
						alert('回复成功！');
						that.loadNoteList();
						that.reset();
					}
				})
			}
		}
	},
	created:function(){
		this.loadNoteList();
		// alert("施工中，敬请期待。。。");
		// location.href = './index.html';
	},
	mounted:function(){
		hideMask();
	}
})