import mongoose from "mongoose";

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true 
    },
    role : {
        type : String,
        default : 'user'
    },
    password : {
        type : String 
    }
});

const userModel = mongoose.model(collection,schema);

export default userModel;