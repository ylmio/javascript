
let stuArray = ["李华","张明","崔浩","李华"];
function unique(arr){
    let obj = [];
    arr.forEach(function(i){
        if(obj.indexOf(i)==-1){
            obj.push(i);
        }
    });
    return obj;
    console.log(obj);
}

unique(stuArray);