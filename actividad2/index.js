const Container = require('./containerProduct');
const container = new Container();


let product = {
    name : "fernet",
    price : 600,
    stock : 100,
    vto: "30/12/2022",
    codigo: 6396335758636,

}
//!create product 
// container.createProduct(product)
//     .then(res => console.log(res));

//!read product
//   container.readProduct()
//     .then(res => console.log(res));
//!get product by id
// container.getById(2)
//     .then(res => console.log(res));

//!delete by id
// container.deleteById(3)
//     .then(res => console.log(res));
//!delete all
//   container.deleteAll()
//        .then(res => console.log(res));