const fs = require('fs');
fs.writeFile('./otroarchivoconcallback.txt',"hola callback",(error)=>{
    if(error){
        console.log("hubo un error");
    }
})
fs.readFile("./otroarchivoconcallback.txt","utf-8",(error,data)=>{
    if(error){
        console.log(`hubo un ${error}`);
    }else{
        console.log(data);
    }
})
