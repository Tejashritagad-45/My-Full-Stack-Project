// export const isMemberMiddleware=(req,res,next)=>{
//     try{
//         if(req.user?.role !="member"){

//             throw new Error("can not fetched the api beacuase user is a not a member");
//         }
//         next();
            
//     }catch(err){
//         return res.json({
//             error:{
//                 message:"failed to fetch the api",
//                 info:err.message
//             }
//         })
//     }
// }



export const isMemberMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No user found."
    });
  }

  if (req.user.role !== "member") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Only members can access this resource"
    });
  }

  next();
};