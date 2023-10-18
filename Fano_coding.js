
const Node = function (char,numValue) {
    this.mainValue = char;
    this.numValue = numValue;
    this.binValue = "";
    }

let alphabet2={
    a:0.25,
    b:0.25,
    c:0.15,
    d:0.13,
    e:0.12,
    f:0.1
}
let alphabet3={
    a:0.082,
    b:0.015,
    c:0.028,
    d:0.043,
    e:0.127,
    f:0.022,
    g:0.02,
    h:0.061,
    i:0.07,
    j:0.0015,
    k:0.0077,
    l:0.04,
    m:0.024,
    n:0.067,
    o:0.075,
    p:0.019,
    q:0.00095,
    r:0.06,
    s:0.063,
    t:0.091,
    u:0.028,
    v:0.0098,
    w:0.024,
    x:0.0015,
    y:0.02,
    z:0.00074
}
alphabet3={
    a:0.18,
    b:0.09,
    c:0.06,
    d:0.11,
    e:0.04,
    f:0.05,
    g:0.08,
    h:0.13,
    i:0.08,
    j:0.16,
    k:0.12
}




decode(encode("aaa",alphabet3),alphabet3)
//  decode(encode("abcd",alphabet2),alphabet2)


calcL(alphabet3)
calcH(alphabet3)


function encode(string, alphabet){
    let encodedStr=""
    let table=createTablesWithCharKeys(alphabet)
    console.log(table)
    for(let ch of string){
        if(table.hasOwnProperty(ch))
            encodedStr+=table[ch]
        else{
            throw new Error("Cannot encode with this alphabet");
        }
    }
    console.log(encodedStr)
    return encodedStr

}


function decode(string, alphabet){
    let decodedStr=""
    let table=createTablesWithCodesKeys(alphabet)
    let code=""
    let i=0
    for(let bit of string){
        code+=bit
        if(table.hasOwnProperty(code)) {
            decodedStr += table[code]
            code=""
        }else if (i === string.length-1){
            throw new Error("Cannot decode this string");
        }
        i++
    }
    console.log(decodedStr)
    return decodedStr

}




function createTablesWithCharKeys(alphabet){
    let array=createArray(alphabet)
    let table={}

    for(let node of array){
        table[node.mainValue]=node.binValue
    }
    return table

}

function createTablesWithCodesKeys(alphabet){
    let array=createArray(alphabet)
    let table={}

    for(let node of array){
        table[node.binValue]=node.mainValue
    }
    return table

}

function createArray(alphabet){
    let array=initArray(alphabet);
    return divideAndGetCode(array)
}




function divideAndGetCode(array){
    let arr=[]
    if(array.length===2){
        array[0].binValue+="1"
        array[1].binValue+="0"
        return array
    }else if (array.length===1){
        array[0].binValue+="1"
        return array

    }else{
        let diff=sumOf(array) / 2-array[0].numValue;
        for (let i=1;i< array.length;i++) {
            if (Math.abs(diff - array[i].numValue) <= Math.abs(diff)) {
                diff -= array[i].numValue
            } else {
                for (let j in array) {
                    if (j < i)
                        array[j].binValue += "1"
                    else
                        array[j].binValue += "0"
                }
                arr = divideAndGetCode(array.slice(0, i)).concat(divideAndGetCode(array.slice(i)))
                break;
            }

        }
    }
    return arr;
}

function sumOf(array) {
    let sum=0
    for (let i of array){
            sum+=i.numValue
        }
    return sum
}


function initArray(alphabet){
    let array=[]
    for(let key of Object.keys(alphabet)){
        array.push(new Node(key,alphabet[key]))
    }
    sortArr(array)
    return array;
}

function sortArr(arr){
    arr.sort(function (a, b) {
        if (a.numValue > b.numValue) {
            return -1;
        }
        if (a.numValue < b.numValue) {
            return 1;
        }
        return 0;
    });
}

function calcL(alphabet){
    let L=0
    let table=createTablesWithCharKeys(alphabet)
    for(let char of Object.keys(alphabet)){

        L+=alphabet[char]*table[char].length
    }
    console.log("L = "+L)
    return L

}
function calcH(alphabet){
    let H=0
    for(let char of Object.keys(alphabet)){

        H-=alphabet[char]*getBaseLog(2,alphabet[char])
    }
    console.log("H = "+H)
    return H
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
