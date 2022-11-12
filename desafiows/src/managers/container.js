import fs from 'fs';
import __dirname from "../utils.js";

const url = (name) => `${__dirname}/json/${name}.json`;

class Container{
     constructor(name){
        this.name = name
     }
    async getAll(){
            const products = [];
            if(fs.existsSync(url(this.name))){   
               const content = await fs.promises.readFile(url(this.name),'utf-8');
                const data = JSON.parse(content);
                return data;
            }else{
                return products;
            }
        
    }
    async save(obj){
        try{
            const listprod = await this.getAll()
                .then(res=>res)
                .catch(err => console.log(err));
            if(listprod.length <= 0){
                 obj.id =1
                 listprod.push(obj);
                 const data = JSON.stringify(listprod,null,"\t");
                 fs.writeFileSync(url(this.name),data,'utf-8');
                 console.log(data);                 
                 return obj.id;
             }else{
                 const listid = listprod.at(-1);
                 let idlength = listid.id + 1 ;
                 obj.id = idlength;
                 listprod.push(obj);
                 const data = JSON.stringify(listprod,null,"\t");
                 fs.writeFileSync(url(this.name),data,'utf-8');
                 console.log(data);                 
                 return obj.id;
             }
        }catch(error){
           console.log(error);
        }  
    }
}

export default Container;