const express=require('express')
const {loginController,registerController} =require('../controllers/userController.js');
//router object
const router=express.Router()

//routers
//POST || For Login user
//router.requestmethod/httpmethod('endpoint',controller)
router.post('/login',loginController)

//POST || for Register user
router.get('/',(req,res)=>{
  res.send("go to http://localhost:8080/register  page");
})

router.get('/register',(req,res)=>{
  res.send("this is from server for /register page")
})
router.post('/register',registerController);


// router.get('/register', (req, res) => {
//     res.send("Registration page not available via GET request. Use POST instead.");
//   });
  
// router.post('/register',registerController)


module.exports=router;