(function(){
	//顶部导航条
	$('.top-list li').on('click',function(){
		var index = $(this).index();
		var width = $(this).width();
		$(this).parent().css({
			'position': 'relative',
			'left': -index*width
		}).end().addClass('li-curr').siblings('li').removeClass('li-curr');
		if(index == 0){
			$('.top-list li:nth-child(4)').css('opacity','.2');
			$('.top-list li:nth-child(3)').css('opacity','.6');
			$('.top-list li:nth-child(2)').css('opacity','1');
		}
		if(index == 1){
			$('.top-list li:nth-child(4)').css('opacity','.6');
			$('.top-list li:nth-child(3)').css('opacity','1');
			$('.top-list li:first-child').css('opacity','1');
		}
		if(index == 2){
			$('.top-list li:first-child').css('opacity','.6');
			$('.top-list li:nth-child(2)').css('opacity','1');
			$('.top-list li:nth-child(4)').css('opacity','1');
		}
		if(index == 3){
			$('.top-list li:first-child').css('opacity','.2');
			$('.top-list li:nth-child(2)').css('opacity','.6');
			$('.top-list li:nth-child(3)').css('opacity','1');
		}
	}); 
	//进度条
	var num = Math.random()*(30-13+1)+13;
	// var num =13;
	// console.log(num);
	var rect = $('.rect');
	var left = (num-13)/18*100-1+'%';
	if(num < 19){
		rect.attr('src','imgs/blue.png');
	}else if(num > 25){
		rect.attr('src','imgs/orange.png');
	}else{
		rect.attr('src','imgs/rect.png');
	}
	rect.css('left', left);
})();