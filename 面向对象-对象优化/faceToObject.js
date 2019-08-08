// 五一节快到了，你们全家都想去国外玩一下，首先你们需要确定去哪儿，然后再决定怎么去(跟团，或者自由行),然后需要带一些什么零食在路上(水，薯片，牙土豆等等)，然后你们在当天去机场怎么去(滴滴出行或者坐地铁)，然后你们就可以飞到国外。突然，你爸说，搞这些东西好复杂呀，不如我们叫一个秘书来整理这一切吧(前提是要有一个秘书哈),然后我们就直接负责到国外就行，接着你们都不用管关于旅行的事了然后愉快的开始玩吃鸡。
// 其实这就是一个面向对象。你不需要知道怎么去国外，整个过程你不用管，你所要关心的就是安全到达国外就可以，而这个过程就交给了你爸爸的秘书这个对象来完成了。所以我们面向的就是对象(你爸爸的秘书),这就是面向对象的思想。
// 用代码可以这样描述:

function TravelAbroad(){
    this.travelMode = "Free-Exercise";
    this.food = ["water","Potato chips","Tooth potatoes"];
    this.transportionWay = "di-di";
    this.goAirport = function(){
        console.log("we go to airport by" + this.transportionWay);
    };
    this.goAbroad = function(){
        this.goAirport();
        console.log("安全到达国外");
    }
};

let personFather = new TravelAbroad();
// personFather.goAbroad();
personFather.goAirport();