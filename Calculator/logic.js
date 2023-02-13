const display = document.getElementById("display");
const result = document.getElementById("upper");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");


import {
    priority,
    is_digit,
    is_error,
    calculate,
    is_operator
}
from './module.js'

function is_valid(str){
    let is_perv_char_operator = false;
    for(let i = 0; i < str.length; ++i){
        if(((str[0] === '+' || str[0] === '*' || str[0] === '/') && is_digit(str[1])) || is_operator(str[str.length - 1])){
            return false;
        }
        else if(!is_digit(str[i]) && !is_operator(str[i])){
            return false;
        }
        else if(is_operator(str[i]) && !is_perv_char_operator){
            is_perv_char_operator = true;
        }
        else if(is_operator(str[i]) && is_perv_char_operator){
            return false;
        }
        else if(is_operator(str[str.length - 1]))
        {
            return false;
        }
        else{
            is_perv_char_operator = false;
        }
    }
    return true;
}

function postfix_to_infix(infix){
    let numbers = [];
    let operations = [];
    let minus_sym = (infix[0] === '-' ? true : false);
    let i = (minus_sym ? 1 : 0);

    for(; i < infix.length; ++i){
        if(is_digit(infix[i])){
            let temp_num = "";

            while(infix.length > i && is_digit(infix[i])){
                temp_num = temp_num + infix[i++];
            }
            --i;
            let integer = parseInt(temp_num, 10);
            if(minus_sym)
                integer = integer * (-1);
            numbers.push(integer);
            minus_sym = false;
        }
        else if(is_operator(infix[i])){
            while(operations.length > 0 && (priority(infix[i]) <= priority(operations[operations.length - 1]))){
                numbers.push(calculate(numbers.pop(), numbers.pop(), operations.pop()));
            }
            operations.push(infix[i]);
        }
    }
    while(operations.length > 0){
        numbers.push(calculate(numbers.pop(), numbers.pop(), operations.pop()))
    }
    return numbers.pop();
}

window.catchbutton = (value) => {
    display.value = display.value + value.innerHTML;
    result.innerHTML = (!is_valid( display.value) ? "Error: Invalid expression" : "");
    equal.disabled = (is_error(result.innerHTML) ? true : false);
}

display.addEventListener("keyup", function (key) {
    result.innerHTML = (!is_valid(key.target.value) ? "Error: Invalid expression" : "");
    equal.disabled = (is_error(result.innerHTML) ? true : false);
    if(key.key === "Enter"){
        equal.click();
    }
})

clear.addEventListener("click", function(){
    display.value = "";
    result.innerHTML = "";
});

equal.addEventListener("click", function (){
    result.innerHTML = postfix_to_infix(display.value);
});


  