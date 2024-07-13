//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = 'OutOfRangeError';
    }
}

class InvalidExprError extends Error {
    constructor() {
        super('Expression should not have an invalid combination of expression');
        this.name = 'InvalidExprError';
    }
}

function evalString(expression) {
    try {
        // Check for invalid characters
        if (/[^0-9+\-*/\s]/.test(expression)) {
            const invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        // Check for invalid operator combinations
        if (/[+\-*/]{2,}/.test(expression)) {
            throw new InvalidExprError();
        }

        // Check for invalid starting and ending characters
        if (/^[+\-*/]/.test(expression)) {
            throw new SyntaxError('Expression should not start with invalid operator');
        }
        if (/[+\-*/]$/.test(expression)) {
            throw new SyntaxError('Expression should not end with invalid operator');
        }

        // Evaluate the expression
        // Replace all spaces for easier evaluation
        expression = expression.replace(/\s+/g, '');

        return eval(expression);
    } catch (error) {
        if (error instanceof OutOfRangeError || error instanceof InvalidExprError || error instanceof SyntaxError) {
            console.error(error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}

// Example usage
console.log(evalString("3 + 5 * 2"));         // 13
console.log(evalString("3 + 5 * 2 / "));      // Error: Expression should not end with invalid operator
console.log(evalString("* 3 + 5 * 2"));       // Error: Expression should not start with invalid operator
console.log(evalString("3 ++ 5 * 2"));        // Error: Expression should not have an invalid combination of expression
console.log(evalString("3 + 5 * 2a"));        // Error: Expression should only consist of integers and +-/* characters and not a
