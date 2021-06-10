
$(function(){
    let COSTHtml = `
    <ul id="openItems">
        <li><b>1.</b>选择<b>"与手机号码统一收费"</b>选项后，定位器号码将于"收费号码绑定"，每月产生的费用，将合并到收费号码账户一并收取。</li>
        <li><b>2.</b>若收费号码属于集团账户，eSIM号码将遵循中国联通集团客户业务办理规则实施管理。</li>
        <li><b>3.</b>非联通号码（例如收费号码是移动、或电信的号码）不支持统一收费。</li>
        <li><b>4.</b>不支持跨地市合账, 合账号码与办理号码须同一归属地。</li>
        <li><b>5.</b>合账号码必须为本人名下号码。</li>
    </ul>`;
    $("#opentips").click(function(){
        myAlert(COSTHtml);
    });
    $("#switchModel").click(()=>{
        //选中true 未选 false
        let checkstatus = $("#switchModel").is(':checked');
        if(checkstatus){//true
            $("#paypanel").fadeIn(500);
        }else {
            $("#paypanel").fadeOut(500);
        }
    });
    $("#identifyButton").click(function(){
        //获取统一收费号码
        var result = checkPhones($("#payNumber").val());
        if(result==false){
            DIALOG_UTIL.showTypeDialog("error", "您输入的收费号码错误，请重新输入！");
            return;
        }
        var params = {
            eid:"46464646",
            imei:"979797",
            name:"645646",
            certCode:"79797",
            serialNumber:"w3443",
            eparchyCode:"323423432",
        };
        var succ1 = function(data){
            console.log("ddddd");
        };
        var err1 = function(){
            //弹出遮罩层
            DIALOG_UTIL.showTypeDialog("error", "出错了");
        };
        var init1 = new AjaxObj().init(typeN,BASICAPI.unifiedChargeCaptchaURI, params, succ1,err1);
        init1.callAjax();  
    });
});