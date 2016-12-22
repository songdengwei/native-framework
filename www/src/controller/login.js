_vp.log = function(){
	var _this = $('#login');
	//提交表单
    _vp.formVerify('.vp_form', function(data){
        _vp.layerHint('提示！', '表单参数：'+ JSON.stringify(data));
    })
}();
