import express from "express";
import productosRouter from "./routes/productos.router.js";
import __dirname from "./utils.js";

const app = express();

const server = app.listen(8080, () => console.log(`Listen in port ${server.address().port}`));

server.on("error", error => console.log(error)); 

app.use(express.json());
app.use(express.urlencoded({ extended:true })); 
app.use(express.static(__dirname + "/public")); 
app.use("/api/productos", productosRouter);
