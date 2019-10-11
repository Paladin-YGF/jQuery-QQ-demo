
(function(window){
	function Lyic(path){
		return new Lyic.prototype.init(path)
	}
		Lyic.prototype = {
			constructor: Player,
			init: function(path) {
				this.path = path
				
			},
			MusicTime:[],
			MusicInfo:[],
			ajaxMusic: function(callback) {
				let $this = this
				$.ajax({
					url: $this.path,
					type: 'get',
					dataType: 'text',
					success: function(data) {
						// console.log(data)
						$this.parseData(data)
						callback()
					},
					error: function(err) {
						
					}
				})
			},
			parseData(data) {
				let $this = this
				let dataList = data.split('\n')
				// let reg = /\[(\d+:\d+\.\d+)\]/
				console.log(data)
				$this.MusicTime = []
				$this.MusicInfo = []
				$.each(dataList, function(index, ele) {
					let eleItem = ele.split(']')
					if(eleItem[1].length == 1 )	return true
					// console.log(eleItem[1].length,eleItem[1])
					$this.MusicInfo.push(eleItem[1])
					
					let result = eleItem[0].slice(1)
					let  min = parseInt(result.split(':')[0]) * 60
					let  ms = parseFloat(result.split(':')[1])
					let result2 = parseFloat((min + ms).toFixed(2))
					console.log(result2)
					$this.MusicTime.push(result2)
					// let min = parseInt(result[0]) * 60
					// let ms = parseFloat(result[1])
					// let result2 = parseFloat((min + ms).toFixed(2))
					// //toFixed  ---> 转化为  string
					// $this.MusicTime.push(result2)
					
					
					
					// console.log(eleItem)
					
				})
				console.log($this.MusicTime, $this.MusicInfo)
			},
			index: -1,
			currentIndex: function(currentTime) {
				if(currentTime >= this.MusicTime[0]){
					console.log(currentTime,this.MusicTime[0])
					this.index ++;
					this.MusicTime.shift()
				}
				// console.log(currentTime)
				return this.index
			}
		}
		Lyic.prototype.init.prototype = Lyic.prototype 
		window.Lyic = Lyic
})(window)