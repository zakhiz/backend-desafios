import knex from "knex";
import __dirname from "../utils.js";

const sqliteOptions = {
    client: "sqlite3", 
    connection: {
        filename: __dirname+"/DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions) 

try {
    let exist = await db.schema.hasTable("products")

    if (!exist) { 
        await db.schema.createTable("products", table => {
            table.increments("id").primary()
            table.string("title", 30).notNullable() 
            table.float("price").notNullable()
            table.string("image", 1024)
            table.string("description", 100)
            table.float("stock").notNullable()
            console.log("Tabla de productos creada!")
        })
    }
} catch(error) {
    console.log(error)
}

try {
    let exist = await db.schema.hasTable("messages")

    if (!exist) {
        await db.schema.createTable("messages", table => {
            table.increments("id").primary();
            table.string("email", 30);
            table.string("mensaje", 1000);
            table.string("Date",30);
            console.log("Tabla de mensajes creada!");
        })
    }
} catch(error) {
    console.log(error)
}

export default sqliteOptions;
