import express from 'express';

const app = express();

let frase = 'frase inicial';

app.use(express.json());
app.use(express.urlencoded({extended :true}));

app.get('/api/frase',(req,res)=>{
    res.send({frase});
})

app.get('/api/palabras/:pos',(req,res)=>{
    let pos = req.params.pos;
    
    if(isNaN(pos)) return res.status(400).send({status:"error",error: "invalid type in pos"}); 
    let parsedPos = parseInt(pos);
    
    const words = frase.split(' ');

    if(parsedPos<1 || parsedPos > words.length) return res.status(400).send({status: "error", error : "index out of bounds"});
    res.send({word : words[parsedPos-1]});
})


app.post('/api/palabras',(req,res)=>{
    const palabra = req.body.palabra;
    frase = frase.concat(`${palabra}`);
    res.send({added : palabra}) 
})

app.put('/api/palabras/:pos',(req,res)=>{
    let pos = req.params.pos;
    const nuevaPalabra = req.body.nuevaPalabra;
    if(isNaN(pos)) return res.status(400).send({status:"error",error: "invalid type in pos"}); 
    let parsedPos = parseInt(pos);
    const words = frase.split(' ');
    if(parsedPos<1 || parsedPos > words.length) return res.status(400).send({status: "error", error : "index out of bounds"});
    const oldWord = words[pos-1];
    words[pos-1] = nuevaPalabra;
    frase = words.join(" ");
    res.send({palabraAnterior : oldWord ,palabraInsertada : nuevaPalabra })
})


app.delete('/api/palabras/:pos',(req,res)=>{
    let pos = req.params.pos;
    if(isNaN(pos)) return res.status(400).send({status:"error",error: "invalid type in pos"}); 
    let parsedPos = parseInt(pos);
    const words = frase.split(' ');
    if(parsedPos<1 || parsedPos > words.length) return res.status(400).send({status: "error", error : "index out of bounds"});
    words.splice(pos-1,1);
    frase = words.join(" ");
    res.send({message : "word deleted"})
})





const server = app.listen(8080,()=>{
    console.log('listen');
})



// app.get('/',(req,res)=>{
//     res.send('ok')
// });

// app.get('/users',(req,res)=>{
    
// });

// app.get('/users/:uid',(req,res)=>{
    
// });
// app.get('/users/:uid/reports',(req,res)=>{

// })

// app.post('/users',(req,res)=>{
    
// });

// app.post('/users/:uid/reports',(req,res)=>{
    
// });

// app.put('/users/:uid/reports/:reportId',(req,res)=>{
    
// });

// app.delete('/users/:uid',(req,res)=>{

// });

// app.put('/users/:uid',(req,res)=>{

// });
// app.post('/users/:uid/vacations',(req,res)=>{

// });
// app.put('/users/:uid/vacations',(req,res)=>{
    
// });
