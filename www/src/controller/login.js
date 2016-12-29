_vp.login = function(){
	var _this = $('#login');
	//提交表单
    _vp.formVerify('.vp_form', function(data){
        _vp.layerHint('提示！', '表单参数：'+ JSON.stringify(data));
    });
    
    /* 上拉下拉 */
    _vp.pullDown('login', function(){ 
        var def = $.Deferred();

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
            def.resolve(  );
        },1000);

        return def.promise();
    }, function(){ 
        var def = $.Deferred();

        setTimeout(function(){
            def.resolve(  );
        },1000)

        return def.promise();
    })
}();
