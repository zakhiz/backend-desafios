import express from 'express';
import minimist from 'minimist';
import os from 'os'
import cluster from 'cluster';
import __dirname from './utils.js'
const app  = express();
const PORT = process.env.PORT || 8080

const modos ={
    alias :{
        "M" : "MODE"
    },
    default :{
        "MODE" : "FORK"
    }
}

const options = minimist(process.argv.slice(2),modos);

const CPUS = os.cpus().length

if(options.MODE === "CLUSTER"){
    console.log(`conectandos en modo ${options.MODE}`);
    if(cluster.isPrimary){
        console.log(`proceso primary con pid ${process.pid} ejecutandoce` );
        for (let i = 0; i < CPUS; i++) {
            cluster.fork()
        }
        cluster.on('exit',(worker)=>{
            console.log(`el proceso ${worker.process.pid} murio`)
            cluster.fork();
        });
    }else{
        console.log(`proceso worker  con pid ${process.pid} ejecutandoce` );
        app.listen(PORT,()=>console.log(`escuchando en el puerto${PORT}`))
    }
}else if(options.MODE === "FORK"){
    console.log(`conectandos en modo ${options.MODE}`)
    console.log(`proceso con id ${process.pid}`);
    app.listen(PORT,()=>console.log(`escuchando en el puerto${PORT}`))

}else if(options.MODE === "PM2"){
    console.log(`conectandos en modo ${options.MODE}`)
    console.log(`proceso con id ${process.pid}`);
    app.listen(PORT,()=>console.log(`escuchando en el puerto${PORT}`))
}else if(options.MODE === "CLS"){
    console.log(`conectandos en modo ${options.MODE}`)
    if(cluster.isPrimary){
        console.log(`proceso primary con pid ${process.pid} ejecutandoce` );
        
        for (let i = 0; i < CPUS; i++) {
            if(i == 0){
                app.listen(8080,()=>console.log(`escuchando en el puerto 8080`));
            }
            cluster.fork()
        }
        cluster.on('exit',(worker)=>{
            console.log(`el proceso ${worker.process.pid} murio`)
            cluster.fork();
        });
    }else{
        console.log(`proceso worker  con pid ${process.pid} ejecutandoce` );
        app.listen(8081,()=>console.log(`escuchando en el puerto 8081`))
    }
}



//! esto es para problar el modo cluster con nodemon
// app.get('/',(req,res)=>{
//     let result = 0
//     for(let i=0;i<5e9;i++){
//         result+=i;
//     }
//     res.send(`calculo = ${result}`)
// })

// app.get('/welcome',(req,res)=>{
//     res.send({status : "success",message: "welcome"})
// })
//! esto es para probar el /api/random

app.get('/api/randoms',(req,res)=>{
    let result = 0
    for(let i=0;i<5e9;i++){
        result+=i;
    }
    res.send(`calculo = ${result} en el ${process.pid}`)
})

app.get("/info", async (req, res) => {
    const info = {
        argInit: process.argv.slice(2),
        System: process.platform,
        Version: process.version,
        MemoryTotal: process.memoryUsage(),
        pathEjec: __dirname,
        processId: process.pid,
        carpeta: process.cwd(),
        CPUS : CPUS
    }
    res.send({status : "info", payload : info});
})

//! nginx

app.get('/',(req,res)=>{
    res.send({status : "hola",message: `hola ${process.pid}`})
})

app.get('/randoms', (req, res) => {
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
        if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
})

function isPrime(num) {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
 }