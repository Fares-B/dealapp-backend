function sum(array) {
    let total = 0;

    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            if (parseInt(array[i], 10)) {
                total += parseInt(array[i], 10);
            }
        }
    }
    else if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            total += arguments[i];
        }
    }
    return total;
}

function multi() {
    let result = 0;
    arguments.forEach(arg => {
        result *= arg;
    });
    return result;
}


module.exports = { sum, multi };
