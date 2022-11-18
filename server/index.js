import http from 'http';
const server = http.createServer((peticion,respuesta)=>{
      respuesta.end('<h1>Hola Back</h1>');
});

const connectedServer = server.listen(8080,()=>{
    console.log("primer server");
});

