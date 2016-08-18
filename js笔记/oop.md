# 面向对象
## 对象复制 	
	// 将所有对象s的属性复制给对象r
    var person = {
        name: "maping",
        age: 24,
        sex: "m"
    }
    var another = {name: "dingjiahua"};


    /**
     * 将所有 s 的属性复制给 r
     * @param r {Object}
     * @param s {Object}
     * @param is_overwrite {Boolean} 如指定为 false ，则不覆盖已有的值，其它值
     *   包括 undefined ，都表示 s 中的同名属性将覆盖 r 中的值
     */
    function mixs(r, s, is_overwrite) { 
        if (!s || !r) return r;
        for (var p in s) {
            if (is_overwrite || !(p in r)) {
                r[p] = s[p];
            }
        }
        return r;
    }
    console.log(mixs(another,person,true));