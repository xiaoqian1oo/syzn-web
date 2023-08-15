// 解析参数
function getQueryParams() {
    const url = location.search; // 获取url中"?"符后的字串
    const theRequest = new Object();
    if (url.indexOf('?') != -1) {
        const str = url.substr(1);
        strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
    }
    return theRequest;
}


/**
 * @function 获取浏览器地址的参数，不传参数时，获取的是地址栏的地址，返回一个封装参数的json对象
 * @param {String} [name=''] 获取值的key,默认为空,为空时，函数返回json对象
 * @param {String} [url=window.location.href] 地址，默认为浏览器的url
 * @return {string|object} name为空时，返回对象
 * @example
 *  getParams('aa', 'https://www.baidu.com?aa=101')       //101
 */
const getParams = (name = '', url = window.location.href) => {
    let endVal = '';
    if (url.indexOf('?') != -1) { // 判断url中有没有出现?
        let arrStr = url.substring(url.indexOf('?') + 1).split('&'); // 截取字符串，获取到?后面的那部分内容;以&符号为准，分割成数组
        arrStr = arrStr.filter(item => item); // 原有数组过滤为空的值
        const obj = {};
        for (let i = 0; i < arrStr.length; i++) {
            const index = arrStr[i].indexOf('=');
            const keys = arrStr[i].substring(0, index); // 第一个等号前面的那部分
            const value = arrStr[i].substring(index + 1); // 第一个等号后面的内容
            if (keys) { // keys不为空时，追加到obj对象里
                obj[keys] = decodeURI(value); // 解码输出,值含有中文字符的情况
            }
        }
        if (arrStr.length > 0) { // 先判断数组是不是为空，在判断name是不是有值传过来
            if (name) {
                endVal = obj[name] || '';
            } else {
                endVal = obj;
            }
        }
    }
    return endVal;
};

/**
 * @function  地址栏追加参数（更新参数值）,不刷新页面
 * @param {String} key 参数名
 * @param {String} value 参数的值
 * @example
 * updateUrl('pp',123)  //地址栏会有?pp=123
 */
const setUrlParams = (key, value) => { // 更新地址栏参数，不刷新页面
    const url = window.location.href;
    let newUrl;
    if (!value) {
        newUrl = url;
    } else {
        const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        const separator = url.indexOf('?') !== -1 ? '&' : '?';
        if (url.match(re)) {
            newUrl = url.replace(re, '$1' + key + '=' + value + '$2');
        } else {
            newUrl = url + separator + key + '=' + value;
        }
    }
    return newUrl;

    // 向当前url添加参数，没有历史记录
    // window.history.replaceState({
    //     path: newUrl
    // }, '', newUrl);
};


/**
 * @description 前端使用canvas绘制验证码
 * @class GVerify
 * @param {string} el 调用的标签类名(id、class、标签名等等)
 * @param {object} opt 参数变量,默认使用内部options变量的值
 * @example
 * const verify = new GVerify("#l_code", {
    length: "6",
    width: 150,
    height: 44,
    type: "blend",
  });
 */
class GVerify {
    constructor(el, opt) {
        this.$el = el;
        this.options = {
            width: '',
            height: '',
            type: 'number',
            length: 4, // 验证码长度
        };

        // 合并参数，根据传入的参数，修改默认参数值
        this.options = { ...this.options, ...opt };

        // 进一步处理参数
        const con = document.querySelectorAll(this.$el)[0];
        con.innerHTML = '';
        // console.log(con.offsetHeight);
        // console.log(con.getBoundingClientRect());
        this.options.width = this.options.width || con.offsetWidth; // 参数width有值，就使用传入的值，没有就使用父元素的宽度
        this.options.height = this.options.height || con.offsetHeight; // 参数height有值，就使用传入的值，没有就使用父元素的高度

        this.options.length = parseInt(this.options.length) || 4;

        const numArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // 纯数字数组
        const letter = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(','); // 纯字母数组
        if (this.options.type === 'blend') { // 判断验证码类型
            this.options.txtArr = [...numArr, ...letter];
        } else if (this.options.type === 'letter') {
            this.options.txtArr = letter;
        } else {
            this.options.txtArr = numArr;
        }

        this._init(); // 生成canvas
        this.refresh(); // 生成验证码
    }
    /** 初始化方法**/
    _init() {
        const _this = this;
        const canvas = document.createElement('canvas');
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style = 'cursor:pointer;vertical-align: bottom;user-select: none;';
        canvas.innerHTML = '您的浏览器版本不支持canvas';
        document.querySelectorAll(this.$el)[0].appendChild(canvas);
        // console.log(canvas);
        // document.querySelectorAll(this.$el)[0].innerHTML = canvas;
        canvas.onclick = function () {
            _this.refresh();
        };
    }
    /** 生成验证码**/
    refresh() {
        // console.log(123);
        this.options.code = ''; // 先清空一下原来的值
        const canvas = document.querySelectorAll(this.$el + '>canvas')[0];
        // console.log(canvas);
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'middle';
            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            const txtArr = this.options.txtArr;
            const len = this.options.length;
            for (let i = 1; i <= len; i++) {
                const txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px bold SimHei'; // 随机生成字体大小
                ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                const x = this.options.width / (len + 1) * i;
                const y = this.options.height / 2;
                const deg = randomNum(-30, 30);
                /** 设置旋转角度和坐标原点**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /** 恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /** 绘制干扰线**/
            for (let i = 0; i < 0; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /** 绘制干扰点**/
            for (let i = 0; i < this.options.width / 4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        } else {
            alert('你的浏览器不支持Canvas,建议您使用最新版本的浏览器!');
            return;
        }

    }
    /** 验证验证码**/
    validate(code) {
        code = code.toLowerCase();
        const v_code = this.options.code.toLowerCase();
        if (code == v_code) {
            return true;
        }
        // this.refresh(); //验证错误就更新验证码
        return false;

    }
}


/** 生成一个随机数(大于等于min,小于max的数)**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/** 生成一个随机色**/
function randomColor(min, max) {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/**
 * 提示框弹窗
 */

const jmMess = {
    timer: '', // 记录定时器状态
    /**
     * 提示框
     * @function jmMess.msg(value,time,callback)
     * @param {string} value 提示的文字信息
     * @param {string|number} time 弹窗显示的时间,单位ms,(多久关闭弹窗)
     * @param {function} callback 回调函数，弹窗关闭后执行
     * @example
     *  jmMess.msg("文字",5000,function(){})
     */
    msg(value, time, callback) {
        // 参数梳理
        if (typeof time === 'function') {
            callback = time;
        } else if (!isNaN(time)) {
            time = time - 0 >= 0 ? time - 0 : 3000;
        } else {
            time = 3000;
        }
        // 清除定时器
        clearTimeout(this.timer);
        // 移除提示框
        const old = document.querySelectorAll('body>[data-jm-tips="jmTips"]')[0];
        if (old) {
            document.body.removeChild(old);
        }

        // 创建div并设置样式和提示文字内容
        const div = document.createElement('div');
        div.style = 'width: 200px;position: fixed;top: 40%;left:50%;transform: translateX(-50%);text-align: center;z-index:9999;background-color: rgba(0, 0, 0,0.6);font-size: 14px;line-height:1.5;color: #fff;padding: 10px 15px;border-radius: 5px;';
        div.innerHTML = value;
        // div添加属性(标识),追加到DOM
        div.setAttribute('data-jm-tips', 'jmTips');
        document.body.appendChild(div);

        // 清除提示
        this.timer = setTimeout(function () {
            document.body.removeChild(div);
            if (typeof callback === 'function') {
                // 可以组装数据作为回调函数的参数返回使用
                // var mss = { state: 'success' };
                // callback(mss);   //this会指向window
                // callback.apply(this, [mss]) //使用apply()来改变this指向当前方法,参数得用数组形式进行传参
                callback.apply(this);
            }
        }, time);
    },
    // 强制关闭弹窗
    close() {
        if (this.timer) {
            // 清空定时器,移除追加的div
            clearTimeout(this.timer);
            const old = document.querySelectorAll('body>[data-jm-tips="jmTips"]')[0];
            if (old) {
                document.body.removeChild(old);
            }
        }

    },

};
