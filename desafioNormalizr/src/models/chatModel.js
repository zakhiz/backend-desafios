import mongoose from "mongoose";

const collection = 'Author';

const schema = new mongoose.Schema({
    author :{
        id : {
            type :String,
            require : true
        },
        nombre : {
            type : String,
            require : true
        },
        apellido : {
            type : String,
            require : true
        },
        edad : {
            type : Number,
            require : true
        },
        alias : {
            type : String,
            require : true
        },
        avatar : {
            type : String,
            require : true
        }
    },
    text: {
        type : String,
        require : true
    }
});
const chatModel = mongoose.model(collection,schema);

export default chatModel;