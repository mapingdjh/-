var ROOTDM = [".haiwainet.cn", ".0898.net", ".cpcnews.cn", ".linliwang.com", ".npopss-cn.gov.cn", ".osports.com.cn", ".people.cn", ".people.com.cn", ".people.gkcx.eol.cn", ".people.nihaowang.com", ".peopledaily.com.cn", ".urbanchina.org", ".zgdsw.org.cn", ".zhengwutong.com", ".zzdjw.org.cn", ".cpta.com.cn", ".chinawriter.com.cn", ".djyj.cn", ".nanhaimuseum.org", ".womenvoice.cn", ".womencn.cn", ".12380.gov.cn", ".sxdaily.com.cn"]
  , RECENDM = []
  , INCLUDESUBHOST = ["www.people.com.cn"]
  , SHOWERRHOST = 1
  , _wdUID = "15"
  , _wecl = "//cl0.webterren.com/1.gif"
  , _wevcl = "//cl0.webterren.com/2.gif";
function _wd_require(ss, f) {
    if (ss.length == 0) {
        if (typeof f == 'function')
            f();
        return;
    }
    function n() {
        _wd_require(ss, f);
    }
    var s = ss.splice(0, 1);
    var t = document.createElement("script");
    t.type = "text/javascript";
    function g() {
        if (t.readyState == "loaded" || t.readyState == "complete") {
            t.onreadystatechange = null;
            n();
        }
    }
    if (t.readyState) {
        t.onreadystatechange = g;
    } else {
        t.onload = n;
    }
    t.src = s;
    document.getElementsByTagName("head")[0].appendChild(t);
}
var _wd_ss = ['common.js'];
if (window['_wd_o']) {
    _wd_require(_wd_ss);
} else {
    window['wd_paramtracker'] = function() {
        var a = arguments[0];
        _wd_require(_wd_ss, function() {
            _wd_paramtracker(a);
        })
    }
}
