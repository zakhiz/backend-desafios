import chatModel from "../models/chatModel.js";
export default class ContainerChat {
    constructor (){
        this.model = chatModel;
    }

    getAll = async () =>{
        return await this.model.find({});
    }
    save = async (mensaje) =>{
        try {
            const newAuthor = await this.model.create(mensaje);   
        } catch (error) {
            return {status : error , message : error}
        }
    }
}