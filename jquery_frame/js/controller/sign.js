_vp.sign = function(){
	//提交表单
    _vp.formVerify('.vp_form', function(data){
        console.log(data);
        _vp.layerHint('提示！', '表单参数：'+ JSON.stringify(data));
    })
}
_vp.sign();