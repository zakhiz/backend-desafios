import mongoose from "mongoose";

const nameDB = 'chat'
const connection = mongoose.connect(`mongodb+srv://CodeTest:123@codercluster.4kgfcft.mongodb.net/${nameDB}?retryWrites=true&w=majority`,(error)=> {
    if(error) console.log(error);
    else console.log('db connect');
} );

