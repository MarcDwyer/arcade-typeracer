const doSomething = () => {
    const obj: any = {};
    let num = 0
    obj[++num] = "something"
    return [num, obj]
}

console.log(doSomething())