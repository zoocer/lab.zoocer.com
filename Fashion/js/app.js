	
	// 节点
	var elSwiperContainer = $('#swiper-container');
	var elThumbSwiperContainer = $('[data-role="thumb-swiper-container"]');
	
	// 检查样式
	function checkStyle(){
		var innerHeight = window.innerHeight;
		var innerWidth = window.innerWidth;
		var elBackImgBox = elSwiperContainer.find('.back-img');

		// 主页面部分
		elSwiperContainer.css({
			'height' : innerHeight + 'px'
		});
		// 背景图片
		for(var i=0; i<elBackImgBox.length; i++) {
			$(elBackImgBox[i]).css({
				'line-height' : innerHeight + 'px',
				'background' : 'url('+ $(elBackImgBox[i]).attr('data-img') +') no-repeat center 0 transparent',
				'width' : '100%',
				'height' : '100%',
				'background-size' : 'cover'
			});
		}

		// 缩略图部分
		elThumbSwiperContainer.css({
			'width' : innerWidth + 'px',
			'height' : '55px',
			'position' : 'absolute',
			'bottom' : '10px'
		});
		
	}

	checkStyle();

	// 初始化页面swiper
	var mainSwiper = elSwiperContainer.swiper({
		mode : 'vertical',
		loop : false,
		// 全部初始化完毕
		onInit : function(swiper) {
			console.log('onInit', swiper);
		},
		// slide动画执行完毕
		// 设置浮动标签位置
		onSlideChangeEnd : function(swiper, dir) {
			var curIndex = swiper.activeIndex;
			var elLeftTag = $(swiper.visibleSlides[0]).find('[data-role="left-tag"]');
			var elRightTag = $(swiper.visibleSlides[0]).find('[data-role="right-tag"]');

			if(elLeftTag.length) {
				for(var i=0; i<elLeftTag.length; i++) {
					$(elLeftTag[i]).css({
						'left': $(elLeftTag[i]).attr('data-pos') + 'px'
					});
				}
			}
			if(elRightTag.length) {
				for(var j=0; j<elRightTag.length; j++) {
					$(elRightTag[j]).css({
						'right': $(elRightTag[j]).attr('data-pos') + 'px'
					});
				}
			}
		},
		// slide动画开始执行时
		// 移除浮动标签到屏幕外
		onSlideChangeStart : function(swiper, dir){
			var curIndex = swiper.activeIndex;
			
			var elPrevBox = $(elSwiperContainer.find('[data-role="slide-box"]')[curIndex-1]);
			var elNextBox = $(elSwiperContainer.find('[data-role="slide-box"]')[curIndex+1]);

			if(elPrevBox.length) {
				elPrevBox.find('[data-role="left-tag"]').css('left', '');
				elPrevBox.find('[data-role="right-tag"]').css('right', '');
			}
			if(elNextBox.length) {
				elNextBox.find('[data-role="left-tag"]').css('left', '');
				elNextBox.find('[data-role="right-tag"]').css('right', '');
			}
		}
	});

	// 初始化缩略图swiper
	var thumbSwiper = elThumbSwiperContainer.swiper({
		mode : 'horizontal',
		loop : false,
		slidesPerView : 4
	});

	var elFullMask = $('.full-mask');
	var elFullImgBox = $('.full-img');
	// 设置全屏大图定位
	function checkFullImgStyle() {
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight;
		var fullImgHeight = elFullImgBox.height();
		var fullImgWidth = elFullImgBox.width();

		elFullImgBox.css({
			'top' : (innerHeight/2) - (fullImgHeight/2) + 'px',
			'left' : (innerWidth/2) - (fullImgWidth/2) + 'px'
		});
		console.log('checkFullImgStyle', innerWidth, fullImgWidth);
		elFullMask.show();
		elFullImgBox.show();
	}
	// 缩略图点击查看大图
	elThumbSwiperContainer.find('[data-role="thumb-img"]').on('click', function(){
		var self = $(this);
		var imgUrl = self.attr('data-img');
		
		checkFullImgStyle();
		// elFullImgBox.css({
		// 	'background-image' : 'url('+ imgUrl +')'
		// });

		elFullImgBox.find('img').attr('src', imgUrl);
		elFullImgBox.find('img').on('load', function(){
			console.log(elFullImgBox.width());
			elFullImgBox.css('background-image', 'none');
			checkFullImgStyle();
		});
	});
	// 关闭大图
	elFullImgBox.find('.close').on('click', function(){
		elFullImgBox.hide();
		elFullMask.hide();
	});
