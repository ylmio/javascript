function TabsFn(){
    //属性
    this.lis = $("tab_head").getElementsByTagName("li");
    this.contents = $("tab_content").getElementsByClassName("dom");
}
//原型对象
TabsFn.prototype = {
    _init:function () {
        //1.设置索引
        this.setId();
        //2.绑定事件
        this.bindEvent();
    },

    //设置索引（id）
    setId:function () {
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].id = i;
        };
    },

    //绑定事件
    bindEvent:function () {
        //备份指针
        var self = this;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].onmouseover = function(){
                //2.1 所有的都不被选中
                for(var j=0;j<self.lis.length;j++){
                    self.lis[j].className = "";
                    self.contents[j].style.display = "none";
                }
                //2.2 当前的li被选中
                this.className = "selected";
                self.contents[this.id].style.display = "block";
            }
        }
    }
};

var tab = new TabsFn();
tab._init();

/*
* 根据id获取标签
* @param {string}id
* @return {object}
* */
function $(id){
    return typeof id === "string"?document.getElementById(id):null;
}