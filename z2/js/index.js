(function() {
    //顶部导航条
    var topList = $('.top-list');
    topList.on('click vclick','li',function(e){
        e.preventDefault();
        $(this).addClass('li-curr').siblings().removeClass('li-curr');
    })

    //进度条
    var num = Math.random() * (30 - 13) + 13;
    var rect = $('.rect');
    var left = (num - 13) / 18 * 100 - 1 + '%';
    if (num < 19) {
        rect.attr('src', 'imgs/blue.png');
    } else if (num > 25) {
        rect.attr('src', 'imgs/orange.png');
    } else {
        rect.attr('src', 'imgs/rect.png');
    }
    rect.css('left', left);
})();
