//shah方法
;(function($){if(!$.hash){$.hash=function(name,value){function isString(obj){return typeof obj=="string"||Object.prototype.toString.call(obj)==="[object String]"}if(!isString(name)||name==""){return}name=encodeURIComponent(name);var clearReg=new RegExp("(;"+name+"=[^;]*)|(\\b"+name+"=[^;]*;)|(\\b"+name+"=[^;]*)","ig");var getReg=new RegExp(";*\\b"+name+"=[^;]*","i");if(typeof value=="undefined"){var result=location.hash.match(getReg);return result?decodeURIComponent($.trim(result[0].split("=")[1])):null}else if(value===null){location.hash=location.hash.replace(clearReg,"")}else{value=value+"";var temp=location.hash.replace(clearReg,"");temp+=";"+name+"="+encodeURIComponent(value);location.hash=temp}}}})(jQuery);

//动态加载script
window.loadScript = function (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}
