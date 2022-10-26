const fs = require('fs');
class Container {
   constructor(filename){
        this.filename = filename
   }
   getAll = async()=>{
    try{
      const data = await fs.promises.readFile(this.filename,"utf-8");
      return JSON.parse(data)
      
    }catch(error){
      console.log(error);
    }
   }
  }

module.exports = Container


 