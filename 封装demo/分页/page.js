var pageNation;
pageNation = (function () {
    function extend(target, source) {
        for (var obj in source) {
            target[obj] = source[obj];
        }
        return target;
    }
    function pageNation(options) {
        var defaultOptions = {
            el: "body",//分页父容器
            page: 1,
            size: 10,
            total: 0,
            styUrl: 'style.css',
            callback: null,
            IsShowBtn: {//设置需要显示的按钮
                choosePageSize: true,//是否显示下拉选项
                IsShowPrevOrNextBtn: true,//否显示上一页下一页按钮
                IsShowEnterBtn: true,//是否显示跳转输入
                IsShowTotalPage:true,//是否显示总页数
            }
        };
        this.options = extend(defaultOptions, options) || {};
        this.options.el = document.querySelectorAll(this.options.el)[0];
        this.pageT = Math.ceil(this.options.total / this.options.size);
        this.init();
        if (!document.querySelector("#dynamic-style")) {
            this.pageStyle();
        }
        //this.options.callback(1,self.options.size,self.options.total);
    }

    var proto = pageNation.prototype || {};
    proto.rander = function (page, size, total) {
        this.options.page = !!page ? page : 1;
        this.options.size = !!size ? size : 10;
        this.options.total = !!total ? total : 0;//
        this.pageT = Math.ceil(this.options.total / this.options.size);
        this.init();
        this.page_nation = null;
    };
    proto.init = function () {
        var self = this;
        var pageNum = function (page) {//创建分页器
            return (function () {
                let ol = document.createElement("ol");
                ol.classList.add("page-ol");
                let p = !!page ? page : 1;
                let tPage = Math.ceil(self.options.total / self.options.size);
                let s = p <= 3 ? 1 : p > (tPage - 3) ? tPage - 4 : p - 2;
                s=s==0?1:s;
                for (let i = s; i < (s + 5); i++) {
                    if (i > tPage) {
                        break;
                    }
                    let li = document.createElement("li");
                    li.innerText = i;
                    if (i == p) {
                        li.classList.add("hover");
                    }
                    ol.appendChild(li);
                }
                return ol;
            })(page);
        };
        var sizeNum = function (size) {//重置size
            return (function () {
                let select = document.createElement("select");
                select.setAttribute("class", "page-Select");
                let s = !!size ? size : 10;
                //let tPage=Math.ceil(self.options.total/self.options.size);
                for (let i = 5; i <= (5 * 4); i += 5) {
                    let option = document.createElement("option");
                    option.value = i;
                    option.innerText = i;
                    if (i === self.options.size) {
                        option.setAttribute("selected", "selected");
                    }
                    select.appendChild(option);
                }
                return select;
            })(size);
        };
        var prevBtn = function () {//上一页按钮
            return (function () {
                let button = document.createElement("span");
                button.setAttribute("class", "prev-btn");
                button.innerText = "上一页";
                if (self.options.page == 1) {
                    button.classList.add("disabled")
                };
                return button;
            })();
        };
        var nextBtn = function () {//下一页按钮
            return (function () {
                let button = document.createElement("span");
                button.setAttribute("class", "next-btn");
                button.innerText = "下一页";
                if (self.options.page == self.pageT) {
                    button.classList.add("disabled")
                }
                ;
                return button;
            })();
        };
        var pageMark = function () {//页码标识
            return (function () {
                let span = document.createElement("span");
                span.setAttribute("class", "pageMark");
                span.innerHTML = "<strong>" + self.options.page + "</strong> / <strong>" + Math.ceil(self.options.total / self.options.size) + "</strong>";
                return span;
            })();
        };
        var enterBtn = function () {//跳转按钮
            return (function () {
                let button = document.createElement("span");
                button.setAttribute("class", "enter-btn");
                let ipt = document.createElement("input");
                ipt.value = self.options.page;
                ipt.setAttribute("type", "text");

                let b = document.createElement("span");
                b.setAttribute("class", "enterBtn");
                b.innerText = "跳转";

                button.appendChild(ipt);
                button.appendChild(b);

                return button;
            })();
        };
        let page_nation = self.options.el.querySelector(".page-nation");
        if (page_nation != null && page_nation != "undefind") {
            page_nation.innerHTML = "";
        }
        else {
            page_nation = document.createElement("div");
            page_nation.classList.add("page-nation");
            self.options.el.appendChild(page_nation);
        }
        page_nation.appendChild(new pageNum(self.options.page));
        self.options.IsShowBtn.choosePageSize&&page_nation.appendChild(new sizeNum(self.options.size));
        self.options.IsShowBtn.IsShowPrevOrNextBtn&&page_nation.appendChild(new prevBtn());
        self.options.IsShowBtn.IsShowPrevOrNextBtn&&page_nation.appendChild(new nextBtn());
        page_nation.appendChild(new pageMark());
        self.options.IsShowBtn.IsShowEnterBtn&&page_nation.appendChild(new enterBtn());

        self.page_nation = document.querySelector(".page-nation");

        this.switchPage(self.options.callback);
        this.switchSize(self.options.callback);
        return self;
    };
    proto.pageStyle = function () {
        let headDoc = document.querySelector("head");
        var linkTag = document.createElement("link");
        var cssURL = this.options.styUrl;
        linkTag.id = 'dynamic-style';
        linkTag.href = cssURL;
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('media', 'all');
        linkTag.setAttribute('type', 'readme1/css');
        headDoc.appendChild(linkTag);
    };
    proto.switchPage = function (fun) {
        let self = this;
        let lis = this.page_nation.children[0].children;
        for (let i = 0, len = lis.length; i < len; i++) {
            lis[i].onclick = function () {
                self.options.page = this.innerText;
                self.rander(self.options.page, self.options.size, self.options.total);
            };
        }
        this.options.el.querySelectorAll(".prev-btn")[0].onclick = function (e) {
            //console.time("rr");
            self.options.page = --self.options.page;
            self.rander(self.options.page, self.options.size, self.options.total);
            //console.timeEnd("rr");
        };
        this.options.el.querySelectorAll(".next-btn")[0].onclick = function (e) {
            self.options.page = ++self.options.page;
            self.rander(self.options.page, self.options.size, self.options.total);
        };
        this.options.el.querySelectorAll(".enterBtn")[0].onclick = function (e) {
            let val = this.previousElementSibling.value;
            if (!val || val > self.pageT || val < 1) {
                alert("参数超出范围！");
                return false;
            } else {
                self.options.page = val;
                self.rander(self.options.page, self.options.size, self.options.total);
            }
        };
        fun(self.options.page, self.options.size, self.options.total);
    };
    proto.switchSize = function (fun) {
        let self = this;
        let lis = this.page_nation.children[1];
        lis.onchange = function () {
            self.options.size = Number(this.value);
            self.rander(1, self.options.size, self.options.total);
            fun(1, self.options.size, self.options.total);
        }
    };
    return pageNation;
})();
