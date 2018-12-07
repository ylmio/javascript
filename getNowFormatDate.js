

//原 Fri Dec 07 2018 09:59:12 GMT+0800 (中国标准时间)
//现 2018-12-07 09:59:12

function getNowFormatDate() {
    var date = new Date();
    console.log(date);
    var decollator = "-";
    var seperator = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (day >= 1 && day <= 9) {
        day = "0" + day;
    }
    var currentDate = year + decollator + month + decollator + day + " " + date.getHours() + seperator + date.getMinutes() + seperator + date.getSeconds();
    return currentDate;
}
