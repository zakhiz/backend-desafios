const fs = require('fs');
const env = async()=>{
   await fs.promises.writeFile('./archivonuevo.data',"hola promise");
   let data = await fs.promises.readFile("./archivonuevo.data","utf-8")
   console.log(data)
   await fs.promises.appendFile("./archivonuevo.data",'Más actualizaciones');
}
env();