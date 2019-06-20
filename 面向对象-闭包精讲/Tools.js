function Tools(){
    var money = 1000;
    earn=function(){
        money*=10;
        console.log("赚到了"+money+"元")
    };
    send=function(){
        money--;
        console.log("还剩下"+money+"元")
    };
    return{
        "earn":earn,
        "send":send
    }
}