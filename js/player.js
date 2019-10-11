(function(window){
	function Player($audio){
		return new Player.prototype.init($audio)
	}
		Player.prototype = {
			constructor: Player,
			musicList: [],
			init: function($audio) {
				this.$audio = $audio
				this.audio = $audio.get(0)
			},
			currentIndex: -1,
			playMusic(index, music) {//歌曲信息和列表信息
				//是否为当前歌曲
				if(this.currentIndex == index) {
					if(this.audio.paused){
						this.audio.play()
					}else {
						this.audio.pause()
					}
				}else {
					this.currentIndex = index
					this.$audio.attr({
						src: music.link_url
					})
					this.audio.play()
				}
			},
			preIndex: function() {
				var index = this.currentIndex - 1
				if(index < 0){
					index = this.musicList.length - 1
				}
				return index
			},
			nextIndex: function() {
				var index = this.currentIndex + 1
				// console.log(index)
				if(index > this.musicList.length - 1){
					index = 0
				}
				return index
			},
			del:function(index) {
				this.musicList.splice(index, 1)
				// console.log(this.musicList,index)
				if(index < this.currentIndex) {
					this.currentIndex = this.currentIndex - 1
				}
			},
			// getMusicDuration() {
			// 	// if(!isNaN(this.audio.duration)) return this.audio.duration
			// 	return this.audio.duration
			// },
			// getMusicCurrent() {
			// 	// if(this.audio.played)
			// 	return this.audio.currentTime
			// },
			formDate(duration, currentTime) {
				if(isNaN(duration)) return;
				// console.log(duration, currentTime)
				let start_time = duration
				let start_min = parseInt(duration/60)
				let start_ms = parseInt(duration%60)
				if(start_min < 10) {
					start_min = '0' + start_min
				}
				if(start_ms < 10) {
					start_ms = '0' + start_ms
				}
				
				let end_time = currentTime
				let end_min = parseInt(currentTime/60)
				let end_ms =parseInt(currentTime%60)
				if(end_min < 10) {
					end_min = '0' + end_min
				}else {
					end_min = end_min
				}
				if(end_ms < 10) {
					end_ms = '0' + end_ms
				}else {
					end_ms = end_ms
				}
				return   end_min + ':' + end_ms + ' / ' + start_min + ':' + start_ms
			},
			getBili(duration, currentTime){
				let parence = currentTime / duration * 100
				// console.log(parence)
				return parence
			},
			musicTo: function(value) {
				this.audio.currentTime = this.audio.duration * value
			},
			musicControl:function(value){
				console.log(value)
				this.audio.volume = value
			}
			
		}
		Player.prototype.init.prototype = Player.prototype 
		window.Player = Player
})(window)