var changeStep = function () {
    //参数
    CACHE_UTIL.setLocalItem("eid", $.trim($("#eid").text()));
    CACHE_UTIL.setLocalItem("imei", $.trim($("#imei").text()));
    var param = {};
    param.eid = $.trim($("#eid").text());
    param.imei = $.trim($("#imei").text());
    param.tradeTypeCode = 20;

    //成功
    var succFunc = function (data) {
        param.subscribeId = data.args.subscribeId;
        //存在订单id
        if(param.subscribeId!=null&&param.subscribeId!=""){
            CACHE_UTIL.setSessionItem("subscribeId", data.args.subscribeId);
        }
        //第一次做补换卡
        if (data.args.flag == 1) {
            location.href = "../../../../mobile/html/esim/repairChangeCard.html";
        } else if (data.args.flag == 2) {
        //在途补换卡    
            changeCard(param);
        } else {
        //补换卡结果
            location.href = "../../../../mobile/html/esim/openCardCallback.html?iccid=" + data.args.iccid + "&phone=" + data.args.phone;
        }
    }
    //失败
    var errorFunc = function (data) {
        DIALOG_UTIL.showTypeDialog("error", "网络繁忙，请稍后重试！");
    }

    //实例化
    var judgeAjax = new AjaxObj().init("post", judgeRestUrl, param, succFunc, errorFunc);

    //调用
    judgeAjax.callAjax();
}


  $(function () {
    TimeDown("show", 3600000)
  });
  /*
   时间倒计时
   TimeDown.js
   */
  export let TimeDown(id, value) {
    //倒计时的总秒数
    let totalSeconds = parseInt(value / 1000);
 
    //取模（余数）
    let modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    let hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    let minutes = Math.floor(modulo / 60);
    //秒
    let seconds = modulo % 60;
 
    hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;
 
    //输出到页面
    document.getElementById(id).innerHTML = hours + ":" + minutes + ":" + seconds;
    //延迟一秒执行自己
    if(hours == "00" && minutes == "00" && parseInt(seconds)-1<0){
 
    }else{
      setTimeout(function () {
        TimeDown(id, value-1000);
      }, 1000)
    }
  }

