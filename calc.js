/**
 * 暴力破解
 */
let arr = [
    [ 9, 7, 8, 0, 0, 0, 6, 4, 5 ],
    [ 3, 1, 2, 6, 0, 0, 9, 7, 8 ],
    [ 6, 4, 5, 9, 0, 0, 3, 1, 2 ],
    [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 8, 9, 7, 2, 3, 1, 5, 6, 4 ],
    [ 2, 3, 1, 5, 6, 4, 8, 9, 7 ],
    [ 5, 6, 4, 8, 9, 7, 2, 3, 1 ]
];
let normal = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

function calc() {
    let possible = {};
    for (let i = 0; i < 9; i++) {
        let diff = normal.filter(item => !arr[ i ].includes(item));//每行缺少的数
        if (diff.length !== 0) {
            possible[ i ] = mix(diff);//每行缺少的数进行排列
            console.log(`第${i + 1}行的排列数量:${possible[ i ].length}`);
        }
    }
    let allCombine = [];
    for (let i in possible) {
        allCombine = combine(i, allCombine, possible[ i ]);
    }
    console.log('总的组合数量:' + allCombine.length);
    for (let item of allCombine) {
        let temp = replace(item, arr);
        if (checkRow(temp) && checkCol(temp) && checkGroup(temp)) {//3个规则全部通过
            console.log('正确的解');
            console.log(temp);
        } else {
            console.log('错误的解');
        }
    }
}

//行检测
function checkRow(arr) {
    for (let i = 0; i < 9; i++) {
        let m = new Set(arr[ i ]);
        if (m.has(0) || m.size !== 9) {
            console.log('行错误');
            return false;
        }
    }
    return true;
}

//列检测
function checkCol(arr) {
    for (let i = 0; i < 9; i++) {
        let m = new Set([ arr[ 0 ][ i ], arr[ 1 ][ i ], arr[ 2 ][ i ], arr[ 3 ][ i ], arr[ 4 ][ i ], arr[ 5 ][ i ], arr[ 6 ][ i ], arr[ 7 ][ i ], arr[ 8 ][ i ] ]);
        if (m.has(0) || m.size !== 9) {
            console.log('列错误');
            return false;
        }
    }
    return true;
}

//块检测
function checkGroup(arr) {
    for (let i = 0; i < 9; i = i + 3) {
        for (let j = 0; j < 9; j = j + 3) {
            let m = new Set([ arr[ i ][ j ], arr[ i ][ j + 1 ], arr[ i ][ j + 2 ],
                arr[ i + 1 ][ j ], arr[ i + 1 ][ j + 1 ], arr[ i + 1 ][ j + 2 ],
                arr[ i + 2 ][ j ], arr[ i + 2 ][ j + 1 ], arr[ i + 2 ][ j + 2 ] ]);
            if (m.has(0) || m.size !== 9) {
                console.log('块错误');
                return false;
            }
        }
    }
    return true;
}

//全排列
function mix(arr) {
    let newArr = [];
    for (let i of arr) {
        let temp = [];
        if (newArr.length === 0) {
            temp = [ [ i ] ];
        }
        for (let j = 0; j < newArr.length; j++) {
            for (let k = 0; k <= newArr[ j ].length; k++) {
                let x = [ ...newArr[ j ] ];
                x.splice(k, 0, i);
                temp.push(x);
            }
        }
        newArr = temp;
    }
    return newArr;
}

//组合
function combine(index, arr1, arr2) {
    let temp = [];
    if (arr1.length === 0) {
        for (let item of arr2) {
            temp.push({
                [ index ]: item
            })
        }
    }
    for (let i of arr2) {
        for (let j of arr1) {
            temp.push({ ...j, ...{ [ index ]: i } })
        }
    }
    // console.log('组合数量:' + temp.length);
    // console.log('组合:' + JSON.stringify(temp));
    return temp;
}

//尝试放入
function replace(obj, arr) {
    let temp = [ [ ...arr[ 0 ] ], [ ...arr[ 1 ] ], [ ...arr[ 2 ] ], [ ...arr[ 3 ] ], [ ...arr[ 4 ] ], [ ...arr[ 5 ] ], [ ...arr[ 6 ] ], [ ...arr[ 7 ] ], [ ...arr[ 8 ] ] ];
    Object.keys(obj).map(item => {
        let n = 0;
        for (let i = 0; i < 9; i++) {
            if (temp[ item ][ i ] === 0) {
                temp[ item ][ i ] = obj[ item ][ n++ ]
            }
        }
    });
    // console.log(temp);
    return temp;
}

// calc();
// let n=new Date().getTime();
// mix([ 1,2,3,4,5,6,7,8,9]);
// console.log(new Date().getTime()-n)