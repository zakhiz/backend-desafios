const fs = require('fs');
const fileProducts ='./products.json'; 

const msgRequired = ()=>{
    return {
        status: "error",
        message: "Missing required fields",
      };
}

const msgSss =()=>{
    return {
        status: "success",
        message: "Product created successfully",
      };
}
const msgErr=()=>{
    return {
        status: "error",
        message: error.message,
      };
}

const msgProdNF =()=> {
    
    return{
        status: "error",
        message :  "product not found"
    }
}
const msgProdsNF =()=>{
    return{
        status: "error",
        message :  "products not found"
    }
}

class Container {
    
    //! create product
    createProduct = async (product) => {
          if(!product.name || !product.price || !product.stock ){
             msgRequired();
          }
          try{
            if(fs.existsSync(fileProducts)){
                let data = await fs.promises.readFile(fileProducts , "utf-8");
                let products = JSON.parse(data)
                let id = products.length + 1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(fileProducts, JSON.stringify(products, null,2));
                msgSss();
            }else {
                product.id = 1;
                await fs.promises.writeFile(
                  fileProducts,
                  JSON.stringify([product], null, 2)
                );
          }
        }catch(error){
            msgErr();
          }
    }
     //! read product

     readProduct = async() => {
        try{
            if(fs.existsSync(fileProducts)){
               let data  = await fs.promises.readFile(fileProducts,"utf-8");
               let products = JSON.parse(data);
               return{
                status : "success",
                products
               }    
              } else{
                messageNotUs();
              }
          }catch(error){
            messageErr();
         }
      }

      //!getbyid
      getById = async (id)=>{
        if(!id){
            return{
                status : "error",
                message : "ID is required",
            }
        }
    
        if(fs.existsSync(fileProducts)){
            let data = await fs.promises.readFile(fileProducts, "utf-8");
            let products = JSON.parse(data);
            let product = products.find(product => product.id == id);
            if(product){
                return {
                    status : "success",
                    product,
                }
            }else{
                msgProdNF();
            }
        }else{
            msgProdsNF();
        }
      }
      //!delete by id

      deleteById = async(id)=>{
        if(!id){
            return{
                status : "error",
                message : "ID is required",
            }
        }
        if(fs.existsSync(fileProducts)){
            let data = await fs.promises.readFile(fileProducts, "utf-8");
            let products = JSON.parse(data);
            let newProduct = products.filter(product => product.id != id);
            await fs.promises.writeFile(
                 fileProducts,
                JSON.stringify(newProduct, null, 2)
            );
            return{
                status: "success",
                message: "Product deleted successfully"
            }
            
        }else{
            msgProdsNF;
        }
      }
      //!delete all
      deleteAll= async()=>{
        if(fs.existsSync(fileProducts)){
           await fs.promises.unlink(fileProducts)  
           return{
              status: "success",
              message: "Products deleted successfully"
          }  
      }else{
          return{
              status: "error",
              message : "Products not found"
          }
      }
    }
}



module.exports = Container






