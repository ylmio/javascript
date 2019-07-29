let stuArray = ["李华","张明","崔浩","李华"];

function unique(arr){
    let obj = {};
    arr.filter(function(ele){
        if(!obj[ele]){
            obj[ele] = true;
            return true;
        }
    });
    console.log(obj);
}

unique(stuArray);