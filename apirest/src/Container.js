import fs from "fs" 
import __dirname from "./utils.js";

const url = (name) => `${__dirname}/json/${name}.json`;
class Container { 
    constructor(product) {
        this.product = product;
    }

    async getAll() { 
        let data = []
        if (fs.existsSync(url(this.product))) { 
            data = await fs.promises.readFile(url(this.product), "utf-8");
            data = JSON.parse(data);
        }
        return data;
    }
       
    async save(obj) { 
        let data = await this.getAll();
        let addId;
        if (data.length === 0) { 
            addId = 1; 
        } else {
            addId = data[data.length-1].id + 1;
        }
        obj.id = addId;
        data.push(obj); 
        data = JSON.stringify(data, null, "\t"); 
        await fs.promises.writeFile(url(this.product), data); 
        return addId; 
    }

    async getById(id) {
        const data = await this.getAll();
        return data.some(obj => obj.id === id) ? data.find(obj => obj.id === id) : null;
    }

    async deleteById(id) {
        let data = await this.getAll();
        data = data.filter(obj => obj.id != id);
        data = JSON.stringify(data, null, "\t");
        await fs.promises.writeFile(url(this.product), data);
    }

    async deleteAll() { 
        if (fs.existsSync(url(this.product))) {
            await fs.promises.writeFile(url(this.product), "[]");
        }
    }

    async update(objAct, id) { 
        let data = await this.getAll();
        const indexObj = data.findIndex(obj => obj.id == id);
        objAct.id = id;
        data[indexObj] = objAct;
        data = JSON.stringify(data, null, "\t");
        await fs.promises.writeFile(url(this.product), data);
    }
}

export default Container;
