//js数组对象push前怎么判断是否存在该元素
const a = [
    {
        id:1,
        name:'a'
    },
    {
        id:2,
        name:'b'
    }
];

const b = {
    id:3,
    name:'c'
};


function push(list,action){
   var isExit = false;//action 是否存在,默认为不存在false
   for(var i=0;i<list.length;i++){
       if (list[i].id===action.id){
           isExit = true;
           break;
       }
   };
   console.log(!isExit)
   !isExit&&list.push(action);//当action不存在,才执行push
   console.log(list)
}

push(a,b);