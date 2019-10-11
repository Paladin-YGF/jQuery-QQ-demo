(function(window){
	function Progress($progress,$progress_line,$progress_bar){
		return new Progress.prototype.init($progress,$progress_line,$progress_bar)
	}
	Progress.prototype = {
		constructor: Progress,
		init: function($progress,$progress_line,$progress_bar) {
			this.$progress = $progress
			this.$progress_line = $progress_line
			this.$progress_bar = $progress_bar
		},
		isMove: false,
		progressClick: function(callback) {
			// console.log(this.$progress)
			let start_left = this.$progress.offset().left
			
			this.$progress.click((event) => {//event指click事件点击源对象
				// console.log(event)
		
				let clcik_left = event.pageX
						console.log(start_left == clcik_left)
				this.$progress_line.css({
					'width': clcik_left - start_left
				})
				this.$progress_bar.css({
					'left': clcik_left - start_left - this.$progress_bar.width()/2
				})
				// console.log(clcik_left - start_left)
				let value = (clcik_left - start_left) / this.$progress.width()
				console.log(value)
				callback(value)
			})
		},
		progressMove: function(callback) {
			
			let start_left = this.$progress.offset().left
			let eventLeft,left
			this.$progress_bar.mousedown((event) => {
				$(document).mousemove((event) => {
					this.isMove = true
					eventLeft = event.pageX
				    left = eventLeft - start_left
					if(left < 0){
						 left= 0
					}
					if(left > this.$progress.width()){
						left = this.$progress.width()
					}
					this.$progress_line.css({
						'width': left 
					})
					this.$progress_bar.css({
						'left': left - this.$progress_bar.width()/2
					})
				})
				$(document).mouseup(()=> {
					$(document).off('mousemove')
					this.isMove = false
					let value = (eventLeft - start_left) / this.$progress.width()
					console.log(this.$progress.width())
					callback(value)
				})
			})
		},
		setProgress: function (value) {
			// console.log(this.isMove)
		    if(this.isMove) return;
		    if(value < 0 || value > 100 || isNaN(value)) return;
			// console.log(value)
		    this.$progress_line.css({
		        width: value+"%"
		    });
		    this.$progress_bar.css({
		        left: value * 6.7 
		    });
		}
	}
	Progress.prototype.init.prototype = Progress.prototype
	window.Progress = Progress
})(window)