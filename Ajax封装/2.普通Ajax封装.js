// https://blog.csdn.net/sleepwalker_1992/article/details/80973694
//type:请求的类型
//url:请求的地址
//parmas:username=zhangsan&age=15 这样的格式
//dataType:请求返回的数据格式
// async:true表示同步，false表示异步
function myAjax(type,url,params,dataType,callback,async) {
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(type=="get"){
        if(params&&params!=""){
            url += "?"+params;
        }
    }
    //初始化一个请求
    xhr.open(type,url,async);
    if(type=="get"){
        xhr.send(null);
    }else if(type=="post"){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }
    if(async){
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result = null;
                if(dataType=="json"){
                    result = xhr.responseText;
                    result = JSON.pares(result);
                }else if(dataType=="xml"){
                    result = xhr.responseXML;
                }else{
                    result = xhr.responseText;
                }
                if(callback){
                    callback(result);
                }
            }
        }
    }else{
        if(xhr.readyState==4&&xhr.status==200){
            var result = null;
            if(dataType=="json"){
                result = xhr.responseText;
                result = JSON.pares(result);
            }else if(dataType=="xml"){
                result = xhr.responseXML;
            }else{
                result = xhr.responseText;
            }
            if(callback){
                callback(result);
            }
        }
    }
}

