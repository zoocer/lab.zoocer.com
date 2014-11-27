/**
 * @fileoverview 业务逻辑
 * @authors yifei (yifei@zoocer.com)
 */

var elMainSwiperContainer = $('#main-swiper-container');

// 检查初始化样式
function checkStyle() {
	var innerHeight = window.innerHeight;
	elMainSwiperContainer.css({
		height: innerHeight
	});
}

checkStyle();

// 初始化swiper
var mainSwiper = $('#main-swiper-container').swiper({
	mode: 'vertical',
	loop: false,
	// 初始化
	onFirstInit: function(swiper){
		// 初始化完成后显示主界面
		elMainSwiperContainer.css('visibility', 'visible');

		// 第一页添加动画样式
		var node = $($('[data-role="page-wrap"]')[0]);
		node.addClass('ani-box');
	},
	// 切换动画开始
	onSlideChangeStart: function(swiper, direction){
		// 在当前页，添加动画样式
		var curIndex = mainSwiper.activeIndex;
		var node = $($('[data-role="page-wrap"]')[curIndex]);
		node.addClass('ani-box');
	},
	// 切换动画结束
	onSlideChangeEnd: function(swiper, direction){
		// 除当前页，其他页面去除动画样式
		var curIndex = mainSwiper.activeIndex;
		var node = $('[data-role="page-wrap"]');
		for(var i=0;i<node.length;i++) {
			if(i !== curIndex) {
				$(node[i]).removeClass('ani-box');
			}
		}
	}
});