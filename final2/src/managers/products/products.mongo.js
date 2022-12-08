import productModel from '../../models/productsModel.js';

let numeros = "0123456789";
let letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
let simbolos = ".?%·&'´çÇ:_[{}]><!&/)=¡¿";
let all = numeros + letras + simbolos;
const codeAlt = (long)=>{
    let password = "";  
    for(let i = 0 ; i<long; i++){
        let aleatorio = Math.floor(Math.random()* all.length);
        password += all.charAt(aleatorio);  
    }
    return password
}
export default class containerProduct {
    constructor(){
        this.model = productModel;
    }

    //! obtiene toda la lista de productos
    getAll = async () => {
        return await this.model.find({});
    };

    //! obtienes un producto por su id
    getById = async (id) =>{
        const product = await this.model.findById(id);
        if(!product) return 'Product not found';
        return product;
    }

    //! guarda le producto ingresado
    save = async (product) =>{
        try{
            product.timestamp = Date.now();
            product.code = codeAlt(10);
            const newProduct = await this.model.create(product);
            return newProduct._id.valueOf()
        } catch (err) {
            return {error : 'Your product could not be saved'};
        }
    };
    //! actualizar un producto segun el id
    updateByID = async (id, productUpdate) =>{
      const updateData =  await this.model.findByIdAndUpdate(id , productUpdate);
      return `upgraded product ${updateData}`
    };

    //! eliminar un producto segun su id
    deleteById = async (id) =>{
        const deleteProduct =  await this.model.findByIdAndDelete(id);
        return `Product Remove ${deleteProduct}`
    }
}