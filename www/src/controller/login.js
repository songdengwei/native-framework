_vp.login = function(){
	var _this = $('#login');
	//提交表单
    _vp.formVerify('.vp_form', function(data){
        _vp.layerHint('提示！', '表单参数：'+ JSON.stringify(data));
    });


    /* 上拉加载、下拉刷新 */
    var isLoad = true;
    /* 每个页面对应的滚动的名字都一定好了都是_vp.[name]Scroll   name就是页面的名字*/
    _vp.loginScroll.on('scroll', function(){
        if(isLoad){
        	if(parseInt(this.y) < parseInt(this.maxScrollY)+50){
                isLoad = false;
                _vp.loadIon.loadShow('#login');
                this.refresh();
                this.scrollTo(0, this.maxScrollY);
                loadText();
        	}else if(parseInt(this.y) > 10){
                isLoad = false;
                _vp.loadIon.refreshShow('#login');
                this.refresh()
                this.scrollTo(0, 0);
                loadRefresh();
            }
        }
    })
    /* 上拉加载请求数据 */
    function loadText(){
        setTimeout(function(){
            $('.modScroll',_this).append('<form action="" class="vp_form">\
                <div class="vp_form_line">\
                    <label for="">用户名：</label><input type="text" name="name" class="vp_form_text fm_test_empty" placeholder="请填写用户名" />\
                </div>\
                <div class="vp_form_line">\
                    <label for="">密码：</label><input type="text" name="tel" class="vp_form_text fm_test_tele" placeholder="请输入手机号"/>\
                </div>\
                <input type="submit" class="vp_form_submit" value="提交" />\
            </form><form action="" class="vp_form">\
                <div class="vp_form_line">\
                    <label for="">用户名：</label><input type="text" name="name" class="vp_form_text fm_test_empty" placeholder="请填写用户名" />\
                </div>\
                <div class="vp_form_line">\
                    <label for="">密码：</label><input type="text" name="tel" class="vp_form_text fm_test_tele" placeholder="请输入手机号"/>\
                </div>\
                <input type="submit" class="vp_form_submit" value="提交" />\
            </form>');

            _vp.loadIon.hide('#login');     //去掉加载动画
            _vp.loginScroll.refresh();      //刷新滚动
            isLoad = true;                  //打开加载开关
        },1000)

    }
    /* 下拉刷新 */
    function loadRefresh(){
        setTimeout(function(){
            _vp.loadIon.hide('#login');     //去掉加载动画
            _vp.loginScroll.refresh();      //刷新滚动
            isLoad = true;                  //打开加载开关
        }, 1000)
    }
}();
