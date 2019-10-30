//type:请求的类型"get"或者"post"
//url:请求的地址
//data:{usrname:zhangsan,age:15}这样的格式
//dataType:请求返回的数据格式
//async:true表示同步，false表示异步
function myAjax(obj){
    var defaults = {
        type:"get",
        url:"#",
        data:{},
        dataType:"json",
        success:function(result){
            console.log(result);
        },
        async:true
    };
    for(var key in obj){
        defaults[key] = obj[key];
    }
    var xhr = null;
    if(window.XHRHttpRequest){
        xhr = new XHRHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    var params = "";
    for(var attr in defaults.data){
        params += attr +"=" +defaults.data[attr] + "&";
    }
    if(params){
        params = params.substring(0,params.length-1);
    }
    if(defaults.type=="get"){
        defaults.url += "?"+params;
    }
    xhr.open(defaults.type,defaults.url,defaults.async);
    if(defaults.type=="get"){
        xhr.send(null);
    }else if(defaults.type=="post"){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(params);
    }
    if(defaults.async){
        xhr.onreadystatechange = function(){
            if(xhr.readyState ==4&&xhr.status==200){
                var result = null;
                if(defaults.dataType=="json"){
                    result = xhr.responseText;
                    result = JSON.parse(result);
                }else if(defaults.dataType=="xml"){
                    result = xhr.responseXML;
                }else{
                    result = xhr.responseText;
                }
                defaults.success(result);
            }
        }
    }else{
        if(xhr.readyState ==4&&xhr.status==200){
            var result = null;
            if(defaults.dataType=="json"){
                result = xhr.responseText;
                result = JSON.parse(result);
            }else if(defaults.dataType=="xml"){
                result = xhr.responseXML;
            }else{
                result = xhr.responseText;
            }
            defaults.success(result);
        }
    }
}

/**
 * 上面方法的参数是一个对象obj,obj中的属性，覆盖defaults中的属性
 * 如果有一些属性只存在obj中，会给defaults中添加这个属性
 * 如果有一些属性obj和defaults中都存在，则obj中的属性覆盖defaults中的属性
 * 如果有一些属性只在defaults中存在，在obj中不存在，defaults中的这些属性保留预定义的值
 *
 * */