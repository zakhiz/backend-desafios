process.on('message',e =>{
    let cant = e.cant
    let randomNum = [];
        for (let i = 0; i < (cant || 100000000); i++) {
        let max = 1000;
        let min = 1;
        randomNum.push(Math.floor(Math.random()*(max-min+1)+min));
    }

    let newObj = {}

    for (let i = 1; i <= 1000; i++) {
    let numeros = randomNum.filter(val => val == i);
    newObj[i] = numeros.length
    }
    process.send(newObj)
});

