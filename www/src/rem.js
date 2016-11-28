;(function () {
    /**
     * 7.5=设计稿尺寸/100
     * css元素尺寸=设计稿元素尺寸/100;
     */
    var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate() {
        var deviceWidth = document.documentElement.clientWidth;
        console.log(deviceWidth);
        if (deviceWidth < 320) {
            deviceWidth = 320;
        } else if (deviceWidth > 750) {
            deviceWidth = 750;
        }
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    };
    window.addEventListener(change, calculate, false);
    calculate();
})();