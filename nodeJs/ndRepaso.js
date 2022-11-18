let obj = {}

for (let i = 0; i < 10000; i++ ){
    let randomNumber = Math.floor(Math.random() * 20 + 1);
    if(obj[randomNumber]){
        obj[randomNumber]++;
    }else{
        obj[randomNumber] = 1;
    }
}
console.log(obj)

// const randomNumber = ( min = 1 ,max = 20) => {
//     return Math.random()* (max - min) + min;
// }

// const number = randomNumber()

// console.log(number)

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

const product = productos.map(product => product.nombre);

let total = productos.reduce((accumulator, current) => accumulator + current.precio,0).toFixed(2);

let promedio = (total/productos.length).toFixed(2);

const price = productos.map(product => product.precio);
let min = Math.min(...price);
let max = Math.max(...price);

let otroMin = product[0].precio;
let otroMax = product[0].precio;

for(let i = 0 ; i < productos.length; i++){
    if(productos[i].precio < otroMin){
        otroMin = productos[i].precio
    }
    if(productos[i].precio > otroMax){
        otroMax = productos[i].precio
    }
}



console.log(product);
console.log(promedio);
console.log(min)
console.log(max);

const sendObject = {
    product,
    total,
    promedio,
    min,
    max
}

console.log(sendObject);

