export function priority (op){
    switch (op){
        case '*': 
        case '/': return 2;
        case '+': 
        case '-': return 1;
        default:  return 0;
    }
}

export function is_operator(sym) {
    switch (sym){
        case '*': 
        case '/': 
        case '+': 
        case '-': return true;
        default:  return false;
    }
}

export function is_digit(ch) {
    if(ch >= '0' && ch <= '9'){
        return true;
    }
    return false;
}

export function calculate (second, first, oper){
    switch(oper){
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': if(second == 0)
                        display.value = "Division by zero!";
                  else
                        return parseFloat(first / second, 10);
        default: 0;
    }
}

export function is_error(str){ 
    return str === "Error: Invalid expression";
}