export const admin = (req,res,next) => {
    const admin = true;
    if(admin) next();
    else res.json({error : 'you do not have admin permissions'});
}