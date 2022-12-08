import fs from "fs";
import __dirname from "../utils.js";

const direction = (name) => `${__dirname}/json/${name}.json`;
class Chatcontainer{
    constructor(name){
        this.name = name
    }
    async getMessages(){
            const messageList =[]; 
            if(fs.existsSync(direction(this.name))){
             const messages = await fs.promises.readFile(direction(this.name),'utf-8');
             const data = JSON.parse(messages)
             return data;
            }else{
               return messageList;
            }
        }
     async saveMessages(obj){
            try{
                const listmessages = await this.getMessages()
                    .then(res => res)
                    .catch(err=> console.log(err));
                
                listmessages.push(obj);
                const data = JSON.stringify(listmessages,null,"\t");
                fs.writeFileSync(direction(this.name),data,'utf-8');
                return obj;    
                }catch(error){
                    console.log(error);
                }
     }       
}

export default Chatcontainer;