import multer from  "multer";
const storage=multer.diskStorage(
    {
        destination(req,file,cb){
            cb(null ,"uploads/profile_pictures");
        },

        filename(req,file,cb){
            cb(null, Date.now()+ "_" + file.originalname);
        }
    });

  const fileFilter=(req,file,cb)=>{
    if(file.mimetype?.startsWith("image/")){
        cb(null,true);
    }else cb(new Error  ("only images are allowed as profile picture"),false) 

    if(file.size>1000000)
        cb(new Error("only allowed a 1 Mb data"))
  } ; 

    const uploadProfilePic=multer({storage,fileFilter});

    export default uploadProfilePic