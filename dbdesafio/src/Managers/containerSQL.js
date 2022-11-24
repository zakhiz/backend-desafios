import knex from "knex";

export default class ContainerSQL {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla 
    }

    async getAll() { 
        try {
            return this.knex.select("*").from(this.table)
        } catch(error) {
            console.log(error)
        }
    }

    async save(objeto) { 
        try {
            return this.knex.insert(objeto).into(this.table)
        } catch(error) {
            console.log(error)
        }
    }

    async getById(id) { 
        try {
            return this.knex.select("*").from(this.table).where("id", id)
        } catch(error) {
            console.log(error)
        }
    }

    async deleteById(id) { 
        try {
            return this.knex.delete().from(this.table).where("id", id)
        } catch(error) {
            console.log(error)
        }
    }

    async update(objeto, id) { 
        try {
            return this.knex.from(this.table).where("id", id).update(objeto)
        } catch(error) {
            console.log(error)
        }
    }
}

