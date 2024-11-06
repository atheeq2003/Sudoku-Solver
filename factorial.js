function factorial(num) {
    if(num < 0) {
        throw new Error("Number not positive");
    }
    if(num <= 1) {
        console.log("Hi");
        return 1;
    }

    return num * factorial(num-1);
}

console.log(factorial(4));