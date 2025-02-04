import React from 'react'
import { Button, Form } from 'antd';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'



const Login = () => {

  const navigate=useNavigate();
  const [loading,setloading]=useState(false);

  const submitHandler = async (values) => {
    try{
      setloading(true);
      const {data}=await axios.post('http://localhost:8080/login',values);
      console.log(data);

      console.log("login successfull");
      setloading(false)
      message.success('login successful');
      localStorage.setItem('user',JSON.stringify({...data,password:""}))
      navigate('/')
    }
    catch(error){
      setloading(false);
      message.error('login failed');
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('user')){
      console.log("user already logged in");
      console.log("redirected to home page")
      navigate('/'); 
    }
  },[navigate]);

  return (
    <>
      <div className="login-form">
        {loading && <LoadingSpinner/>}
        <h2 style={{padding:10}}>Login</h2>
        <Form layout='vertical' className="login-form-content" onFinish={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }} labelAlign='left' labelCol={{ span: 10 }} wrapperCol={{ span: 15 }}>


          <Form.Item label="Email" name="email" layout='horizontal' rules={[
            {
              required: true,
              message: "Please enter Email"
            }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" layout='horizontal' rules={[
            {
              required: true,
              message: "Please enter password"
            }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Link to='/register' style={{ padding: 10 }}>New User? Register Now</Link>
        </Form>

      </div>
    </>
  )
}

export default Login
