import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import winston from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = async (password)=>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
};
export const validatePassword = (user,password) =>{
    return bcrypt.compare(password, user.password);
};

const customLevels = {
    fatal : 0,
    error : 1,
    warning : 2,
    info : 3
};

const logger = winston.createLogger({
    levels : customLevels,
    transports : [
        new winston.transports.Console({
            level : 'info'
        }),
        new winston.transports.File({
            level : 'warning',
            filename : './warn.log'
        }),
        new winston.transports.File({
            level : 'error',
            filename : './errors.log'
        })
    ]
}); 

export const addLogger = (req,res,next)=>{
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
} 





export default __dirname;