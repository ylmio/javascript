/**
 身份证第18位(校验码)的计算方法
 1.将身份证号码前面的17位数分别乘以不同的系数；
 2.从第一位到第十七位的系数分别为：7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2
 3.将这17位数字和系数相乘的结果相加；
 4.用加出来和除以11，看余数是多少；
 余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字；
 其分别对应的最后一位身份证的号码为1－0－X－9－8－7－6－5－4－3－2
 5.通过上面得知如果余数是2，就会在身份证的第18位数字上出现罗马数字的Ⅹ。如果余数是10，身份证的最后一位号码就是2。
 举例：
 某男性的身份证号码是340523198001010013。我们要看看这个身份证是不是合法的身份证。
 首先我们得出前17位的乘积和：
 (3*7+4*9+0*10+5*5+2*8+3*4+1*2+9*1+8*6+0*3+0*7+1*9+0*10+1*5+0*8+0*4+1*2) = 185
 然后再求余：
 185 % 11 = 9
 最后通过对应规则就可以知道余数9对应的数字是3。所以，可以判定这是一个合格的身份证号码。
 * */
let ID = '340523198001010013';
checkID=(ID)=>{
    let city = {
        11:"北京",
        12:"天津",
        13:"河北",
        14:"山西",
        15:"内蒙古",
        21:"辽宁",
        22:"吉林",
        23:"黑龙江 ",
        31:"上海",
        32:"江苏",
        33:"浙江",
        34:"安徽",
        35:"福建",
        36:"江西",
        37:"山东",
        41:"河南",
        42:"湖北 ",
        43:"湖南",
        44:"广东",
        45:"广西",
        46:"海南",
        50:"重庆",
        51:"四川",
        52:"贵州",
        53:"云南",
        54:"西藏 ",
        61:"陕西",
        62:"甘肃",
        63:"青海",
        64:"宁夏",
        65:"新疆",
        71:"台湾",
        81:"香港",
        82:"澳门",
        91:"国外"
    };
    let birthday = ID.substr(6,4)+"/"+Number(ID.substr(10,2))+"/"+Number(ID.substr(12,2));
    // console.log(birthday);
    let d = new Date(birthday);
    // console.log(d);
    let newBirthday = d.getFullYear()+"/"+Number(d.getMonth()+1)+"/"+Number(d.getDate());
    // console.log(newBirthday);
    let currentTime = new Date().getTime();
    // console.log(currentTime);
    let time = d.getTime();
    // console.log(time);
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum=0,i,residue;

    if(typeof ID !=="string"){
        console.log("非法字符串");
        return;
    };
    //1.首先校验位数是否满18位
    if(!/^\d{17}(\d|x)$/i.test(ID)){
        console.log("身份证信息错误");
        return;
    }
    //2.然后校验开头两位是否是合法的省(直辖市/自治区)：
    if(city[ID.substr(0,2)]===undefined){
        console.log("非法地区");
        return;
    }
    //3.然后再校验出生日期是否合法:
    if(time>currentTime||birthday!==newBirthday){
        console.log("非法生日");
        return;
    }
    //4.最后判断校验码是否正确
    for(let i=0;i<17;i++){
        sum+=ID.substr(i,1)*arrInt[i];
    }
    residue = arrCh[sum%11];
    // console.log(residue);
    if(residue!==ID.substr(17,1)){
        console.log("非法身份证哦");
        return;
    }

    // return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女");
    console.log(city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女"));
}
checkID(ID);