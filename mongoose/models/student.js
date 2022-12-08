import mongoose from "mongoose";

const collection = 'Students';

const schema = new mongoose.Schema({
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
    dni : {
        type : String,
        require : true,
        unique : true
    },
    curso : {
        type : String,
        require : true
    },
    nota : {
        type : Number,
        require : true
    },
    ingreso : {
        type : Boolean,
        default: false
    }
});

const studentsModel = mongoose.model(collection,schema);
export default studentsModel;

