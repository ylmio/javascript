window.onload=function(){
    const scriptMsg=[
        {msg:"不合格"},
        {msg:"很差"},
        {msg:"一般"},
        {msg:"中等"},
        {msg:"优秀"},
    ];
    let lis = document.getElementsByTagName("li");
    for(let i=0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onmouseover=function () {
            console.log(this.index);
            if(this.index===0){
                document.getElementById("point").innerText="1分";
                document.getElementById("script").innerText=scriptMsg[0].msg;
            }else if(this.index===1){
                document.getElementById("point").innerText="2分";
                document.getElementById("script").innerText=scriptMsg[1].msg;
            }else if(this.index===2){
                document.getElementById("point").innerText="3分";
                document.getElementById("script").innerText=scriptMsg[2].msg;
            }else if(this.index===3){
                document.getElementById("point").innerText="4分";
                document.getElementById("script").innerText=scriptMsg[3].msg;
            }else if(this.index===4){
                document.getElementById("point").innerText="5分";
                document.getElementById("script").innerText=scriptMsg[4].msg;
            }
        }
    }
};