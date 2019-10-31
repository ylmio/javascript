/**
 * 定时任务
 * 间隔时间,执行次数,要带的参数,要执行的函数.
 */
var TimingTask = function(time,count,param,fun){
    this.id = -1;           //编号
    this.exectionCount = 0; //执行了多少次
    if(typeof time === 'function'){
        this.fun = time;
        this.time = 3000;
        this.count = -1;
    }else
    if(typeof param === 'function'){
        this.time = time;
        this.count = count;
        this.fun = param;
    }else
    if(typeof count === 'function'){
        this.time = time*1000;
        this.fun = count;
        this.count = -1;
    }else{
        this.time = time*1000;
        this.count = count;
        this.param = param;
        this.fun = fun;
    }
}
TimingTask.prototype = {
    add : function(time,count,fun){ //间隔秒数,执行次数,执行方法
        if(typeof time === 'function'){
            this.fun = time;
        }else
        if(typeof count === 'function'){
            this.time = time;
            this.fun = count;
        }else{
            this.time = time;
            this.count = count;
            this.fun = fun;
        }
    },
    start : function(){
        if(this.id === -1){ //说明还没开始
            this.exectionCount = 0;
            this.id = setInterval((function(param) {
                return function() {
                    if(param.count > 0){
                        if(param.exectionCount >= param.count){
                            param.stop();
                            return;
                        }
                    }
                    param.exectionCount ++;
                    param.fun(param);
                }
            })(this), this.time);
        }
    },
    stop : function(){
        clearInterval(this.id);
        this.id = -1;
    }
};

//使用方法
var chart = {test:'testString'};
var change3D = new TimingTask(0.4,1,chart,function(chartObj){   //0.4秒后改回3D效果,执行1次就够了.
    var chart = chartObj.param;
    alert(chart.test);
});
change3D.start();  //执行