function eval() {
    // Do not use eval!!!
    return;
}
const expressionCalculator = (expr) => {
    let res = [], stack = [], x, y;
    const rpn = str => {
        let arr = str.split(str.length > 3 ? ' ' : ''), stack = [], res = [], i;
        let priority = {'+': 0, '-': 0, '/': 1, '*': 1};
        arr.filter(elem => elem != '').forEach(elem => {
            if (!isNaN(elem)) {
                res.push(elem);
            } else if (elem === '(') {
                stack.push(elem);
            } else if (elem === ')') {
                let find = false;
                while (!find && stack.length > 0) {
                    i = stack.pop();
                    if (i === '(') find = true;
                    else res.push(i);
                }
            } else  { 
                while (stack.length > 0 && priority[stack[stack.length - 1]] >= priority[elem]) res.push(stack.pop());
                stack.push(elem);
            }
        });
        
        while (stack.length > 0) res.push(stack.pop());
        return res;
    };

    res = rpn(expr);
    if (res.join('').indexOf('(') >= 0 || res.join('').indexOf(')') >= 0) throw "ExpressionError: Brackets must be paired";
    res.forEach(elem => {
        if (!isNaN(elem)) {
            stack.push(+elem)
        } else {
            y = stack.pop();
            x = stack.pop();
          switch (elem) {
            case '+' :
              stack.push(x + y);
              break;
            case '-' :
              stack.push(x - y);
              break;
            case '*' :
              stack.push(x * y);
              break;
            case '/' :
              if (y === 0) throw "TypeError: Division by zero.";
              stack.push(x / y);
              break;
            }
        }
    });
    return stack[0];
}


module.exports = {
    expressionCalculator
}