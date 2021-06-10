function unbindEvent(ele,type,event){
    if(ele.removeEventListener){//非ie和非ie9
        ele.removeEventListener(type,event,false);
    }else if(ele.detachEvent){
        ele.detachEvent("on"+type,event);
    }else{
        ele["on"+type]=null;
    }
}