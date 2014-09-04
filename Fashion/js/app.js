	
	// 节点
	var elSwiperContainer = $('#swiper-container');
	var elThumbSwiperContainer = $('[data-role="thumb-swiper-container"]');
	// 选项
	var OPTION = {
		inner_widht : 320,
		inner_height : 460,
		duration : 600
	};

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
			'height' : (innerWidth/4 - 10) + 'px',
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
			$('.swiper-container').css('visibility', 'visible');
		},
		// slide动画执行完毕
		// 设置浮动标签位置
		onSlideChangeEnd : function(swiper, dir) {
			var curIndex = swiper.activeIndex;
			var elLeftTag = $(swiper.visibleSlides[0]).find('[data-role="left-tag"]');
			var elRightTag = $(swiper.visibleSlides[0]).find('[data-role="right-tag"]');

			var deltaX = 0;
			var deltaY = 0;
			if(window.innerWidth > OPTION.inner_widht) {
				deltaX = ((window.innerWidth - OPTION.inner_widht)/2);
			}
			if(window.innerHeight > OPTION.inner_height) {
				deltaY = ((window.innerHeight - OPTION.inner_height)/2);
			}
			// console.log('deltaX', deltaX, 'deltaY', deltaY);

			// 浮动tag
			var elFloatTag = $(swiper.visibleSlides[0]).find('[data-role="float-tag"]');
			var tagIndex = 1;
			if(elFloatTag.length) {
				// 第一个标签立即定位
				if($(elFloatTag[0]).attr('data-type') === 'right') {
					$(elFloatTag[0]).css({
						'right': $(elFloatTag[0]).attr('data-pos-x') + 'px',
						'top': $(elFloatTag[0]).attr('data-pos-y') + 'px'
					});
				}else {
					$(elFloatTag[0]).css({
						'left': $(elFloatTag[0]).attr('data-pos-x') + 'px',
						'top': $(elFloatTag[0]).attr('data-pos-y') + 'px'
					});
				}
				// 从第二个标签开始，延迟定位
				var tagInterval = setInterval(function(){
					if($(elFloatTag[tagIndex]).attr('data-type') === 'right') {
						$(elFloatTag[tagIndex]).css({
							'right': $(elFloatTag[tagIndex]).attr('data-pos-x') + 'px',
							'top': $(elFloatTag[tagIndex]).attr('data-pos-y') + 'px'
						});
					}else {
						$(elFloatTag[tagIndex]).css({
							'left': $(elFloatTag[tagIndex]).attr('data-pos-x') + 'px',
							'top': $(elFloatTag[tagIndex]).attr('data-pos-y') + 'px'
						});
					}
					tagIndex++;
					if(tagIndex >= elFloatTag.length) {
						clearInterval(tagInterval);
						tagInterval = null;
					}
				}, OPTION.duration);
			}

			// // 左侧tag
			// if(elLeftTag.length) {
			// 	$(elLeftTag[0]).css({
			// 		'left': $(elLeftTag[0]).attr('data-pos-x') + 'px',
			// 		'top': $(elLeftTag[0]).attr('data-pos-y') + 'px'
			// 	});
			// 	var indexL = 1;
			// 	var intervalL = setInterval(function(){
			// 		$(elLeftTag[indexL]).css({
			// 			'left': $(elLeftTag[indexL]).attr('data-pos-x') + 'px',
			// 			'top': $(elLeftTag[indexL]).attr('data-pos-y') + 'px'
			// 		});
			// 		indexL++;
			// 		if(indexL >= elLeftTag.length) {
			// 			clearInterval(intervalL);
			// 			intervalL = null;
			// 		}
			// 	}, OPTION.duration);
			// }
			// // 右侧tag
			// if(elRightTag.length) {
			// 	$(elRightTag[0]).css({
			// 		'right': $(elRightTag[0]).attr('data-pos-x') + 'px',
			// 		'top': $(elRightTag[0]).attr('data-pos-y') + 'px'
			// 	});
			// 	var indexR = 1;
			// 	var intervalR = setInterval(function(){
			// 		$(elRightTag[indexR]).css({
			// 			'right': $(elRightTag[indexR]).attr('data-pos-x') + 'px',
			// 			'top': $(elRightTag[indexR]).attr('data-pos-y') + 'px'
			// 		});
			// 		indexR++;
			// 		if(indexR >= elRightTag.length) {
			// 			clearInterval(intervalR);
			// 			intervalR = null;
			// 		}
			// 	}, OPTION.duration);
			// }
		},
		// slide动画开始执行时
		// 移除浮动标签到屏幕外
		onSlideChangeStart : function(swiper, dir){
			var curIndex = swiper.activeIndex;
			
			var elPrevBox = $(elSwiperContainer.find('[data-role="slide-box"]')[curIndex-1]);
			var elNextBox = $(elSwiperContainer.find('[data-role="slide-box"]')[curIndex+1]);

			if(elPrevBox.length) {
				elPrevBox.find('[data-role="float-tag"][data-type="left"]').css('left', '');
				elPrevBox.find('[data-role="float-tag"][data-type="right"]').css('right', '');
			}
			if(elNextBox.length) {
				elNextBox.find('[data-role="float-tag"][data-type="left"]').css('left', '');
				elNextBox.find('[data-role="float-tag"][data-type="right"]').css('right', '');
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
		
		elFullMask.show();
		elFullImgBox.show();
	}
	// 缩略图点击查看大图
	elThumbSwiperContainer.find('[data-role="thumb-img"]').on('click', function(){
		var self = $(this);
		var imgUrl = self.attr('data-img');
		
		checkFullImgStyle();

		elFullImgBox.find('img').attr('src', imgUrl);
		elFullImgBox.find('img').on('load', function(){
			elFullImgBox.css('background-image', 'none');
			checkFullImgStyle();
		});
	});
	// 关闭大图
	elFullImgBox.find('.close').on('click', function(){
		elFullImgBox.hide();
		elFullMask.hide();
	});
