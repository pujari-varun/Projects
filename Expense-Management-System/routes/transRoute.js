const express=require('express')
const {GettransCntlr,AddtransCntrl}=require('../controllers/transController');
// const { route } = require('./userRoute');

const router=express.Router();

// router.get('/',(req,res)=>{
//     res.send('this is from server for transactions/');
// })

router.get('/gettransactions',GettransCntlr)
router.post('/gettransactions',GettransCntlr)


router.get('/addtransaction',AddtransCntrl)
router.post('/addtransaction',AddtransCntrl)


module.exports=router;