import dotenv from 'dotenv';

dotenv.config();


export default {
    mongo : {
        password : process.env.MONGO_PASSWORD || "",
        db : process.env.DATABASE || ""
    },
    github : {
        clientID : process.env.GITHUB_CLIENTID || "",
        clientSecret : process.env.GITHUB_CLIENTSECRET || ""
    }
}
