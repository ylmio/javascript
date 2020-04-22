function alert(options){
    this._init(options)
}
alert.prototype = {
    //属性
    _init: function (options) {
        //父标签
        this.parentId = options.parentId;

        //自身属性：宽、高、圆角、边框、背景色
        this.width = options.width || 500;
        this.height = options.height || 120;
        this.backgroundColor = options.backgroundColor || "#fff";
        this.borderRadius = options.borderRadius || "10";
        this.border = options.border || "1px solid #ccc";
    },

    //行为
    render: function () {
        //获取父标签
        var parentEle = document.getElementById(this.parentId);
        parentEle.style.position = "relative";

        //创建弹框
        var childEle = document.createElement("div");
        parentEle.appendChild(childEle);

        childEle.style.width = this.width + "px";
        childEle.style.height = this.height + "px";
        childEle.style.backgroundColor = this.backgroundColor;
        childEle.style.borderRadius = this.borderRadius + "px";
        childEle.style.border = this.border;
        childEle.style.position = "absolute";


    }
}

