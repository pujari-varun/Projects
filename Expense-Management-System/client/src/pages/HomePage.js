import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Modal, Button, Form, Input, Select, message, Table, DatePicker } from 'antd';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import moment from 'moment';

const HomePage = () => {
  const [ismodelopen, setismodelopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [All_trans, setAll_trans] = useState([]);
  const [type, settype] = useState("all"); // Default type is 'all'
  const [frequency, setFrequency] = useState(""); // Default frequency is '1week'
  const [selectedDate, setselectedDate] = useState([]);

  // Table columns
  const columns = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Reference', dataIndex: 'reference' },
    { title: 'Actions' }
  ];

  // Fetch all transactions based on selected filters
  const getalltransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true);

      // Prepare request payload
      const payload = {
        userid: user._id,
        type,
        frequency,
        ...(selectedDate.length === 2 && { selectedDate }) // Include selectedDate only if custom range is selected
      };

      // Fetch transactions from API
      const alltrans = await axios.post("http://localhost:8080/api/v1/transactions/gettransactions", payload);
      setloading(false);
      setAll_trans(alltrans.data); // Update state with fetched transactions
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getalltransactions(); // Fetch transactions whenever filters change
  }, [type, frequency, selectedDate]);

  // Handle form submission for adding transactions
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true);
      await axios.post("http://localhost:8080/api/v1/transactions/addtransaction", { ...values, userid: user._id });
      setloading(false);
      message.success("Transaction added successfully");
      setismodelopen(false);
    } catch (error) {
      setloading(false);
      message.error("Failed to add transaction");
    }
  };

  // Handle custom date range selection
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setselectedDate([dates[0].toISOString(), dates[1].toISOString()]);
    } else {
      setselectedDate([]);
    }
  };

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      
      {/* Filters Section */}
      <div className="filters">
        <div>
          Select Frequency
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="1week">Last 1 Week</Select.Option>
            <Select.Option value="1month">Last 1 Month</Select.Option>
            <Select.Option value="1year">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom Date Range</Select.Option>
          </Select>
        </div>

        <div>
          Select Type
          <Select value={type} onChange={(value) => settype(value)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense">Expense</Select.Option>
          </Select>
        </div>

        {frequency === 'custom' && (
          <div>
            Select Date Range:
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              onChange={handleDateChange}
              value={selectedDate.length ? [moment(selectedDate[0]), moment(selectedDate[1])] : []}
            />
          </div>
        )}

        <div>
          <Button className="btn bg-warning" onClick={() => { setismodelopen(true); }}>
            Add New
          </Button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="content-table">
        <Table columns={columns} dataSource={All_trans.map((item, index) => ({ ...item, key: index }))} />
      </div>

      {/* Modal for adding new transaction */}
      <Modal title="Add-Transaction" open={ismodelopen} onCancel={() => { setismodelopen(false); }} footer={null}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              {/* List of categories */}
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="Bonus">Bonus</Select.Option>
              <Select.Option value="Pension">Pension</Select.Option>
              <Select.Option value="Fees">Fees</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Furniture">Furniture</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button className="btn bg-primary text-white" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;











// import React from 'react'
// import Layout from '../components/Layout/Layout'
// import { Modal, Button, Form, Input, Select, message, Table,DatePicker} from 'antd';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import LoadingSpinner from '../components/LoadingSpinner';
// import moment from 'moment';

// const HomePage = () => {
//   const [ismodelopen, setismodelopen] = useState(false);
//   const [loading, setloading] = useState(false);
//   const [All_trans, setAll_trans] = useState([]);
//   const [type, settype] = useState("all");
//   const [frequency, setFrequency] = useState("1week"); 
//   const [selectedDate, setselectedDate] = useState([]);


//   //table data
//   const columns = [
//     { title: 'Date', dataIndex: 'date' },
//     { title: 'Amount', dataIndex: 'amount' },
//     { title: 'Type', dataIndex: 'type' },
//     { title: 'Category', dataIndex: 'category' },
//     { title: 'Reference', dataIndex: 'reference' },
//     { title: 'Actions' }
//   ]

//   //get all transactions
//   const getalltransactions = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       setloading(true);
//       const alltrans = await axios.post("http://localhost:8080/api/v1/transactions/gettransactions", { userid: user._id, type, frequency, selectedDate });
//       setloading(false);
//       setAll_trans(alltrans.data);
//       console.log(alltrans.data);

//     }
//     catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getalltransactions();
//   }, [type,frequency,selectedDate]);


//   //form handling
//   const handleSubmit = async (values) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       setloading(true);
//       await axios.post("http://localhost:8080/api/v1/transactions/addtransaction", { ...values, userid: user._id });
//       setloading(false);
//       console.log("successfully added transaction");
//       console.log(values);
//       setismodelopen(false);
//       message.success("Transactions added");
//     } catch (error) {
//       setloading(false);
//       message.error("failed to add");

//     }

//   }

//   // Handle date change for custom range
//   const handleDateChange = (dates) => {
//     if (dates && dates.length === 2) {
//       setselectedDate([dates[0].toISOString(), dates[1].toISOString()]);
//     } else {
//       setselectedDate([]);
//     }
//   };


//   return (
//     <Layout>
//       {loading && <LoadingSpinner />}
//       <div className='filters'>
        
//         <div>Select Frequency
//           <Select value={frequency} onChange={(value) => setFrequency(value)}>
//             <Select.Option value="1week">Last 1 Week</Select.Option>
//             <Select.Option value="1month">Last 1 Month</Select.Option>
//             <Select.Option value="1year">Last 1 Year</Select.Option>
//             <Select.Option value="custom">Custom Date Range</Select.Option>
//           </Select>
//         </div>

//         <div>Select Type
//           <Select value={type} onChange={(value) => settype(value)}>
//             <Select.Option value='all'>ALL</Select.Option>
//             <Select.Option value='Income'>Income</Select.Option>
//             <Select.Option value='Expense'>Expense</Select.Option>
//           </Select>
//         </div>
//         {frequency === 'custom' && (
//           <div>
//             Select Date Range:
//             <DatePicker.RangePicker 
//               format="YYYY-MM-DD" 
//               onChange={handleDateChange} 
//               value={selectedDate.length ? [moment(selectedDate[0]), moment(selectedDate[1])] : []}
//             />
//           </div>
//         )}



//         <div>
//           <button className='btn bg-warning' onClick={() => { setismodelopen(true) }}>
//             Add New
//           </button>
//         </div>

//       </div>
//       <div className='content-table'>
//         <Table columns={columns} dataSource={All_trans} />
//       </div>
//       <Modal title='Add-Transaction'
//         open={ismodelopen}
//         onCancel={() => { setismodelopen(false) }}
//         footer={false}
//       >
//         <Form layout='vertical' onFinish={handleSubmit}>
//           <Form.Item label="Amount" name="amount">
//             <Input type='number' />
//           </Form.Item>
//           <Form.Item label="Type" name="type">
//             <Select>
//               <Select.Option value="Income">Income</Select.Option>
//               <Select.Option value="Expense">Expense</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Category" name="category">
//             <Select>
//               <Select.Option value="Salary">Salary</Select.Option>
//               <Select.Option value="Project">Project</Select.Option>
//               <Select.Option value="Tip">Tip</Select.Option>
//               <Select.Option value="Bonus">Bonus</Select.Option>
//               <Select.Option value="Pension">Pension</Select.Option>
//               <Select.Option value="Fees">Fees</Select.Option>
//               <Select.Option value="Entertainment">Entertainment</Select.Option>
//               <Select.Option value="Food">Food</Select.Option>
//               <Select.Option value="Furniture">Furniture</Select.Option>
//               <Select.Option value="Medical">Medical</Select.Option>
//               <Select.Option value="Tax">Tax</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Date" name="date">
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item label="Reference" name="reference">
//             <Input type='text' />
//           </Form.Item>
//           <Form.Item label="Description" name="description">
//             <Input type='text' />
//           </Form.Item>
//           <div className='d-flex justify-content-end'>
//             <Button className='btn bg-primary text-white' htmlType='submit'>Submit</Button>
//           </div>

//         </Form>
//       </Modal>

//     </Layout>
//   )
// }

// export default HomePage
