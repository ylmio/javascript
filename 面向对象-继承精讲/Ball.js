function Ball(options) {
    this._init(options);
}

Ball.prototype = {
    _init:function (options) {
        //  1.必要的属性
        this.parentId = options.parentId;
        this.left = options.left;
        this.top = options.top;
        this.r = 60;
        this.backgroundColor = options.backgroundColor || "red";

        //  2.小球的变化量
        this.dX = _.random(-5,5);
        this.dY = _.random(-5,5);
        this.dR = _.random(1,3);
    },

    render: function () {
        var parentNode = document.getElementById(this.parentId);
        var childNode = document.createElement("div");
        parentNode.appendChild(childNode);

        childNode.style.position = "absolute";
        childNode.style.left = this.left + "px";
        childNode.style.top = this.top + "px";
        childNode.style.width = this.r + "px";
        childNode.style.height = this.r + "px";
        childNode.style.borderRadius = "50%";
        childNode.style.backgroundColor = this.backgroundColor;
    },

    update:function () {
        this.left += this.dX;
        this.top += this.dY;
        this.r -= this.dR;
        //  判断
        if(this.r<=0){
            this.r = 0;
            //把小球移除掉
            ballArr = _.without(ballArr,this);
        }
    }
}