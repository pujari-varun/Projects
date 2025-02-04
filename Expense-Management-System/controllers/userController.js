const userModel=require('../models/userModel');

const loginController= async (req,res)=>{
    try{
        console.log("Request Body:", req.body);
        const {email,password}=req.body
        const user=await userModel.findOne({email,password})

        if(!user){
            console.log('user not found');
            return res.status(400).send('User Not found')
        }
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({
            success:false,
            error
        })
        console.log("login failed")
    }
}

const registerController=async (req,res)=>{
    try{

        console.log("Request Body:", req.body);
        const newuser=new userModel(req.body);
        await newuser.save()
        res.status(201).json({success:true,newuser});
    }catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }
}


module.exports={loginController,registerController}