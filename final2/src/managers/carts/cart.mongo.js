import cartModel from '../../models/cartModel.js';

export default class ContainerCart {
    constructor(){
        this.model = cartModel;
    };

    //! obtienes todos los carrito 
    getAll = async () => {
        return await this.model.find({});
    };

    //! obtenes un carrito por su id
    getById = async (id) => {
        const cart = await this.model.find({_id : id});
        if(!cart) return 'Cart not found';
        return cart;
    }
    
    //! crear un carrito
    create = async () =>{
        try {
            const newCart = await this.model.create({
                timestamp : Date.now(),
                products : []
            });
            return newCart._id.valueOf
        } catch (error) {
            return {error : 'cart not stored'}
        };
    };
    //! agregar un producto en el array de carrito
     addProductInCart = async (cid,pid) =>{
        const cart = await this.model.findById(cid);
        let Listproducts = cart.products; 
        if(Listproducts.some(p => p.id === pid)){
                Listproducts = Listproducts.map( contProd => {
                        if(contProd.id === pid){
                                contProd.quantity++;
                         }
                            return contProd;
                })    
        }else{
            Listproducts.push({
                     id : pid,
                     quantity : 1
            });  
        }         
              await this.model.updateOne({_id : cid},{$set : {products : Listproducts}});
              return `added product`;
        };

    //! actualizar carrito
    updateByID = async (id, cartUpdate) =>{
        const updateData =  await this.model.findByIdAndUpdate(id , cartUpdate);
        return `upgraded product ${updateData}`;
    };
    
     //! eliminar un producto segun su id
     deleteById = async (id) =>{
        const arrayclean = {
            products : []
        }
        await this.model.findByIdAndUpdate(id,arrayclean);
        return `cart clean ${id}`;
    };
}