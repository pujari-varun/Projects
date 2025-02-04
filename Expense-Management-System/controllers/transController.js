const transModel = require('../models/transModel');
const moment = require('moment');

const GettransCntlr = async (req, res) => {
  try {
    const { type, userid, frequency, selectedDate } = req.body;
    
    // Build query object
    const query = { userid };

    // Filter by type if specified
    if (type !== 'all') {
      query.type = type;
    }

    // Filter by frequency
    if (frequency && frequency !== 'custom') {
      const daysMap = {
        "1week": 7,
        "1month": 30,
        "1year": 365
      };

      const days = daysMap[frequency];
      if (days) {
        query.date = { $gte: moment().subtract(days, 'days').toDate() };
      }
    } else if (frequency === 'custom' && selectedDate?.length === 2) {
      // Custom date range filter
      query.date = {
        $gte: new Date(selectedDate[0]),
        $lte: new Date(selectedDate[1])
      };
    }

    // Fetch transactions
    const alltrans = await transModel.find(query);
    res.status(200).json(alltrans);
    console.log("Sent all transactions as response");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

const AddtransCntrl = async (req, res) => {
  try {
    const trans = new transModel(req.body);
    await trans.save();
    res.status(201).send('Transaction Added');
    console.log("Transaction Added");
  } catch (error) {
    console.log("Got error", error);
    res.status(500).json({ message: 'Error adding transaction' });
  }
};

module.exports = { GettransCntlr, AddtransCntrl };











// const transModel=require('../models/transModel');
// const moment=require('moment');
// const GettransCntlr=async (req,res)=>{
//     try{
//         const {type,userid,frequency, selectedDate}=req.body;

//         const query = { userid };

//         if (type !== 'all') {
//             query.type = type;
//         }
//         if (frequency && frequency !== 'custom') {
//             const daysMap = {
//               "1week": 7,
//               "1month": 30,
//               "1year": 365
//             };
//             const days = daysMap[frequency];
      
//             if (days) {
//               query.date = { $gte: moment().subtract(days, "days").toDate() };
//             }
//           } else if (frequency === 'custom' && selectedDate?.length === 2) {
            
//             query.date = {
//               $gte: new Date(selectedDate[0]),
//               $lte: new Date(selectedDate[1])
//             };
//           }
//         const alltrans= await transModel.find(query);
//         res.status(201).json(alltrans);
//         console.log("sent all transactions as response")
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json(error);
//     }
// }
// const AddtransCntrl=async (req,res)=>{
//     try{
//         const trans=new transModel(req.body);
//         await trans.save();
//         res.status(201).send('Transaction Added')
//         console.log("Transaction Added")
//     }catch(error){
//         console.log("got error");
//         res.status(500).json(error);
//     }
// }

// module.exports={GettransCntlr,AddtransCntrl}