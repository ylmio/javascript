function Tools(){
    //私有的数据
    var money = 1000;
    //提供操作私有数据的函数
    earn=function(){
        money*=10;
        console.log("赚到了"+money+"元")
    };
    send=function(){
        money--;
        console.log("还剩下"+money+"元")
    };
    return{
        //将数据暴露出去
        "earn":earn,
        "send":send
    }
}