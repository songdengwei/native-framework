//鼠标事件兼容
var vpEvents = ('ontouchstart' in window) ? {start: 'touchstart', move: 'touchmove', end: 'touchend'} : {start: 'click', move: 'mousemove', end: 'mouseup'};

//命名空间
var _vp = _vp || {};

//版本号
_vp.v = '?v=1.0' || '';

//工具方法

/* 
 *  css命名前缀 
 *  @param { $obj, key, val }
 *  $obj ：jquery对象
 *  key ：css样式名如（ transform ）
 *  val ：css样式值如（ translate3d ）
*/
_vp.uaCssMark = ['webkit', 'moz', 'ms'];
_vp.uaCss = function( $obj, key, val ){
  for(var i = 0; i < _vp.uaCssMark.length; i++){
    $obj.css( '-' + _vp.uaCssMark[i] + '-' + key, val);
  }
  $obj.css(key, val);
};

/* 
 *  背景音乐 
 *  @param { btn, media }
 *  btn : string 按钮
 *  media ：string audio标签的id
*/
_vp.bgMp3 = function ( btn, media ) {
    //背景音乐
    var btn = $(btn),
        oMedia = $(media)[0];
    btn.on(vpEvents.start, function (e) {
        if (oMedia.paused) {
            oMedia.play();
        } else {
            oMedia.pause();
        }
        e.preventDefault();
    });
    oMedia.load();
    oMedia.play();
    if (oMedia.paused) {
        $('.wrapper').one(vpEvents.start, function (e) {
            oMedia.play();
            e.preventDefault();
        });
    };
    $(oMedia).on('play', function () {
        btn.addClass('musicPlay');
    });
    $(oMedia).on('pause', function () {
        btn.removeClass('musicPlay');
    });
};

//防止post重复呼叫
_vp.postCount = {};

//ip管理
_vp.backendUrl = {
    ip:"http://172.16.45.4"
};

//地址管理
_vp.backend = [
    {
        service:'promotion',
        port: 10180,
        names:[
            'user/log', 'user/sign'
        ]
    }
];

/* 
 *  从backend里面判断接口名在哪一个对象里面 
 *  name ：string 接口名（带父级如''user/log'）
 *
*/
function getBackendDetail( name ) {
    var backendDetail = {};
    for(var i = 0; i < _vp.backend.length; i++){
        if( _vp.backend[i].names.indexOf( name ) >= 0 ) {
            backendDetail = _vp.backend[i];
        }
    }
    return backendDetail;
}

/* 
 *  post请求方法 
 *  @param { ctrl, name, param } 层对象
 *  ctrl : string 接口名上一层
 *  name ：string 接口名
 *  param : object 请求参数
 *
*/
_vp.post = function( ctrl, name, param ){
    var def = $.Deferred(),
        ctrlAndName = ctrl == "" ? name : (ctrl + '/' + name),
        backendDetail = getBackendDetail(ctrlAndName),
        serviceData = param || {};
    //防止post重复呼叫
    if(_vp.postCount[ctrlAndName]){
        def.reject();
    }else{
        //表示该接口正在调用
        _vp.postCount[ctrlAndName] = 'posting';

        $.ajax({
            url: _vp.backendUrl.ip  + ':' + backendDetail.port + '/' + backendDetail.service + '/' + ctrlAndName,
            data:JSON.stringify( serviceData ),
            type:'post',
            dataType:"json",
            success:function( data ){
                _vp.postCount[ctrlAndName] = undefined;
                if(data.ResultCode == 1000){
                    def.resolve(data);
                }else{
                    _vp.layerHint( '温馨提示', data.Message, true );
                }
                def.resolve( data );
            },
            error:function( err ){
                _vp.postCount[ctrlAndName] = undefined;
                 _vp.layerHint( '温馨提示', err.Message, true );
                def.reject( err );
            }
        });
    }
    return def.promise();
}

/* 
 *  弹层提示 
 *  @param { tit, txt, hide } 层对象
 *  tit : string 提示层标题
 *  txt ：string 提示层内容
 *  hide ：true | false 提示层是否自动关闭（关闭时间自行设置）
 *
*/
_vp.layerHint = function( tit, txt, hide ){
    var html = '<div id="layerHint" class="layerHint tran_layer">\
        <div class="layer_cont">\
            <h4>'+ tit +'</h4>\
            <p>'+ txt +'</p>\
            <span class="layer_colse">确 定</span>\
        </div>\
    </div>';
    $('body').append(html);

    if(hide){
        $('#layerHint').moveIn({
            complete : function(){
                setTimeout(function(){
                    $('#layerHint').moveOut({
                         complete : function(){
                                $('#layerHint').remove();
                            }
                    });
                }, 1000)
            }
        });
    }else{
        $('#layerHint').moveIn();
    }

    $('#layerHint .layer_colse').on( vpEvents.start, function(ev){
        $(this).parents('#layerHint').moveOut({
            complete : function(){
                $('#layerHint').remove();
            }
        });
        ev.preventDefault()
    })
}
/* 
 *  加载层 
 *  show : function 显示加载
 *  hide ：function 移除加载
 *
*/
_vp.loading = {
    html : '<div id="loading" style="display:block" class="layerHint loading_layer">\
        <div class="layer_cont">\
            <img src="img/oval.svg" alt="" />\
        </div>\
    </div>',
    show : function(){
        $('body').append(this.html);
    },
    hide : function(){
        $('#loading').remove();
    }
}

//jquery扩展
//显示隐藏
;(function ($) {
    $.fn.moveIn = function (options) {
        var defaults = {
            classIn: 'moveIn',
            classOut: 'moveOut',
            complete: function () { }
            // CALLBACKS
        };
        var options = $.extend(defaults, options);
        this.show().addClass(options.classIn);
        this.one('webkitAnimationEnd', function () {
            $(this).removeClass(options.classIn);
            options.complete();
        });
        return this;
    }
    $.fn.moveOut = function (options) {
        var defaults = {
            classIn: 'moveIn',
            classOut: 'moveOut',
            complete: function () { }
            // CALLBACKS
        };
        var options = $.extend(defaults, options);

        this.show().addClass(options.classOut);
        this.one('webkitAnimationEnd', function () {
            $(this).removeClass(options.classOut).hide();
            options.complete();
        });
        return this;
    }
    $.fn.btnHover = function () {
        this.on(vpEvents.start, function (e) {
            $(this).addClass('on');
            e.preventDefault();
        });
        this.on(vpEvents.end, function (e) {
            $(this).removeClass('on');
            e.preventDefault();
        });
    }
})(jQuery);

//……
//公共方法

//哈希值跳转缓存
_vp.loadName = {
    names : [  ]
};
//加载视图
_vp.tabsView = function(parent, name, vessel){
    if( _vp.loadName.names.indexOf( name ) >= 0 ) {  
        _vp.moveView(parent, name)      //移动视图
    }else{
        if(name){
            _vp.loading.show();
            vessel.load('../template/' + name + '.html', function(data,status){
                //没有找到对应的页面
                if(status == 'error'){
                    console.log('There is no corresponding page!');
                    _vp.loading.hide();
                    return false
                }
                //把页面添加到index
                parent.append(data);
                //加载对应的js文件
                loadScript('/js/controller/' + name + '.js' + _vp.v, {async : true}, function( ){
                    _vp.loadName.names.push(name);  //防止多重加载
                    _vp.loading.hide();             //关闭加载层
                    _vp.moveView(parent, name);     //移动视图
                })
            })
        }
    }
}
//视图动画
_vp.moveView = function(parent, name){
    var box = $('.modBox', parent),     //视图里面的每个模块
        title = $('#header h1');        //index里面的标题
    //遍历每个模块给对应的加上样式
    box.each(function(){
        if($(this).attr('id') === name){
            title.html($(this).attr('title'));
            $(this).addClass('activate');
        }else{
            $(this).removeClass('activate');
        }
    })
}
//监控制图
_vp.uiHash = function(){
    var parent = $('#view'),
        vessel = $('#cacheRegion'),
        name = $.hash('viewName') || null;
    //跳转
    $('[ui-sref]').on(vpEvents.start, function(){
        $.hash('viewName', $(this).attr('ui-sref'));
    })
    //加载自运行
    if(name){
        _vp.tabsView(parent, name, vessel);
    }
    //监控哈希值的改变
    window.onhashchange = function( ){
        name = $.hash('viewName') || null;
        _vp.tabsView(parent, name, vessel);
    };
}
_vp.uiHash();

/**
 *  表单验证
 *  @param { form ， fn } 层对象
 *  form ：string 获取表单
 *  fn ：提交表单后的回调
 */
_vp.formVerify = function( form, fn ){
    $(form).submit(function(){
        var _this = $(this),
            array = [],
            aVal = [],
            option = {};
        $('input', _this).focus(function(){
            var $item = $(this).parent();
            $item.removeClass('ui_fm_error');
        }).blur(function(){
            var $item = $(this).parent();
            if($(this).hasClass('fm_test_empty')){  //判断不能为空
                if($.trim($(this).val()) == ''){
                    fmTestError($item);
                }else{
                    fmTestSuccess($item);
                }
                fmAssign($(this));
            }else if($(this).hasClass('fm_test_tele')){  //判断电话（手机和座机）
                if(!$(this).val().match(/^1[3-9]\d{9}$/) && !$(this).val().match(/^(((\(0\d{2,3}\)){1}|(0\d{2,3}[- ]?){1})?([1-9]{1}[0-9]{2,7}(\-\d{3,4})?))$/)){
                    fmTestError($item);
                }else{
                    fmTestSuccess($item);
                }
                fmAssign($(this));
            }else if($(this).hasClass('fm_test_email')){ //判断邮箱
                if(!$(this).val().match(/^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/)){
                    fmTestError($item);
                }else{
                    fmTestSuccess($item);
                }
                fmAssign($(this));
            }else if($(this).hasClass('fm_test_value')){ //不判断
                fmAssign($(this));
            }else if($(this).hasClass('fm_test_check')){ //复选框
                fmCheck($(this));
            }
        })

        //下拉框不能为空
        $('.fm_test_select').each(function(i,d){
            var $item = $(this).parent();
            if($(d).find(":selected").val() == 0 || $(d).find(":selected").val() == ''){
                fmTestError($item);
            }else{
                fmTestSuccess($item);
            }
            fmAssign($(this));
        })

        //检验元素
        $('input , textarea , select', _this).focus().blur();
        if($('.ui_fm_error', this).length == 0){
            for(var i = 0; i < array.length; i++){
                option[array[i]] = aVal[i];
            }
            if(fn) fn(option);
        }

        //出现错误时的执行函数
        function fmTestError($obj){
            $obj.removeClass('ui_fm_error').addClass('ui_fm_error');
        }
        //验证通过时的执行函数
        function fmTestSuccess($obj){
            $obj.removeClass('ui_fm_error');
        }
        //创建json数据
        function fmAssign( obj ){
            var val = $(obj).val();
            array.push($(obj).attr('name'));
            aVal.push(val)
        }
        //创建json数据复选框
        function fmCheck( obj ){
            if($(obj).prop('checked') == true){
                array.push($(obj).attr('name'));
                aVal.push('true');
            }
        }
        return false
    })
}

/**
 *   设置层的自动居中定位，并且为 fixed
 *   @param { Object } 层对象
 */
_vp.setFixed = function( obj ){
    var style = obj.style,
        width = obj.offsetWidth,
        height = obj.offsetHeight;
    style.position = 'fixed';

    style.top = '50%';
    style.left = '50%';
    style.marginLeft = -parseInt( width / 2 ) + 'px';
    style.marginTop = -parseInt( height / 2 ) + 'px';
};

//页面方法
//首页
_vp.index = function( ){

}

//内页1
_vp.page1 = function( ){

}
