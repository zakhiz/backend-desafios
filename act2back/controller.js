const fs = require("fs");

// user = {
//     first_name : "string", (required)
//     last_name : "string",
//     username : "string", (required)
//     age: "number",
//     email : "string", (required)
// }

const pathTofile = "./users.json";

const messageSuc= ()=>{
    return {
        status: "success",
        message: "User created successfully",
      };
}
const messageErr = ()=>{
    return {
        status: "error",
        message: error.message,
      };
}
const messageNotUs = ()=>{
    return{
        status: "error",
        message :  "users not found"
    }
}
const messageNotU = ()=>{
    return{
        status: "error",
        message :  "user not found"
    }
}

class Manager {
  createUser = async (user) => {
    if (!user.first_name || !user.username || !user.email) {
      return {
        status: "error",
        message: "Missing required fields",
      };
    }
    try {
      if (fs.existsSync(pathTofile)) {
        let data = await fs.promises.readFile(pathTofile, "utf-8");
        let users = JSON.parse(data);
        let id = users.length + 1;
        user.id = id;
        users.push(user);
        await fs.promises.writeFile(pathTofile, JSON.stringify(users, null, 2));
        messageSuc();
      } else {
        user.id = 1;
        await fs.promises.writeFile(
          pathTofile,
          JSON.stringify([user], null, 2)
        );
        messageSuc();
      }
    } catch (error) {
        messageErr();
    }
  };
  // funtion read all users
  readUser= async () =>{
    try{
        if(fs.existsSync(pathTofile)){
           let data  = await fs.promises.readFile(pathTofile,"utf-8");
           let users = JSON.parse(data);
           return{
            status : "success",
            users
           }         
          } else{
            messageNotUs();
          }
      }catch(error){
        messageErr();
     }
  }
  getById = async (id)=>{
    if(!id){
        return{
            status : "error",
            message : "ID is required",
        }
    }

    if(fs.existsSync(pathTofile)){
        let data = await fs.promises.readFile(pathTofile, "utf-8");
        let users = JSON.parse(data);
        let user = users.find(user => user.id == id);
        if(user){
            return {
                status : "success",
                user,
            }
        }else{
            messageNotU();
        }
    }else{
        messageNotUs();
    }
  }
  //create delete for id
  deleteById = async(id)=>{
    if(!id){
        return{
            status : "error",
            message : "ID is required",
        }
    }
    if(fs.existsSync(pathTofile)){
        let data = await fs.promises.readFile(pathTofile, "utf-8");
        let users = JSON.parse(data);
        let newUser = users.filter(user => user.id != id);
        await fs.promises.writeFile(
            pathTofile,
            JSON.stringify(newUser, null, 2)
        );
        return{
            status: "success",
            message: "User deleted successfully"
        }
        
    }else{
        messageNotUs();
    }
  }
   deleteAll= async()=>{
      if(fs.existsSync(pathTofile)){
         await fs.promises.unlink(pathTofile)  
         return{
            status: "success",
            message: "Users deleted successfully"
        }  
    }else{
        return{
            status: "error",
            message : "Users not found"
        }
    }
  }
}
module.exports = Manager