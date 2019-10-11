$(function($){
	let lyic
	//1.自定义滚动条：jQuery custom content scroller
	 $(".list").mCustomScrollbar();
	 ajaxx();
	 let $audio = $('audio')
	 let player = new Player($audio)
	 // console.log(player)
	 Event();
	 //歌曲进度条封装
	 let $progress = $('.progress_bottom')
	 let $progress_line = $('.progress_bottom_line')
	 let $progress_bar = $('.progress_bottom_bar')
	 
	 
	 let progress = new Progress($progress,$progress_line,$progress_bar)
		 progress.progressClick(function(value) {
			 player.musicTo(value)
		 })
		 progress.progressMove(function(value) {
			 player.musicTo(value)
		 })
	//声音进度条
	 let $music_progress = $('.music_progress_bottom')
	 let $music_progress_line = $('.music_rogress_bottom_line')
	 let $music_progress_bar = $('.music_progress_bottom_bar')
	 
	 let music_progress = new Progress($music_progress,$music_progress_line,$music_progress_bar)
	 		 music_progress.progressClick(function(value) {
				 if(value < 0.01) {
				 	$('.music_voice_info .icon').addClass('icon2')
				 	value = 0
				 }else if(value > 1){
					value = 1
					 $('.music_voice_info .icon').removeClass('icon2')
				 }else {
					  $('.music_voice_info .icon').removeClass('icon2')
				 }
	 			 player.musicControl(value)
	 		 })
	 		 music_progress.progressMove(function(value) {
				 if(value < 0.01) {
					 console.log(2)
				 	$('.music_voice_info .icon').addClass('icon2')
				 	value = 0
				 } else if(value > 1){
					value = 1
					 $('.music_voice_info .icon').removeClass('icon2')
				 }else{
					 $('.music_voice_info .icon').removeClass('icon2')
				 }
	 			 player.musicControl(value)
	 		 })
	 
	 function Event() {
		 $('.list ul').on('mouseenter', '.list-music', function(){
		 	 $(this).find('.list-menu').stop().fadeIn(10)
		 	 // console.log($(this))
		 	 $(this).find('.list-time a').stop().fadeIn(10)
		 	 $(this).find('.list-time span').stop().fadeOut(10)
		  })
		  $('.list ul').on('mouseleave', '.list-music', function() {
		 	 $(this).find('.list-menu').stop().fadeOut(10)
		 	 $(this).find('.list-time a').stop().fadeOut(10)
		 	 $(this).find('.list-time span').stop().fadeIn(10)
		  })
		 //勾选框
		 $('.list ul').on('click', '.list-checked span', function() {
		 	// console.log(this)
		 	$(this).toggleClass('active')
		 })
		 // $('.list-checked span').click(function() {
		 // 	$(this).toggleClass('active')
		 // })
		 //播放
		 let bottom_paly = $('.music_play')
		 $('.list ul').on('click', '.list-menu-play', function() {
			 //控制音乐播放状态
			 let music = $(this).parents('.list-music').get(0).music
			 let index = $(this).parents('.list-music').get(0).index
			 console.log(music)
			 player.playMusic(index, music)
			 //歌曲信息
			 MusicInfo(music)
			 //歌词信息
			 MusicList(music)
		 	//播放按钮切换
		 	$(this).toggleClass('list-menu-play2')
		 		   .parents('.list-music')
		 		   .siblings()
		 		   .find('.list-menu-play')
		 		   .removeClass('list-menu-play2')
		 		//播放按钮切换与底部同步   
		 	if($(this).hasClass('list-menu-play2')){
		 		bottom_paly.addClass('music_play2')
		 		$(this).parents('.list-music')
		 			  .css({
		 				'color': '#fff'
		 			   })
		 			  .siblings()
		 			  .css({
		 				 'color': "rgba(255,255,255,.5)" 
		 			  })
		 	}else {
		 		bottom_paly.removeClass('music_play2')
		 		$(this).parents('.list-music')
		 			  .css({
		 				    'color': "rgba(255,255,255,.5)" 
		 			     })
		 			  .siblings()
		 			  .css({
		 			   		'color':"rgba(255,255,255,.5)" 
		 			   })
		 	}
		 	//动画同步
		 	$(this).parents('.list-music')
		 		   .find('.list-number')
		 		   .toggleClass('list-number2')
		 		   .parents('.list-music')
		 		   .siblings()
		 		   .find('.list-number')
		 		   .removeClass('list-number2')
		 })
		 //前一首
		 $('.music_pre').click(function() {
			 // let index = player.preIndex();
			 if(player.currentIndex >= 0){
				 $('.list-music').eq(player.preIndex())
								.find('.list-menu-play')
								.trigger('click')
								}
		 })
		 
		 //播放按钮
		bottom_paly.click(function() {
			// progress.isFlag = false
			if(player.currentIndex == -1) {
				$('.list-music').eq(0)
								.find('.list-menu-play')
								.trigger('click')
			}else {
				$('.list-music').eq(player.currentIndex)
								.find('.list-menu-play')
								.trigger('click')
			}
		})
		//后一首
		$('.music_next').click(function() {
			// let index = player.nextIndex();
			// console.log(index)
			if(player.currentIndex + 1 != 0){
				$('.list-music').eq(player.nextIndex())
								.find('.list-menu-play')
								.trigger('click')
			}
			
		})
		//删除按钮
		$('.list ul').on('click', '.del', function() {
			let $li = $(this).parents('.list-music')
			if(player.currentIndex == $li.get(0).index) {
				$('.music_next').trigger('click')
			}
			
			$li.remove()
			player.del($li.get(0).index)
			$('.list-music').each(function(index, item) {
				item.index = index
				console.log(item,$li)
				$(this).find('.list-number').html(index + 1)
			})
			console.log($li.get(0).index)
			   
		})
		
		//监听audio标签的
		player.$audio.on('timeupdate', function() {
			// console.log(player.getMusicDuration(), player.getMusicCurrent())
			// console.log(player.audio.currentTime,player.audio.duration)
			let time = player.formDate(player.audio.duration, player.audio.currentTime)
			// console.log(time)
			$('.sing_time').text(time)
			// console.log(progress.isFlag)
			let Bili = player.getBili(player.audio.duration, player.audio.currentTime)
			progress.setProgress(Bili)
			
			let index = lyic.currentIndex(player.audio.currentTime)
			
			$('.list-sing li').eq(index)
							  .addClass('current')
							  .siblings()
							  .removeClass('current')
			 // console.log(index)
			 if(index <= 2) return
			$('.list-sing').css({
				'margin-top': (-index + 2) * 30
			})
			// console.log(Bili)
		})
		
		//控制声音按钮
		$('.music_voice_info .icon').click(function() {
			$(this).toggleClass('icon2')
			if($(this).attr('class').includes('icon2')){
				player.musicControl(0)
			}else {
				player.musicControl(1)
			}
		})
	 }
	function createItem(index,item) {
		let $li = $(`<li class="list-music">
								<div class="list-checked">
									<span></span>
								</div>
								<div class="list-number">${index + 1}</div>
								<div class="list-name">${item.name}
									<Div class="list-menu">
										<a href="javascript:;" title="播放" class="list-menu-play"></a>
										<a href="javascript:;" title="添加"></a>
										<a href="javascript:;" title="下载"></a>
										<a href="javascript:;" title="分享"></a>
									</Div>
								</div>
								<div class="list-siger">${item.singer}</div>
								<div class="list-time">
									<a href="javascript:;" title="删除" class="del"></a>
									<span>${item.time}</span>
								</div>
							</li>`)
					$li.get(0).index = index
					$li.get(0).music = item
					// console.log(item)
				return $li
	}
	function ajaxx() {
		$.ajax({
			url: './musiclist.json',
			dataType: 'json',
			type: 'get',
			success: function(data) {
				// console.log(data[0])
				MusicInfo(data[0])
				//初始化歌曲信息
				MusicList(data[0])
				player.musicList = data
				let $ul = $('.list ul')
				let item = $.each(data, (index, item) => {
					let  $li = createItem(index, item)
					// console.log($li)
					$ul.append($li)
				})
			},
			error:function(err) {
				console.log(err)
			}
		})
		
	}
	function MusicList(obj) {
		let $ul = $('.list-sing')
		 lyic = new Lyic(obj.link_lrc)
			 $ul.html('')
		lyic.ajaxMusic(function() {
			$.each(lyic.MusicInfo, function(index, item) {
				let $li = $('<li>' + item + '</li>')
				$ul.append($li)
			})
		})
	}
	
	//初始化第一首歌信息
	function MusicInfo(obj) {
		let $Img = $('.content_right img')
		let $sing = $('.content_right_sing a')
		let $songer = $('.content_right_songer a')
		let $name = $('.content_right_name a')
		
		let $bottom_sing = $('.progress_top .sing_name')
		let $bottom_time = $('.progress_top .sing_time')
		
		let $bg = $('.mask-bg')
		
		$Img.attr("src", obj.cover)
		$sing.text(obj.name)
		$songer.text(obj.singer)
		$name.text(obj.album)
		
		$bottom_sing.text(obj.name + '/' + obj.singer)
		$bottom_time.text('00:00 / ' + obj.time)
		
		$bg.css({
			background: 'url(' + obj.cover + ')',
			'z-index': -3
		})
	}
})