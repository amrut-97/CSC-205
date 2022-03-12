/*
 * Binary search in JavaScript.
 * Returns the index of of the element in a sorted array or (-n-1) where n is the insertion point for the new element.
 * Parameters:
 *     ar - A sorted array
 *     el - An element to search for
 *     compare_fn - A comparator function. The function takes two arguments: (a, b) and returns:
 *        a negative number  if a is less than b;
 *        0 if a is equal to b;
 *        a positive number of a is greater than b.
 * The array may contain duplicate elements. If there are more than one equal elements in the array, 
 * the returned value can be the index of any one of the equal elements.
 */

let binarySearch = function (ar, el, compare_fn) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = Math.floor(n + m) / 2;
        var cmp = compare_fn(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

function compare_number(a, b) {
    return a - b;
}

let checkNumSearch = function (){
    
    let inp_val = document.getElementById('num_inp').value;
    let inp_arr = [1, 2, 2, 5, 9, 11, 12, 12, 15, 20, 25, 40, 41, 41, 80];

    console.log(inp_val);

    if(inp_val == ""){
        alert("Please enter an integer first to be able to search for it!");
        return;
    }
        
    if(binarySearch(inp_arr, inp_val, compare_number) >= 0)
        alert(inp_val + " exists in the array!");
    else
        alert(inp_val + " doesn't exist in the array!");
}