
import crypto from 'crypto';
import lodash from 'lodash';


export const md5 = str => {
    return crypto.createHash('md5').update(str).digest('hex');
};

export const _ = lodash;

/**
 * @function 判断数据类型
 * @param {any} o 对应的数据
 * @example
 *  types("") // "string"
    types({}); // "object"
    types([]); // "array"
    types(100); // "number"
    types(null); // "null"
    types(); // "undefined"
    types(/abcd/); // "regex"
    types(new Date()); // "date"
 *
 */
export const types = (o: any) => {
    const s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)?.[1].toLowerCase();
};

/**
 * @description 时间戳转化为年 月 日 时 分 秒
 * @function formatTime(format,num)
 * @param {number|Date} [num = new Date().getTime()|new Date] 时间戳或者时间对象,默认使用当前时间戳, new Date().getTime(); 获取当前时间戳（毫秒）
 * @param {string} [format='YYYY-mm-dd HH:MM:SS'] 时间格式,不填时默认使用'YYYY-mm-dd HH:MM:SS'格式,更改只需替换中间连接符号就行'YYYY年mm月dd日 HH时MM分SS秒'
 * @example
 *  var sjc = 1472048779952; //js一般获取的时间戳是13位，PHP一般是10位
    formatTime(sjc,'YYYY-mm-dd HH:MM:SS')
 */
export const formatTime = (num: number | string | Date = new Date().getTime(), format = '') => {
    format = format || 'YYYY-mm-dd HH:MM:SS'; // 第一个参数不填时，使用默认格式
    let ret,
        date: Date,
        reNum;

    if (types(num) === 'number') {
        // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
        if (num.toString().length === 10) {
            date = new Date((num as number) * 1000);
        } else {
            date = new Date(num);
        }
    } else if (types(num) === 'string') {
        date = new Date(num);

    } else if (types(num) === 'date') {
        date = num as Date;
    } else {
        return '';
    }

    const opt = {
        Y: date.getFullYear().toString(), // 年
        m: (date.getMonth() + 1).toString(), // 月
        d: date.getDate().toString(), // 日
        H: date.getHours().toString(), // 时
        M: date.getMinutes().toString(), // 分
        S: date.getSeconds().toString(), // 秒
        // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
    };
    let k: keyof typeof opt;
    for (k in opt) {
        ret = new RegExp('(' + k + '+)').exec(format);
        if (ret) {
            reNum = ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'); // 根据复数前面是否补零,如“mm”补零，单“m”前面不补零
            format = format.replace(ret[1], reNum); // 替换
        }
    }
    return format;
};


/**
 * 根据当前一级id(或字段)查找上级所有的节点内容
 * @param classifyList 嵌套数组
 * @param val 需要查找的值
 * @param key 查找值对应的键值，默认为id
 * @param children 子类的键值，默认children
 * @return any[]
*/
export function getParentNode<T = any>(classifyList: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T[] {
    const temp: any[] = [];
    const forFn = (arr: any[], id: T[keyof T]) => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            // 找到值对应的那一项，追加进去
            if (item[key] === val) temp.push(item);
            if (item[children]) {
                const data1 = item[children].find((item1: any) => { return item1[key] === id; });
                if (data1) {
                    temp.unshift(item); // 数组前面追加进去
                    forFn(classifyList, item[key]);
                    break;
                } else {
                    forFn(item[children], id);
                }
            }
        }
    };
    forFn(classifyList, val);
    return temp;
}


/**
 * 传入参数：需要遍历的json，需要匹配的id(根据id取得对应的那一项)
 * @param data 数组数据，平级或树形数组皆可
 * @param val 键值id的值，（唯一）
 * @param key id 默认（唯一不重复的键值）
 * @param children 子类
 * @return
 */
export function findNodeItem<T = any>(data: Array<T>, val: T[keyof T], key = 'id' as keyof T, children = 'children' as keyof T): T | undefined {
    let temp: any = '';
    const forFn = (arr: any[], id: T[keyof T]) => {
        for (let i = 0; i < arr.length; i++) {
            if (temp) break; // 已经拿到值了,就退出循环
            const item = arr[i];
            // 找到值对应的那一项，赋值
            if (item[key] === val) temp = item;

            if (item[children]) forFn(item[children], id);
        }
    };
    forFn(data, val);
    return temp;
}

