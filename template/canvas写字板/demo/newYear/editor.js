var $jscomp = {
    scope: {},
    checkStringArgs: function(f, g, m) {
        if (null == f)
            throw new TypeError("The 'this' value for String.prototype." + m + " must not be null or undefined");
        if (g instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + m + " must not be a regular expression");
        return f + ""
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, g, m) {
    if (m.get || m.set)
        throw new TypeError("ES3 does not support getters and setters.");
    f != Array.prototype && f != Object.prototype && (f[g] = m.value)
}
;
$jscomp.getGlobal = function(f) {
    return "undefined" != typeof window && window === f ? f : "undefined" != typeof global && null != global ? global : f
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(f, g, m, k) {
    if (g) {
        m = $jscomp.global;
        f = f.split(".");
        for (k = 0; k < f.length - 1; k++) {
            var t = f[k];
            t in m || (m[t] = {});
            m = m[t]
        }
        f = f[f.length - 1];
        k = m[f];
        g = g(k);
        g != k && null != g && $jscomp.defineProperty(m, f, {
            configurable: !0,
            writable: !0,
            value: g
        })
    }
}
;
$jscomp.polyfill("String.prototype.repeat", function(f) {
    return f ? f : function(g) {
        var f = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > g || 1342177279 < g)
            throw new RangeError("Invalid count value");
        g |= 0;
        for (var k = ""; g; )
            if (g & 1 && (k += f),
            g >>>= 1)
                f += f;
        return k
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.fill", function(f) {
    return f ? f : function(g, f, k) {
        var m = this.length || 0;
        0 > f && (f = Math.max(0, m + f));
        if (null == k || k > m)
            k = m;
        k = Number(k);
        0 > k && (k = Math.max(0, m + k));
        for (f = Number(f || 0); f < k; f++)
            this[f] = g;
        return this
    }
}, "es6-impl", "es3");
(function() {
    var f = document.createElement("canvas");
    f.width = f.height = 1;
    0 !== f.toDataURL("image/jpeg").indexOf("data:image/jpeg") && (f = document.createElement("script"),
    f.type = "text/javascript",
    f.src = "/microblog-v3/2015subject/0211_chunjie/cvsjpeg.js",
    document.body.insertBefore(f, document.body.firstChild))
})();
(function() {
    function f(b) {
        return document.getElementById(b)
    }
    function g(b, c) {
        return (c || document).querySelector(b)
    }
    function m(b) {
        return b.toString().replace(/(^\s+|\s+$)/g, "")
    }

    // 后退一步按钮置灰
    function k(b, c) {
        var d = b.className.replace(new RegExp("\\b" + c + "\\b","g"), "");
        b.className = d.replace(/ +/g, " ").replace(/(^ +| +$)/g, "") + " " + c
    }
    // 前进和后退一步按钮激活
    function t(b, c) {
        b.className = b.className.replace(new RegExp("\\b" + c + "\\b","g"), " ").replace(/ +/g, " ").replace(/(^ +| +$)/g, "")
    }
    function l(b) {
        b = (A + b).replace(/-+/g, "-").replace(/(^-|-$)/g, "").split("-");
        for (var c = 1; c < b.length; c++)
            b[c] = b[c].substr(0, 1).toLocaleUpperCase() + b[c].substr(1).toLowerCase();
        return b.join("")
    }
    function B() {
        function b() {
            "number" == typeof window.orientation && 0 !== window.orientation || "function" != typeof B || location.reload()
        }
        window.onorientationchange = b;
		//请旋转您的手机为竖立状态，在横屏界面下无法操作！
        "number" == typeof window.orientation && 0 !== window.orientation ? (alert("\u8bf7\u65cb\u8f6c\u60a8\u7684\u624b\u673a\u4e3a\u7ad6\u7acb\u72b6\u6001\uff0c\u5728\u6a2a\u5c4f\u754c\u9762\u4e0b\u65e0\u6cd5\u64cd\u4f5c\uff01"),
        b()) : (B = null,
        p.init())
    }
    function u(b) {
        f("promptLayer").style.display = "block";
        f("promptLayer").innerHTML = '<div class="txt">' + b + "</div>";
        g("#promptLayer .txt").style.width = document.documentElement.clientWidth + "px";
        g("#promptLayer .txt").style.height = document.documentElement.clientHeight + "px"
    }
    function r() {
        f("promptLayer").style.display = "none"
    }
    function w() {
        var b = this
          , c = document.body.clientWidth
          , d = c / 640;
        this.ele = document.createElement("div");
        this.ele.className = "canvasEdit";
        this.ele.innerHTML = '<div class="canvas"></div><div class="cvsBtn"><a class="btn_02 cvsEditBtn" href="javascript:void(0)">\u7f16\u8f91</a><a class="btn_02" href="javascript:void(0)">\u91cd\u64ad</a><a class="btn_02 cvsDelBtn" href="javascript:void(0)">\u5220\u9664</a></div>';
        var e = document.createElement("canvas");
        g(".canvas", this.ele).appendChild(e);
        e.width = 610 * d;
        e.height = 610 * d;
        this.paper = new C(e);
        this.paper.fontWidth = c;
        this.btnBox = g(".cvsBtn", this.ele);
        c = (this.btnBox || document).querySelectorAll("a");
        this.btn_edit = c[0];
        this.btn_replay = c[1];
        this.btn_del = c[2];
        this.btn_edit.onmousedown = function() {
            p.select(b.index)
        }
        ;
        this.btn_replay.onclick = function() {
            b.paper.replay()
        }
        ;
        this.btn_del.onclick = function() {
            b.del()
        }
        ;
        this.paper.onchange = function() {
            p.changeBtn()
        }
    }
    function C(b) {
        if (b.nodeType)
            this.canvas = b;
        else if ("string" == typeof b)
            this.canvas = g(b);
        else
            return;
        this.init();
        this.penmanship = [];
        this.repeatQueue = []
    }
    function D(b, c, d, e) {
        if (!d.bgImg.complete)
            return "";
        e = e || 610;
        b = b || "png";
        c = c || .7;
        var h = document.createElement("canvas");
        h.width = h.height = e;
        var f, g, l, m, k = d.canvas.width, q = d.canvas.height;
        if (1.8 < k / e)
            for (f = document.createElement("canvas"),
            g = document.createElement("canvas"),
            l = f.getContext("2d"),
            m = g.getContext("2d"),
            f.width = k,
            f.height = q,
            l.drawImage(d.canvas, 0, 0, k, q); 1.8 < k / e; )
                k = Math.round(.6 * k),
                q = Math.round(.6 * q),
                g.width = k,
                g.height = q,
                m.drawImage(f, 0, 0, k, q),
                f.width = k,
                f.height = q,
                l.drawImage(g, 0, 0, k, q);
        else
            f = d.canvas;
        g = h.getContext("2d");
        g.drawImage(d.bgImg, 0, 0, e, e);
        g.drawImage(d.bgCanvas, 0, 0, e, e);
        g.drawImage(f, 0, 0, e, e);
        return h.toDataURL("image/" + b, c)
    }
    var E = function(b, c, d, e) {
        var h = ""
          , f = "";
        null != d && (h = new Date((new Date).getTime() + 36E5 * d),
        h = "; expires=" + h.toGMTString());
        null != e && (f = ";domain=" + e);
        document.cookie = b + "=" + escape(c) + h + f
    }
      , H = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || !1
      , I = !!navigator.userAgent.match(/android/i);
    navigator.userAgent.indexOf("NetType/WIFI");
    var n = -1 !== navigator.userAgent.indexOf("Messenger");
    -1 !== navigator.userAgent.indexOf("QQ") && navigator.userAgent.indexOf("QQBrowser");
    var J = window.LANG || {};
    if (n && -1 === location.host.indexOf(".people."))
        location.href = "http://microblog.people.com.cn/h5/chunjie";
    else {
        var n = document.body.clientWidth
          , v = n / 640;
        document.documentElement.style.fontSize = 32 * v + "px";
        document.body.style.width = n + "px";
        g("#editorPage").style.minHeight = document.documentElement.clientHeight + "px";
        g("#classPage").style.minHeight = document.documentElement.clientHeight + "px";
        f("loading").style.display = "none";
        n = "";
        -1 !== navigator.userAgent.indexOf("WebKit") ? n = "webkit" : -1 !== navigator.userAgent.indexOf("Firefox") ? n = "moz" : -1 !== navigator.userAgent.indexOf("MSIE") && (n = "ms");
        var z = {
            moz: "animationend",
            webkit: "webkitAnimationEnd",
            ms: "MSAnimationEnd"
        }[n] || "animationend"
          , F = {
            moz: "transitionend",
            webkit: "webkitTransitionEnd",
            ms: "MSTransitionEnd"
        }[n] || "transitionend"
          , A = {
            moz: "",
            webkit: "-webkit-",
            ms: ""
        }[n] || ""
          , K = {
            status: "",
            init: function(b, c) {
                this.nowScen = g(b);
                this.ele = this.nowScen.parentNode;
                this.nowScen.childs = (this.nowScen || document).querySelectorAll("*[data-animationIn],*[data-animation],*[data-animationOut]");
                this.nowScen.style.minHeight = document.documentElement.clientHeight + "px";
                this.cssKey = "";
                c && c.length ? (this.status = "loading",
                this.preloadList = c,
                this.preload()) : !1 === c ? this.showLoading() : this.action(0)
            },
            showLoading: function() {
                this.loading = document.createElement("div");
                this.loading.className = "loadingPage";
                this.loading.innerHTML = '<div class="loadingTxt">\u8f7d\u5165\u4e2d...</div>';
                this.ele.appendChild(this.loading);
                this.loading.style.display = "block"
            },
            hideLoading: function() {
                "loading" == this.status && (this.loading.style.display = "none",
                this.action(0))
            },
            preload: function() {
                var b = this, c = 0, d;
                this.showLoading();
                setTimeout(function() {
                    b.hideLoading()
                }, 3E3);
                for (var e = 0; e < this.preloadList.length; e++)
                    d = new Image,
                    d.onerror = d.onload = function() {
                        c++;
                        c >= b.preloadList.length && b.hideLoading()
                    }
                    ,
                    d.src = this.preloadList[e]
            },
            readyScen: function() {
                var b = this.nowScen;
                aIn = b.getAttribute("data-animationIn");
                a = b.getAttribute("data-animation");
                aOut = b.getAttribute("data-animationOut");
                aIn && (aIn = aIn.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i)) && 3 <= aIn.length ? b.style.display = "none" : a && (a = a.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)))?/i)) && 3 <= a.length && (b.setAttribute("data-endClassName", b.getAttribute("data-endClassName") || b.className),
                b.className = b.getAttribute("data-endClassName") + " " + a[1],
                b.style[l("animation-duration")] = a[2],
                b.style[l("animation-fill-mode")] = "backwards",
                b.style[l("animation-play-state")] = "paused")
            },
            action: function() {
                this.readyScen();
                for (var b, c, d, e, h = 0; h < this.nowScen.childs.length; h++)
                    e = this.nowScen.childs[h],
                    b = e.getAttribute("data-animationIn"),
                    c = e.getAttribute("data-animation"),
                    d = e.getAttribute("data-animationOut"),
                    b && (b = b.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && 3 <= b.length ? this._actionIn(e) : c && (c = c.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i)) && 3 <= c.length ? this._action(e) : d && (d = d.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && 3 <= d.length && this._actionOut(e)
            },
            _actionIn: function(b) {
                var c = this
                  , d = b.getAttribute("data-animationIn").match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)
                  , e = function() {
                    this.removeEventListener(z, arguments.call, null);
                    this.getAttribute("data-endClassName") && (this.className = this.getAttribute("data-endClassName"));
                    this.removeAttribute("data-endClassName");
                    this._endFn = null;
                    delete this._endFn;
                    c._action(this)
                };
                b.addEventListener(z, e, null);
                b._endFn = e;
                b.style.display = "";
                b.setAttribute("data-endClassName", b.getAttribute("data-endClassName") || b.className);
                b.className = b.getAttribute("data-endClassName") + " " + d[1];
                b.style[l("animation-duration")] = d[2];
                b.style[l("animation-delay")] = d[3] || 0;
                b.style[l("animation-fill-mode")] = "both";
                b.style[l("animation-iteration-count")] = 1;
                b.style[l("animation-play-state")] = "running"
            },
            _action: function(b) {
                var c = this
                  , d = b.getAttribute("data-animation");
                if (d && (d = d.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?(?:\s(\d+|infinite))?/i)) && 3 <= d.length) {
                    var e = function() {
                        this.getAttribute("data-endClassName") && (this.className = this.getAttribute("data-endClassName"));
                        this.removeAttribute("data-endClassName");
                        this._endFn = null;
                        delete this._endFn;
                        c._actionOut(this)
                    };
                    b.addEventListener(z, e, null);
                    b._endFn = e;
                    b.style.display = "";
                    b.setAttribute("data-endClassName", b.getAttribute("data-endClassName") || b.className);
                    b.className = b.getAttribute("data-endClassName") + " " + d[1];
                    b.style[l("animation-duration")] = d[2];
                    b.style[l("animation-delay")] = d[3] || 0;
                    b.style[l("animation-fill-mode")] = "both";
                    b.style[l("animation-iteration-count")] = parseFloat(d[4]) ? d[4] : "infinite";
                    b.style[l("animation-play-state")] = "running"
                } else
                    b.getAttribute("data-animationOut") && this._actionOut(b)
            },
            _ele_animation_end_event_fn: function() {
                this._endFn = null;
                delete this._endFn
            },
            _actionOut: function(b) {
                var c = b.getAttribute("data-animationOut");
                c && (c = c.match(/([a-z]*)\s([\d\.]+(?:s|ms))(?:\s([\d\.]+(?:s|ms)?))?/i)) && 3 <= c.length && (b.addEventListener(z, this._ele_animation_end_event_fn, null),
                b._endFn = this._ele_animation_end_event_fn,
                b.style.display = "",
                b.setAttribute("data-endClassName", b.getAttribute("data-endClassName") || b.className),
                b.className = b.getAttribute("data-endClassName") + " " + c[1],
                b.style[l("animation-duration")] = c[2],
                b.style[l("animation-delay")] = c[3] || 0,
                b.style[l("animation-fill-mode")] = "forwards",
                b.style[l("animation-iteration-count")] = 1,
                b.style[l("animation-play-state")] = "running")
            }
        }
        

        // 页面DOM操作  
        , p = {
            type: "paper",
            classType: 1,
            username: "",
            wordList: [],
            word: null,
            imgUrl: "",
            imgId: "",
            color: "black",
            penSize: 8,
            index: 0,
            content: "",
            signTxt: J.c1 || "\u7fa4\u53d1\u4fe1\u606f\u6ca1\u8bda\u610f\uff0c\u624b\u5199\u795d\u798f\u663e\u771f\u60c5\u3002\u6765\u770b\u770b\u6211\u5bf9\u4f60\u8bf4\u4e86\u5565\u3002",
            signIsDeft: !0,
            pageIndex: 0,
            zfTxt: [{
                t: "\u606d\u559c\u53d1\u8d22",
                c: "\u795d\u4f60\u9e21\u5e74\u8d22\u6e90\u6eda\u6eda\uff0c\u53d1\u5f97\u50cf\u80a5\u732a;\u8eab\u4f53\u58ee\u5f97\u50cf\u72d7\u718a;\u7231\u60c5\u751c\u5f97\u50cf\u871c\u8702;\u597d\u8fd0\u591a\u5f97\u50cf\u725b\u6bdb;\u4e8b\u4e1a\u84b8\u84b8\u50cf\u5927\u9e4f\u3002"
            }, {
                t: "\u5408\u5bb6\u6b22\u4e50",
                c: "\u5409\u5e74\u597d\uff0c\u5f97\u9e21\u5b9d;\u51fa\u4f17\u8c8c\uff0c\u6ca1\u5f97\u6311;\u547d\u9014\u597d\uff0c\u624d\u6c14\u9ad8;\u5408\u5bb6\u6b22\uff0c\u7236\u6bcd\u597d;\u795d\u798f\u5230\uff0c\u76fc\u7f8e\u597d\uff0c\u613f\u60a8\u5408\u5bb6\u591a\u6b22\u4e50\uff0c\u5e73\u5e73\u5b89\u5b89\u591a\u8d22\u5b9d!"
            }, {
                t: "\u559c\u7ed3\u826f\u7f18",
                c: "\u516c\u9e21\u795e\u91c7\u5955\u5955\uff0c\u5e26\u6765\u5e73\u5b89\u5982\u610f;\u6bcd\u9e21\u52e4\u52b3\u7f8e\u4e3d\uff0c\u4e0b\u4e2a\u91d1\u86cb\u7ed9\u4f60;\u5c0f\u9e21\u6d3b\u6cfc\u6dd8\u6c14\uff0c\u6325\u6d12\u6b22\u4e50\u6ee1\u5730;\u7535\u8bdd\u4f20\u60c5\u8fbe\u610f\uff0c\u795d\u4f60\u9e21\u5e74\u5927\u5409!"
            }, {
                t: "\u53cb\u8c0a\u957f\u5b58",
                c: "\u5728\u65b0\u7684\u4e00\u5e74\u5f00\u542f\u65b0\u7684\u5e0c\u671b\uff0c\u65b0\u7684\u7a7a\u767d\u627f\u8f7d\u65b0\u7684\u68a6\u60f3\u3002\u670b\u53cb\u62c2\u53bb\u5c81\u6708\u4e4b\u5c18\uff0c\u8ba9\u6b22\u7b11\u548c\u6cea\u6c34\uff0c\u7231\u4e0e\u54c0\u6101\u5728\u5fc3\u4e2d\u51dd\u6210\u4e00\u9897\u539a\u91cd\u6676\u83b9\u7684\u7425\u73c0\u505c\u7559\u3002\u795d\u6700\u597d\u7684\u670b\u53cb\u9e21\u5e74\u5feb\u4e50!"
            }, {
                t: "\u6625\u4e4b\u795d\u798f",
                c: "\u6625\u98ce\u5439\u8fdb\u5e74\u7684\u95e8\u69db\u513f\uff0c\u6e29\u6696\u6d8c\u8fdb\u4f60\u7684\u5fc3\u574e\u513f;\u6625\u8054\u8d34\u5728\u5e74\u7684\u95e8\u69db\u513f\uff0c\u5409\u7965\u9a7b\u5728\u4f60\u7684\u5fc3\u574e\u513f;\u6625\u8282\u7684\u77ed\u4fe1\u6324\u6ee1\u5e74\u7684\u95e8\u69db\u513f\uff0c\u6625\u5929\u7684\u795d\u798f\u586b\u6ee1\u4f60\u7684\u5fc3\u574e\u513f!"
            }, {
                t: "\u4e8b\u4e8b\u987a\u5fc3",
                c: "\u9001\u4f60\u4e00\u9897\u661f\uff0c\u4f7f\u4f60\u5929\u5929\u6b22\u5fc3;\u9001\u4f60\u4e8c\u9897\u661f\uff0c\u8ba9\u4f60\u4e00\u5207\u987a\u5fc3;\u9001\u4f60\u4e09\u9897\u661f\uff0c\u795d\u4f60\u51e1\u4e8b\u5f00\u5fc3;\u9001\u4f60\u56db\u9897\u661f\uff0c\u613f\u4f60\u4e8b\u4e8b\u987a\u5fc3;\u9001\u4f60\u4e94\u9897\u661f\uff0c\u4ee3\u8868\u6211\u7684\u5fc3--\u795d\u60a8\u9e21\u5e74\u5feb\u4e50!"
            }, {
                t: "\u601d\u5ff5\u95ee\u5019",
                c: "\u6765\u4e0d\u53ca\u6574\u7406\u601d\u7eea\uff0c\u4e00\u5e74\u53c8\u5306\u5306\u8fc7\u53bb\uff0c\u95ee\u5019\u867d\u7136\u65f6\u65ad\u65f6\u7eed\uff0c\u601d\u5ff5\u6c38\u5728\u5fc3\u5e95\u4f20\u9012\uff0c\u9e21\u5e74\u7684\u949f\u58f0\u5df2\u7ecf\u54cd\u8d77\uff0c\u613f\u4f60\u4e00\u5e74\u7684\u8f9b\u52b3\u5316\u4f5c\u6ee1\u610f\u3002\u53c8\u5230\u9e21\u5e74\u4f73\u8282\uff0c\u795d\u4f60\u5f00\u5fc3\u60ec\u610f!"
            }, {
                t: "\u56e2\u56e2\u5706\u5706",
                c: "\u9e21\u5e74\u597d!\u559c\u9e4a\u767b\u679d\u8d3a\u4f73\u8282\uff0c\u50b2\u96ea\u7ea2\u6885\u628a\u6625\u95f9\u3002\u5929\u6daf\u6d77\u89d2\u540c\u805a\u9996\uff0c\u56e2\u56e2\u5706\u5706\u7686\u6b22\u7b11\u3002\u814a\u5c3d\u6625\u5f52\u65b0\u4e07\u8c61\uff0c\u7d2b\u71d5\u8854\u6ce5\u7b51\u5bb6\u5de2\u3002\u7f8e\u6ee1\u5e78\u798f\u6d74\u6625\u98ce\uff0c\u536f\u5e74\u66f4\u4e0a\u4e00\u5c42\u697c\u3002"
            }],
            init: function() {
                var b = this;
                this.listBox = g(".canvasList");
                g("#paperTag").onclick = function() {
                    b.type = "paper";
                    g("#paperTag").className = "selected";
                    g("#paperCont").style.display = "block";
                    g("#textTag").className = "";
                    g("#textCont").style.display = "none"
                }
                ;
                g("#textTag").onclick = function() {
                    b.type = "text";
                    g("#paperTag").className = "";
                    g("#paperCont").style.display = "none";
                    g("#textTag").className = "selected";
                    g("#textCont").style.display = "block"
                }
                ;
                if (location.search.match(/(\?|&)t=1(\&|$)/))
                    g("#textTag").onclick();
                g(".nameInput input").onfocus = function() {
					//您的姓名？
                    "\u60a8\u7684\u59d3\u540d\uff1f" == this.value && (this.value = "")
                }
                ;
				//习近平|近平习|习进平|李克强|王岐山|张高丽|张德江|俞正声|李源潮|胡锦涛|温家宝|朱镕基|江泽民|李鹏|毛主席|毛泽东|周总理|周恩来|邓小平|刘少奇|李瑞环|胡耀邦|叶剑英|赵紫阳|华国锋|叶剑英|李先念|周永康|薄熙来
                var c = /(\u4e60\u8fd1\u5e73|\u8fd1\u5e73\u4e60|\u4e60\u8fdb\u5e73|\u674e\u514b\u5f3a|\u738b\u5c90\u5c71|\u5f20\u9ad8\u4e3d|\u5f20\u5fb7\u6c5f|\u4fde\u6b63\u58f0|\u674e\u6e90\u6f6e|\u80e1\u9526\u6d9b|\u6e29\u5bb6\u5b9d|\u6731\u9555\u57fa|\u6c5f\u6cfd\u6c11|\u674e\u9e4f|\u6bdb\u4e3b\u5e2d|\u6bdb\u6cfd\u4e1c|\u5468\u603b\u7406|\u5468\u6069\u6765|\u9093\u5c0f\u5e73|\u5218\u5c11\u5947|\u674e\u745e\u73af|\u80e1\u8000\u90a6|\u53f6\u5251\u82f1|\u8d75\u7d2b\u9633|\u534e\u56fd\u950b|\u53f6\u5251\u82f1|\u674e\u5148\u5ff5|\u5468\u6c38\u5eb7|\u8584\u7199\u6765)/;
                g(".nameInput input").onblur = function() {
                    var d = m(this.value);
                    c.test(d.replace(/(\s|_|~|\u3000|\|)/g, "")) && (d = "");
                    "" == d ? (this.value = "\u60a8\u7684\u59d3\u540d\uff1f",
                    g(".nameCont .monkey").className = "monkey",
                    b.username = "") : (g(".nameCont .monkey").className = "monkey monkeyS",
                    b.username = d.replace(/</g, "&lt;").replace(/>/g, "&gt;"))
                }
                ;
                for (var d = this.zfTxt, e = "", h = 0; h < d.length; h++)
                    e += '<dd data-value="' + h + '"><span>' + d[h].t + "</span></dd>";
                g("#textCont dl").innerHTML = e;
                for (var y = document.querySelectorAll("#textCont dd"), e = function() {
                    for (var c = parseInt(this.getAttribute("data-value")) || 0, e = 0; e < y.length; e++)
                        y[e].className = "";
                    this.className = "selected";
                    b.textId = c;
                    g("#textCont textarea").value = d[c].c
                }, h = 0; h < y.length; h++)
                    y[h].onclick = e;
                g("#textCont dd").click();
                f("clear_btn").onclick = function() {
                    b.word.paper.clearPaper()
                }
                ;
                for (var l = document.querySelectorAll("#classPage dd img"), e = function() {
                    var c = this.getAttribute("data-value");
                    c && b.toPreview(c)
                }, h = 0; h < l.length; h++)
                    l[h].onclick = e;
                this.btnBox = f("btnBox");
                this.undo_btn = f("undo_btn");
                this.repeat_btn = f("repeat_btn");
                this.pubBox = f("pubBox");
                this.completeBtn = f("completeBtn");
                this.undo_btn.onmousedown = function() {
                    b.word.paper.undo();
                    b.word.paper.repeatActi() && b.showRepeatBtn()
                }
                ;
                this.repeat_btn.onmousedown = function() {
                    b.word.paper.repeat()
                }
                ;
                var k = 0
                  , x = f("palette")
                  , n = f("penSize");
                this.tagPSList = document.querySelectorAll("#penSize li");
                this.penColor = f("penColor");
                // 控制选择三支笔显示和隐藏
                f("btnPenColor").onclick = function(b) {
                    k ? (k = 0,
                    x.style.display = "none",
                    n.style.display = "none") : (k = 1,
                    x.style.display = "block",
                    n.style.display = "block")
                }
                ;
                x.onclick = function(c) {
                    c = c.target;
                    "LI" == c.tagName && (b.setColor(c.getAttribute("value")),
                    k = 0,
                    x.style.display = "none",
                    n.style.display = "none")
                }
                ;
                n.onclick = function(c) {
                    c = c.target;
                    "LI" == c.tagName && (b.setPenSize(c.getAttribute("value")),
                    k = 0,
                    x.style.display = "none",
                    n.style.display = "none")
                }
                ;
                f("nextPage_1").onclick = function() {
                    b.paperNextPage()
                }
                ;
                f("nextPage_2").onclick = function() {
                    b.textNextPage()
                }
                ;
                f("returnEdit").onclick = function() {
                    b.switchPage(g("#editorPage"), g("#classPage"), -1)
                }
                ;
                f("returnClass").onclick = function() {
                    g("#editorPage .canvasCont").appendChild(g(".canvasList"));
                    g("#classPage").style.display = "block";
                    g("#previewPage").style.display = "none"
                }
                ;
                this.completeBtn.onclick = function() {
                    b.complete()
                }
                ;
                f("publicBtn").onclick = function() {
                    b.submit()
                }
                ;
                f("addWord").onclick = function() {
                    b.addWord()
                }
                ;
                this.addWord()
            },
            toPreview: function(b) {
                "\u60a8\u7684\u59d3\u540d\uff1f" == m(g(".nameInput input").value) ? (g(".nameCont .monkey").className = "monkey",
                this.username = "") : (g(".nameCont .monkey").className = "monkey monkeyS",
                this.username = m(g(".nameInput input").value.replace(/</g, "&lt;").replace(/>/g, "&gt;")));
                b = parseInt(b) || 1;
                var c = ['<div class="bg"></div><div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div><div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="titleToFrame 1s 1.3s"></div><div class="item_01" data-animationIn="bounceIn 1s 0" data-animationOut="opacityOut 1s 2.2s"></div>', '<div class="bg"></div><div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div><div class="item_01" data-animationIn="rotationIn 1.5s 0" data-animationOut="opacityOut 1s 2.2s"></div><div class="title" data-animationIn="fadeInDown 1s 1.5s" data-animationOut="opacityOut 1s 1.3s"></div><div class="item_02" data-animationIn="fadeIn 1s 2s" data-animationOut="opacityOut 1s 1s"></div>', '<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div><div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="fadeOut 1s 1.3s"></div><div class="item_02" data-animationIn="fadeInLeft 1s 1.5s"></div><div class="item_03" data-animationIn="fadeInRight 1s 1s"></div><div class="item_01" data-animationIn="zoomIn 1s 0" data-animationOut="opacityOut 1s 2.2s"></div>', '<div class="titleFrame" data-animationIn="fadeInDown 1s 3.1s"></div><div class="title" data-animationIn="fadeInDown 1s 1s" data-animationOut="fadeOut 1s 1.2s"></div><div class="item_01" data-animationIn="fadeIn 1.5s 0" data-animationOut="opacityOut 1s 2.2s"></div><div class="item_02" data-animationIn="bounceInDown 1s 1.7s"></div>'];
                if (0 > b || b > c.length)
                    b = 1;
                this.classType = b;
                c = '<div class="scenery page_' + b + '">' + c[b - 1] + ("text" == this.type ? '<div class="u_txt" data-animationIn="fadeIn 1s 3.6s"><div class="ut_cont">' + this.username + "\u795d\u60a8\uff1a<br>" + this.content.replace(/\n+/g, "<br>") + "</div></div>" : '<div class="canvasCont" data-animationIn="fadeIn 1s 3.6s"></div>') + '<div class="footer" data-animationIn="fadeInUp 1s 1s" data-animation="shine 2s 0 1"><div class="logo"></div></div>';
                c += "</div>";
                g("#previewPage .slideshow").innerHTML = c;
                "paper" == this.type && g("#previewPage .canvasCont").appendChild(g(".canvasList"));
                if ((b = [["cj_m_02.png", "bg_1.png", "cj_m_04.png", "yu_05.png", "cj_m_07.png"], "bg_2.png bg_2_c.png cj_m_14.png cj_m_13.png cj_m_15.png cj_m_16.png".split(" "), "bg_3_c.png bg_3.png jjbc_big_02.png cj_m_20_03.png cj_m_18.png cj_m_19.png cj_m_21.png".split(" "), ["bg_4.jpg", "cj_m_22.png", "cj_m_23.jpg", "cj_m_24.png", "cj_m_25.png"]][b - 1]) && b.length)
                    for (c = 0; c < b.length; c++)
                        b[c] = "http://i0.peopleurl.cn/microblog-v3/h5/chunjie/images/" + b[c] + "?r=2018";
                K.init("#previewPage .slideshow");
                u("\u751f\u6210\u9884\u89c8...");
                setTimeout(function() {
                    g("#classPage").style.display = "none";
                    g("#previewPage").style.display = "block";
                    r()
                }, 300)
            },
            paperNextPage: function() {
                1 == this.wordList.length && 5 > this.wordList[0].paper.moveSum ? alert("\u4e0d\u8981\u8fd9\u4e48\u5fc3\u6025\uff0c\u591a\u5c11\u5199\u70b9\u4e1c\u897f\u561b\uff01") : this.switchPage(g("#classPage"), g("#editorPage"), 1)
            },
            textNextPage: function() {
                5 > m(g("#textCont textarea").value.length) ? alert("\u4e0d\u8981\u8fd9\u4e48\u5fc3\u6025\uff0c\u591a\u5c11\u5199\u70b9\u4e1c\u897f\u561b\uff01") : (this.content = m(g("#textCont textarea").value).replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                this.switchPage(g("#classPage"), g("#editorPage"), 1))
            },
            switchPage: function(b, c, d) {
                var e = this;
                window.scrollTo(0, 0);
                d = d || 1;
                var h = function() {
                    clearTimeout(e._pageTranEndTimeout);
                    this.removeEventListener(F, h, null);
                    b.style[l("transition")] = "none";
                    c.style[l("transition")] = "none";
                    c.style.display = "none";
                    c.style.position = "relative";
                    b.style.position = "relative";
                    b.style.zIndex = 1
                };
                this._pageTranEndTimeout = setTimeout(function() {
                    h.bind(b)
                }, 500);
                b.addEventListener(F, h, null);
                b.style.position = "absolute";
                b.style[l("transition")] = "none";
                b.style[l("transform")] = "translateY(" + d * document.documentElement.clientHeight + "px)";
                b.style[l("transform-origin")] = "50% 50%";
                b.style.display = "block";
                b.style.zIndex = 200;
                c.style.position = "absolute";
                c.style[l("transition")] = "none";
                c.style[l("transform")] = "translateY(0)";
                c.style[l("transform-origin")] = "50% 50%";
                c.style.display = "block";
                setTimeout(function() {
                    b.style[l("transition")] = A + "transform 0.4s ease-out";
                    b.style[l("transform")] = "translateY(0px)";
                    c.style[l("transition")] = A + "transform 0.4s ease-out";
                    c.style[l("transform-origin")] = "50% " + (1 == d ? "0" : "100%");
                    c.style[l("transform")] = "scale(0.9)"
                }, 20)
            },
            firstAddWord: !0,
            addWord: function() {
                if (this.word && 5 > this.word.paper.moveSum)
                    alert("\u8fd9\u5f20\u7eb8\u4e0a\u8fd8\u6ca1\u6709\u5199\u5b57\u54ea\uff0c\u522b\u6d6a\u8d39\u54df\uff01");
                else {
                    var b = new w;
                    this.firstAddWord && I && (new w,
                    new w,
                    b = new w,
                    this.firstAddWord = !1);
                    this.listBox.appendChild(b.ele);
                    b.index = this.wordList.length;
                    this.wordList.push(b);
                    this.select(b.index)
                }
            },
            select: function(b) {
                this.wordList[b] && (this.word && this.word.toStatic(),
                this.word = this.wordList[b],
                this.word.ele.style.marginTop = 0,
                this.word.ele.style.marginBottom = 0,
                this.changeBtn(),
                this.word.toEdit(),
                b == this.wordList.length - 1 ? (this.word.ele.parentNode.appendChild(this.btnBox),
                this.pubBox.style.display = "none") : (this.word.ele.parentNode.insertBefore(this.btnBox, this.wordList[b + 1].ele),
                this.pubBox.style.display = "block"),
                this.btnBox.style.display = "block",
                this.index = this.word.index,
                this.setColor(this.color),
                this.setPenSize(this.penSize),
                b = this.word.ele.offsetTop,
                0 == this.index && (b = 0),
                this.scrollYTo(b, 300))
            },
            remove: function(b) {
                if (this.wordList[b]) {
                    var c = [];
                    this.word == this.wordList[b] && (this.word = null);
                    for (var d = 0; d < this.wordList.length; d++)
                        d != b && (this.wordList[d].index = c.length,
                        c.push(this.wordList[d]));
                    this.wordList = c;
                    this.composition()
                }
            },
            complete: function() {
                this.word && (5 > this.word.paper.moveSum ? alert("\u4e0d\u8981\u8fd9\u4e48\u5fc3\u6025\uff0c\u591a\u5c11\u5199\u70b9\u4e1c\u897f\u561b\uff01") : (this.btnBox.style.display = "none",
                document.body.appendChild(this.btnBox),
                this.pubBox.style.display = "block",
                this.word.toStatic(),
                this.composition()))
            },
            composition: function() {
                for (var b = 24.5901 * v, c = 81.967 * v, d, e = 0; e < this.wordList.length; e++)
                    1 < this.wordList.length ? (0 != e && this.wordList[e].paper.paddingTop > b ? (d = this.wordList[e].paper.paddingTop - b,
                    this.wordList[e].ele.style.marginTop = "-" + (d > c ? c : d) + "px") : this.wordList[e].ele.style.marginTop = 0,
                    e < this.wordList.length - 1 && this.wordList[e].paper.paddingBottom > b ? (d = this.wordList[e].paper.paddingBottom - b,
                    this.wordList[e].ele.style.marginBottom = "-" + (d > c ? c : d) + "px") : this.wordList[e].ele.style.marginBottom = 0) : (this.wordList[e].ele.style.marginTop = 0,
                    this.wordList[e].ele.style.marginBottom = 0)
            },
            changeBtn: function() {
                var b = this;
                this.word && this.word.paper.undoActi() ? t(this.undo_btn, "disabled") : k(this.undo_btn, "disabled");
                this.word && this.word.paper.repeatActi() ? (t(this.repeat_btn, "disabled"),
                this.showRepeatBtn()) : (k(this.repeat_btn, "disabled"),
                clearTimeout(b._repeat_timer),
                b._repeat_timer = setTimeout(function() {
                    b.hideRepeatBtn()
                }, 3E3))
            },
            _repeat_timer: null,
            showRepeatBtn: function() {
                var b = this;
                clearTimeout(this._repeat_timer);
                this._repeat_timer = setTimeout(function() {
                    b.hideRepeatBtn()
                }, 5E3)
            },
            hideRepeatBtn: function() {
                clearTimeout(this._repeat_timer);
                this.repeat_btn.style.marginLeft = "0"
            },
            setColor: function(b) {
                this.color = b;
                this.word.paper.color = b;
                "glod" == b ? b = "url(" + (window.glodImgSrc || "images/glod.png") + ")" : "black" == b && (b = "url(" + (window.blackImgSrc || "images/black.png") + ")");
                this.penColor.style.background = b
            },
            setPenSize: function(b) {
                for (var c = 0; c < this.tagPSList.length; c++)
                    this.tagPSList[c].getAttribute("value") == b ? (this.tagPSList[c].className = "selected",
                    this.word.paper.penSize = parseInt(b),
                    this.penSize = b,
                    this.penColor.style.width = this.penColor.style.height = .2 + parseInt(b) / 8 * .8 + "em") : this.tagPSList[c].className = ""
            },
            submit: function() {
                var b = this;
                "text" == this.type && this.content == this.zfTxt[this.textId].c ? (E("_tempShow", 1, 1, "people.com.cn;path=/"),
                u("\u8bf7\u7a0d\u5019..."),
                setTimeout(function() {
                    window.location.href = "http://microblog.people.com.cn/h5/chunjie/2016cj_" + b.classType + "_" + b.textId + "_" + (b.username ? escape(b.username.replace(/_/g, " ")).replace(/%/g, "~") : "")
                }, 500)) : (u("\u751f\u6210\u56fe\u7247\u4e2d"),
                "paper" == this.type ? this.uploadImg() : this.uploadJSON())
            },
            scrollYTo: function(b, c) {
                function d() {
                    g++;
                    var c, e = g;
                    c = (b - h) * (e /= f) * e + h;
                    window.scrollTo(window.pageXOffset, c);
                    g < f && setTimeout(d, Math.round(1E3 / 36))
                }
                var e = document.documentElement.scrollHeight - document.documentElement.clientHeight
                  , h = window.pageYOffset;
                b > e && (b = e);
                var f = Math.ceil(36 * (c || 300) / 1E3)
                  , g = 0;
                d()
            },
            uploadImg: function() {
                var b = this, c;
                c = this.wordList[0].paper.getImgData("jpeg", 305, .6);
                c = c.substr(23);
                u("\u4e0a\u4f20\u56fe\u7247\u4e2d");
                var d = new XMLHttpRequest;
                d.onreadystatechange = function() {
                    if (4 == d.readyState && 200 == d.status) {
                        var c = d.responseText;
                        c && /^\d+$/.test(c) ? (b.imgUrl = "http://i0.peopleurl.cn/nmsgimage/wx/" + c.substr(0, 10) + "/" + c + ".jpg",
                        b.imgId = c,
                        b.uploadJSON()) : (alert("\u56fe\u7247\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:601"),
                        r())
                    } else
                        4 == d.readyState && (alert("\u56fe\u7247\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:" + d.status),
                        r())
                }
                ;
                d.ontimeout = function(b) {
                    alert("\u56fe\u7247\u4e0a\u4f20\u8d85\u65f6\uff0c\u8bf7\u5728\u8f83\u597d\u7684\u7f51\u7edc\u73af\u5883\u4e2d\u518d\u8bd5\uff01");
                    r()
                }
                ;
                d.open("POST", "/wx2015ChunjieUpload.action", !0);
                d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                c = "dataStr=" + encodeURIComponent(c) + "&dataSmall=" + encodeURIComponent("");
                d.send(c)
            },
            uploadJSON: function() {
                var b;
                b = '__loadData({"type":"' + this.type + '","classType":"' + this.classType + '","username":"' + encodeURIComponent(this.username) + '","length":' + this.wordList.length + ',"t":"' + ("text" == this.type ? encodeURIComponent(this.content) : "") + '","c":${cs},"img":"' + (this.imgUrl || "") + '"';
                if ("paper" == this.type) {
                    b += ',"list":[';
                    for (var c = [], d = 0; d < this.wordList.length; d++)
                        c.push(this.wordList[d].paper.getPenmanship());
                    b += c.join(",") + "]"
                }
                b += "});";
                var c = b.match(/,"c":".*?"/g)
                  , e = [];
                if (c) {
                    for (d = 0; d < c.length; d++)
                        -1 === e.join("|").indexOf(c[d]) && e.push(c[d]);
                    c = e.length
                } else
                    c = 1;
                b = b.replace("${cs}", c);
                u("\u4e0a\u4f20\u6570\u636e\u4e2d...");
                var h = new XMLHttpRequest;
                h.onreadystatechange = function() {
                    if (4 == h.readyState && 200 == h.status) {
                        var b = h.responseText;
                        b && /^\d+$/.test(b) ? (E("_tempShow", 1, 1, "people.com.cn;path=/"),
                        u("\u8bf7\u7a0d\u5019..."),
                        setTimeout(function() {
                            window.location.href = "http://microblog.people.com.cn/h5/chunjie/" + b
                        }, 2E3)) : (alert("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:601"),
                        r())
                    } else
                        4 == h.readyState && (alert("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01code:" + h.status),
                        r())
                }
                ;
                h.ontimeout = function(b) {
                    alert("\u4e0a\u4f20\u8d85\u65f6\uff0c\u8bf7\u5728\u8f83\u597d\u7684\u7f51\u7edc\u73af\u5883\u4e2d\u518d\u8bd5\uff01");
                    r()
                }
                ;
                h.open("POST", "/wx2015ChunjieConfUpload.action", !0);
                h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                h.send("confDataStr=" + encodeURIComponent(b) + "&charCount=" + this.wordList.length + "&imageType=" + c + "&picName=" + encodeURIComponent(this.imgId))
            },
            getThumbnail: function() {
                return 0 < this.wordList.length ? this.wordList[0].paper.getImgData("jpeg", 305, .7) : ""
            }
        };

        window.console && window.console.log && console.log("Copyright by people.cn");
        w.prototype = {
            toStatic: function() {
                1 < p.wordList.length && 5 > this.paper.moveSum ? (this.del(),
                p.remove(this.index)) : (this.ele.className = "canvasShow",
                this.paper.setDisabled(!0),
                this.paper.surveyPadding(),
                p.word = null)
            },
            toEdit: function() {
                "play" == this.paper.status && (this.paper._stop(),
                this.paper.recovery());
                this.ele.className = "canvasEdit";
                this.paper.setDisabled(!1)
            },
            del: function() {
                1 >= p.wordList.length ? (p.select(0),
                p.word.paper.clearPaper()) : (p.remove(this.index),
                this.btn_edit.onmousedown = this.btn_del.onclick = this.paper.onchange = null,
                "play" == this.paper.status && (this.paper._stop(),
                this.paper.recovery()),
                this.ele.parentNode.removeChild(this.ele))
            }
        };

        // canvas操作
        C.prototype = {
            lineWidth: 1,
            color: "black",
            penSize: 8,
            fontWidth: 320,
            bg: "images/paper.jpg",
            moveSum: 0,
            stroke: null,
            status: "edit",
            init: function() {
                var b = this;
                if (this.canvas.getContext) {
                    this.bgCanvas = document.createElement("canvas");
                    this.bgCanvas.width = this.canvas.width;
                    this.bgCanvas.height = this.canvas.height;
                    this.canvas.style.position = "absolute";
                    this.canvas.style.left = 0;
                    this.canvas.style.top = 0;
                    this.canvas.parentNode.appendChild(this.bgCanvas);
                    this.ctx = this.canvas.getContext("2d");
                    this.bgCtx = this.bgCanvas.getContext("2d");
                    this.ctx.strokeStyle = this.color;
                    this.ctx.fillStyle = this.color;
                    this.addEvent(this.canvas, "selectstart", function() {
                        return !1
                    });
                    this.bgImg = new Image;
                    this.bgImg.src = window.paperImgSrc || this.bg;
                    this.createPat("glodPat", window.glodImgSrc || "/microblog-v3/h5/chunjie/images/glod.png", 150);
                    this.createPat("blackPat", window.blackImgSrc || "/microblog-v3/h5/chunjie/images/black.png", 150);
                    var c = function(d) {
                        if ("edit" === b.status) {
                            var e, h;
                            if ("touchstart" == d.type) {
                                if (2 <= d.touches.length)
                                    return;
                                e = d.touches[0].pageX;
                                h = d.touches[0].pageY;
                                b.removeEvent(b.canvas, "mousedown", c)
                            } else
                                e = d.pageX,
                                h = d.pageY;
                            b.canvasPos = b.canvas.getBoundingClientRect();
                            b.canvasPos = {
                                left: b.canvasPos.left + (window.scrollX || window.pageXOffset),
                                top: b.canvasPos.top + (window.scrollY || window.pageYOffset)
                            };
                            e -= b.canvasPos.left;
                            h -= b.canvasPos.top;
                            b.stroke = {
                                t: new Date,
                                d: [{
                                    x: e,
                                    y: h,
                                    t: 0
                                }],
                                c: b.color,
                                p: b.penSize
                            };
                            b.moveBegin(e, h, d.type);
                            d.preventDefault()
                        }
                    };
                    this.addEvent(this.canvas, "touchstart", c);
                    this.addEvent(this.canvas, "mousedown", c)
                }
            },
            moveBegin: function(b, c, d) {
                var e = this;
                window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
                this.ctx.save();
                this.ctx.moveTo(b, c);
                this.preDot = null;
                this.moveQueue = [];
                this.firstMove = 0;
                this.lineWidth = this.penSize / 2 * (this.fontWidth / 320);
                this.__moveEvent && (this.removeEvent(document, "mousemove", this.__moveEvent),
                this.removeEvent(document, "touchmove", this.__moveEvent),
                this.removeEvent(document, "mouseup", this.__endEvent),
                this.removeEvent(document, "touchend", this.__endEvent));
                this.__moveEvent = function(b) {
                    if ("edit" === e.status) {
                        var c, d;
                        if ("touchmove" == b.type) {
                            if (2 <= b.touches.length)
                                return;
                            c = b.touches[0].pageX;
                            d = b.touches[0].pageY
                        } else
                            c = b.pageX,
                            d = b.pageY;
                        c -= e.canvasPos.left;
                        d -= e.canvasPos.top;
                        e.stroke.d.push({
                            x: c,
                            y: d,
                            t: new Date - e.stroke.t
                        });
                        e.moving(c, d);
                        b.preventDefault()
                    }
                }
                ;
                this.__endEvent = function(b) {
                    if ("edit" === e.status && (e.moveEndFn(),
                    e.penmanship.length ? e.stroke.t -= e.penmanshipTime : (e.penmanshipTime = e.stroke.t,
                    e.stroke.t = e.stroke.t.getTime()),
                    e.penmanship.push(e.stroke),
                    e._clearQueue = null,
                    e.repeatQueue = [],
                    e.stroke = null,
                    "function" == typeof e.onchange))
                        e.onchange()
                }
                ;
                "touchstart" == d ? (this.addEvent(document, "touchmove", this.__moveEvent),
                this.addEvent(document, "touchend", this.__endEvent)) : (this.addEvent(document, "mousemove", this.__moveEvent),
                this.addEvent(document, "mouseup", this.__endEvent));
                this.clearPaint();
                this.moving(b, c)
            },
            moving: function(b, c) {
                var d;
                d = 0;
                if (this.moveQueue.length && (d = this.moveQueue[this.moveQueue.length - 1],
                d = Math.sqrt((d.x - b) * (d.x - b) + (d.y - c) * (d.y - c)),
                0 == d))
                    return;
                this.moveSum++;
                H && !this.firstMove && 2 == this.moveQueue.length && 4 * d < this.moveQueue[1].c && (this.moveQueue[0].x -= 2 / 3 * (this.moveQueue[0].x - this.moveQueue[1].x),
                this.moveQueue[0].y -= 2 / 3 * (this.moveQueue[0].y - this.moveQueue[1].y),
                this.moveQueue[1].c /= 2 / 3 * this.moveQueue[1].c);
                d = {
                    x: b,
                    y: c,
                    c: d
                };
                this.moveQueue.push(d);
                3 <= this.moveQueue.length && (d = this.moveQueue.shift(),
                this.actionPaint(d))
            },
            actionPaint: function(b, c) {
                var d = b.x
                  , e = b.y
                  , h = b.c;
                if (!this.preDot || 0 !== h) {
                    this.nextDot = this.moveQueue.length ? this.moveQueue[0] : null;
                    if (h) {
                        this.ctx.moveTo(this.preDot.x, this.preDot.y);
                        var f = 0;
                        !this.firstMove && this.nextDot && h > 3 * this.nextDot.c && (h /= 4,
                        f = 1);
                        this.firstMove = 1;
                        bs = this.fontWidth / 320 * this.penSize;
                        c || (c = h < .003125 * this.fontWidth ? 1.625 * bs : h < .00625 * this.fontWidth ? 1.375 * bs : h < .009375 * this.fontWidth ? 1.25 * bs : h < .015625 * this.fontWidth ? 1.125 * bs : h < .021875 * this.fontWidth ? bs : h < .028125 * this.fontWidth ? .875 * bs : h < .034375 * this.fontWidth ? .75 * bs : h < .046875 * this.fontWidth ? .625 * bs : h < .0625 * this.fontWidth ? .5 * bs : .375 * bs);
                        this.toLW = c;
                        if (f)
                            for (f = 1; 3 >= f; f++)
                                this.paintDot(d + f / 3 * (this.preDot.x - d), e + f / 3 * (this.preDot.y - e), h)
                    }
                    this.paintDot(d, e, h);
                    this.preDot = b
                }
            },
            moveEndFn: function() {
                this.removeEvent(document, "mousemove", this.__moveEvent);
                this.removeEvent(document, "touchmove", this.__moveEvent);
                this.removeEvent(document, "mouseup", this.__endEvent);
                this.removeEvent(document, "touchend", this.__endEvent);
                --this.ctx.lineWidth;
                for (var b; this.moveQueue.length; )
                    b = this.moveQueue.shift(),
                    this.actionPaint(b, this.fontWidth / 320 * this.penSize / 8);
                this.showToCanvas(!0)
            },
            setDisabled: function(b) {
                b && "edit" == this.status ? this.status = "disabled" : b || "disabled" != this.status || (this.status = "edit")
            },
            undoActi: function() {
                return this._clearQueue && this._clearQueue.length || this.penmanship.length
            },
            undo: function() {
                if ("edit" === this.status)
                    if (this._clearQueue && this._clearQueue.length) {
                        if (this.penmanship = this._clearQueue,
                        this._clearQueue = null,
                        this.recovery(),
                        "function" == typeof this.onchange)
                            this.onchange()
                    } else if (this.penmanship.length) {
                        var b = this.penmanship.pop();
                        this.repeatQueue.push([b]);
                        0 == this.penmanship.length && (this._moveSum = this.moveSum,
                        this.moveSum = 0);
                        this.recovery();
                        if ("function" == typeof this.onchange)
                            this.onchange()
                    }
            },
            repeatActi: function() {
                return !!this.repeatQueue.length
            },
            repeat: function() {
                if ("edit" === this.status && this.repeatQueue.length && (0 == this.penmanship.length && (this.moveSum = this._moveSum),
                this.penmanship = this.penmanship.concat(this.repeatQueue.pop()),
                this.recovery(),
                "function" == typeof this.onchange))
                    this.onchange()
            },
            _clearQueue: null,
            clearPaper: function() {
                if ("edit" === this.status && (this.preDot = null,
                this.moveSum = 0,
                this.penmanship.length && (this._clearQueue = this.penmanship),
                this.penmanship = [],
                this.ctx.beginPath(),
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                this.ctx.closePath(),
                "function" == typeof this.onchange))
                    this.onchange()
            },
            replay: function() {
                0 != this.penmanship.length && ("play" == this.status ? (this._stop(),
                this.recovery()) : (this.oldStatus = this.status,
                this.status = "play",
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                this.ctx.beginPath(),
                this.playPos = 0,
                this._play()))
            },
            showToCanvas: function(b) {
                if (!this.isRecovery && b) {
                    this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    b = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    for (var c = 0; c < b.data.length; c += 4)
                        0 != b.data[c + 3] && (b.data[c] = 100,
                        b.data[c + 1] = 30,
                        b.data[c + 2] = 7,
                        b.data[c + 3] = Math.round(.75 * b.data[c + 3]));
                    this.bgCtx.putImageData(b, -5 * v, 5 * v)
                }
            },
            _stop: function() {
                this.status = this.oldStatus;
                clearTimeout(this._playTimer)
            },
            _play: function() {
                function b() {
                    c.color = d;
                    c.penSize = e;
                    c.playPos >= c.penmanship.length ? c.status = c.oldStatus : (clearTimeout(c._playTimer),
                    c._playTimer = setTimeout(function() {
                        c._play()
                    }, 300))
                }
                var c = this
                  , d = this.color
                  , e = this.penSize
                  , h = this.penmanship[this.playPos]
                  , f = 0;
                if (h && "play" == this.status) {
                    this.color = h.c;
                    this.penSize = h.p;
                    this.moveBegin(h.d[0].x, h.d[0].y);
                    1 == h.d.length && (c.moveEndFn(),
                    b());
                    var g = 1, k, f = 0;
                    k = h.d[g];
                    (function() {
                        k && (c.moving(k.x, k.y),
                        g >= h.d.length - 1 && (c.moveEndFn(),
                        b()),
                        g++,
                        k = h.d[g]) && (clearTimeout(c._playTimer),
                        c._playTimer = setTimeout(arguments.callee, k.t - f),
                        f = k.t)
                    })();
                    this.playPos++
                }
            },
            recovery: function() {
                function b() {
                    c.color = d;
                    c.penSize = e;
                    c.playPos >= c.penmanship.length && (c.status = "edit")
                }
                var c = this
                  , d = this.color
                  , e = this.penSize;
                this.isRecovery = !0;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.bgCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.beginPath();
                this.playPos = 0;
                for (var h = this.penmanship[this.playPos]; h; ) {
                    this.color = h.c;
                    this.penSize = h.p;
                    this.moveBegin(h.d[0].x, h.d[0].y);
                    1 == h.d.length && (this.moveEndFn(),
                    b());
                    for (var f = 1, g = 1; f < h.d.length; f++) {
                        var k = h.d[g];
                        g++;
                        this.moving(k.x, k.y);
                        g >= h.d.length && (this.moveEndFn(),
                        b())
                    }
                    this.playPos++;
                    h = this.penmanship[this.playPos]
                }
                this.isRecovery = !1;
                this.showToCanvas(!0)
            },
            paintDot: function(b, c, d) {
                var e = this.lineWidth
                  , h = this.color;
                this.glodPat && "glod" == this.color && (h = this.glodPat);
                this.blackPat && "black" == this.color && (h = this.blackPat);
                this.ctx.fillStyle = h;
                this.ctx.strokeStyle = h;
                if (this.preDot) {
                    d = Math.floor(Math.abs(d) / (this.lineWidth / 3));
                    if (1 < d)
                        for (var e = this.lineWidth, f = 0; f < d; f++)
                            e -= (e - this.toLW) / (8 < d ? d : 8);
                    else
                        Math.abs(this.lineWidth - this.toLW) > this.fontWidth / 320 * this.penSize * .025 && (e = this.lineWidth - (this.lineWidth - this.toLW) / 8);
                    var g = this.lineWidth * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x)))
                      , k = this.lineWidth * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x)))
                      , l = e * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x)))
                      , m = e * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x)));
                    d = this.preDot.x + g;
                    var f = this.preDot.y - k
                      , g = this.preDot.x - g
                      , k = this.preDot.y + k
                      , n = b + l
                      , p = c - m
                      , l = b - l
                      , m = c + m;
                    this.ctx.beginPath();
                    this.ctx.moveTo(d, f);
                    this.ctx.lineTo(g, k);
                    this.ctx.lineTo(l, m);
                    this.ctx.lineTo(n, p);
                    this.ctx.fill();
                    this.ctx.closePath();
                    this.ctx.fillStyle = h;
                    this.ctx.lineWidth = this.lineWidth = e
                }
                this.ctx.beginPath();
                this.ctx.lineWidth = this.lineWidth = e;
                this.ctx.arc(b, c, this.lineWidth, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.closePath()
            },
            getPenmanship: function() {
                for (var b = "", c, d = 0; d < this.penmanship.length; d++) {
                    0 != d && (b += ",");
                    for (var b = b + ('{"t":' + this.penmanship[d].t + ","), b = b + ('"c":"' + this.penmanship[d].c + '",'), b = b + ('"p":"' + this.penmanship[d].p + '",'), b = b + '"d":[', e = 0; e < this.penmanship[d].d.length; e++)
                        c = this.penmanship[d].d[e],
                        0 != e && (b += ","),
                        b += Math.round(100 * c.x) / 100 + "," + Math.round(100 * c.y) / 100 + "," + (c.t || 0);
                    b += "]}"
                }
                return b = '{"w":' + this.fontWidth + ',"p":[' + b + "]}"
            },
            setPenmanship: function(b) {
                try {
                    var c;
                    "string" == typeof b ? c = eval("(" + b + ")") : "object" == typeof b && (c = b);
                    var d = c.p, e = this.fontWidth / c.w, f;
                    for (b = 0; b < d.length; b++) {
                        if (0 != d[b].d.length % 3) {
                            console.log("\u6570\u636e\u683c\u5f0f\u9519\u8bef!");
                            return
                        }
                        c = [];
                        for (var g = 0; g < d[b].d.length; g += 3)
                            f = {
                                x: Math.round(d[b].d[g] * e * 10) / 10,
                                y: Math.round(d[b].d[g + 1] * e * 10) / 10,
                                t: d[b].d[g + 2]
                            },
                            c.push(f);
                        d[b].d = c
                    }
                    this.penmanship = d;
                    if ("function" == typeof this.onchange)
                        this.onchange()
                } catch (G) {
                    console.log("\u6570\u636e\u9519\u8bef"),
                    console.log(G)
                }
            },
            paddingTop: 0,
            paddingBottom: 0,
            surveyPadding: function() {
                this.paddingBottom = this.paddingTop = 0;
                for (var b = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height), c = 0; c < this.canvas.height; c++)
                    for (var d = 0; d < this.canvas.width; d++)
                        if (0 < b.data[4 * (c * this.canvas.height + d) + 3]) {
                            this.paddingTop = c - 1;
                            c = this.canvas.height;
                            break
                        }
                for (c = this.canvas.height - 1; 0 <= c; c--)
                    for (d = 0; d < this.canvas.width; d++)
                        if (0 < b.data[4 * (c * this.canvas.height + d) + 3]) {
                            this.paddingBottom = this.canvas.height - c - 1;
                            c = -1;
                            break
                        }
            },
            clearPaint: function() {
                this.preDot = null
            },
            addEvent: function(b, c, d) {
                b.attachEvent ? b.attachEvent("on" + c, d) : b.addEventListener(c, d, !1)
            },
            removeEvent: function(b, c, d) {
                b.detachEvent ? b.detachEvent("on" + c, d) : b.removeEventListener(c, d, !1)
            },
            getImgData: function(b, c, d) {
                return D(b, d, this, c || 610)
            },
            getSmallImgData: function(b, c) {
                return D(b, c, this, 80)
            },
            createPat: function(b, c, d) {
                d *= v;
                var e = new Image;
                e.src = c;
                e.onload = function() {
                    var c = document.createElement("canvas");
                    c.width = c.height = d;
                    c.getContext("2d").drawImage(e, 0, 0, d, d);
                    this[b] = this.ctx.createPattern(c, "repeat")
                }
                .bind(this)
            }
        };
        // =============  code begin  ============
		B()
    }
})();
