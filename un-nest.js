// Input: [[[[[[[{foo: "bar", fizz: "buzz"}]]]]]]]
// Output: {foo: "bar", fizz: "buzz"}

function unNest(arr) {
    const [firstElement] = arr;

    if(!Array.isArray(firstElement)) {
        return firstElement;
    }

    return unNest(firstElement);
}

console.log(unNest([[[[[[[{username : "atheeq_03"}]]]]]]]));