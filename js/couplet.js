

$('.controls-submit').on('click',function(){
	
	let cpltl = $('.words-input-l').val()
	let cpltr = $('.words-input-r').val()
	let cpltu = $('.words-input-u').val()
	
	console.log(cpltl)
	console.log(cpltr)
	console.log(cpltu)
	
	let fonts = $('.fonts').val()
	let sizes = $('.sizes').val()
	let touming = 'off'
	
	let listl = []
	let listr = []
	let listu = []
	
	let cntl = cpltl.length
	let cntr = cpltr.length
	let cntu = cpltu.length
	
	$('.cplt-l').empty()
	
	for(let i = 0;i < cpltl.length;i++){
		
		let height = Number.parseFloat($('.cplt').css('height').substr(0,$('.cplt').css('height').length - 2))
		let blocksize = (height - 50) / cpltl.length
		let sizes = blocksize * 0.45
		let word = cpltl[i]
		$.ajax({
			url:'http://www.wayne-lee.cn:3004/test/calligraphy',
			type:'get',
			data:{
				word:word,
				fonts:fonts,
				sizes:sizes,
				touming:touming,
				color:'#FF0000'
			},
			success:function(res){
				if(res.code != 200){
					return
				}
				let url = res.extend.url
				listl[i] = `http://www.wayne-lee.cn:3004${url}`
				cntl--
				if(cntl == 0){
					for(let j = 0;j < cpltl.length;j++){
						let height = Number.parseFloat($('.cplt').css('height').substr(0,$('.cplt').css('height').length - 2))
						let blocksize = (height - 50) / cpltl.length
						let sizes = blocksize * 0.45
						sizes = Math.min(sizes,60)
						
						$('.cplt-l').append(
							$(`<div class="word-wrapper" style="width:${blocksize}px;height:${blocksize}px"></div>`).append(
								$(`<div class="word-word" style="background-position:${-30 - sizes / 2 + blocksize * 0.4}px ${-45 - sizes / 2 + blocksize * 0.4}px; background-image: url(${listl[j]})"></div>`)
							)
						)
						$('.cplt-l').css('width',blocksize)
					}
				}
			}
		})
	}
	
	$('.cplt-r').empty()
	for(let i = 0;i < cpltr.length;i++){
		
		let height = Number.parseFloat($('.cplt').css('height').substr(0,$('.cplt').css('height').length - 2))
		let blocksize = (height - 50) / cpltr.length
		let sizes = blocksize * 0.45
		sizes = Math.min(sizes,60)
		let word = cpltr[i]
		$.ajax({
			url:'http://www.wayne-lee.cn:3004/test/calligraphy',
			type:'get',
			data:{
				word:word,
				fonts:fonts,
				sizes:sizes,
				touming:touming,
				color:'#FF0000'
			},
			success:function(res){
				if(res.code != 200){
					return
				}
				let url = res.extend.url
				listr[i] = `http://www.wayne-lee.cn:3004${url}`
				cntr--
				if(cntr == 0){
					for(let j = 0;j < cpltr.length;j++){
						let height = Number.parseFloat($('.cplt').css('height').substr(0,$('.cplt').css('height').length - 2))
						let blocksize = (height - 50) / cpltr.length
						let sizes = blocksize * 0.45
						sizes = Math.min(sizes,60)
						$('.cplt-r').append(
							$(`<div class="word-wrapper" style="width:${blocksize}px;height:${blocksize}px"></div>`).append(
								$(`<div class="word-word" style="background-position:${-30 - sizes / 2 + blocksize * 0.4}px ${-45 - sizes / 2 + blocksize * 0.4}px; background-image: url(${listr[j]})"></div>`)
							)
						)
						$('.cplt-r').css('width',blocksize)
					}
				}
			}
		})
	}
	
	$('.cplt-u').empty()
	for(let i = 0;i < cpltu.length;i++){
		let width = Number.parseFloat($('.cplt-u').css('width').substr(0,$('.cplt-u').css('width').length - 2))
		let blocksize = (width - 100) / cpltu.length
		let sizes = blocksize * 0.6
		sizes = Math.min(sizes,60)
		console.log(sizes)
		let word = cpltu[i]
		$.ajax({
			url:'http://www.wayne-lee.cn:3004/test/calligraphy',
			type:'get',
			data:{
				word:word,
				fonts:fonts,
				sizes:sizes,
				touming:touming,
				color:'#FF0000'
			},
			success:function(res){
				if(res.code != 200){
					return
				}
				let url = res.extend.url
				listu[i] = `http://www.wayne-lee.cn:3004${url}`
				cntu--
				if(cntu == 0){
					for(let j = 0;j < cpltu.length;j++){
						let width = Number.parseFloat($('.cplt-u').css('width').substr(0,$('.cplt-u').css('width').length - 2))
						let blocksize = (width - 100) / cpltu.length
						let sizes = blocksize * 0.6
						sizes = Math.min(sizes,60)
						
						$('.cplt-u').append(
							$(`<div class="word-wrapper" style="width:${blocksize}px;height:${blocksize}px"></div>`).append(
								$(`<div class="word-word" style="background-position:${-35 - sizes / 2 + blocksize * 0.4}px ${-50 - sizes / 2 + blocksize * 0.4}px; background-image: url(${listu[j]})"></div>`)
							)
						)
						console.log(blocksize)
						$('.cplt-u').css('height',blocksize)
					}
				}
			}
		})
	}
	

})