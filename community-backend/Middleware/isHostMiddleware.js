 export const isHostMiddleware=(req,res,next)=>{
    try{
        if(req.user.role!=="host"){
            throw new Error("looged in user is not host");
            
        }
       next(); 
    }catch(err){
        return res.json({
            error:"failed to access host apis",
            info:err.message
            
        });
    }
};