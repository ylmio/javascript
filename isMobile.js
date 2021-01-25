let pho = "13007507356";
isMobile=(mobile)=>{
    //以数字为开头，数字结尾
    //以 1 开头
    //都是 11 个数字
    //第二位是 3 至 9 的数字
    let rgb = /^1[3-9]\d{9}$/;
    if(!rgb.test(mobile)){ `*`
       console.log("手机号码不合法")
    }
}

isMobile(pho);

let countDown = (num)=>{
    while (num-- >0){
        console.log(num);
    }
}

countDown(5);