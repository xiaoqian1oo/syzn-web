import moment from 'moment';

export function relativeTime(time) {

    return moment(new Date(time * 1000)).fromNow();
}

export function showToDate(time: moment.MomentInput) {

    return moment(time).format('YYYY-MM-DD');
}


export function domain(url) {
    return url && url.split('/')[2];
}


export function showImgUrl(str) {
    const imgArr = str.split(',');
    return imgArr[0] || '';
    // return url && url.split('/')[2];
}

export function strToArray(str) {
    const arr = str.split(',');
    return arr;
}
