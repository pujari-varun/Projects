import {React} from 'react'
import { Button,Form,message} from 'antd';
import {Input} from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';


const Register = () => {

    const navigate=useNavigate();
    const [loading,setloading]=useState(false);

    const submitHandler=async (values)=>{
        try{
            setloading(true);
            await axios.post('http://localhost:8080/register', values);
            console.log("successfully submited and registered");
            message.success('Registration successfull');
            setloading(false);
            navigate('/login');
        }catch(error){
            setloading(false);
            message.error('got error');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            console.log('Already registered and logged in');
            navigate('/');
        }
    },[]);
  return (
    <>
    <div className="register-form">
        {loading && <LoadingSpinner/>}
        <h2>Register</h2>
        <Form layout='vertical' className="register-form-content" onFinish={submitHandler} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
 labelAlign='left' labelCol={{span:10}} wrapperCol={{span:15}}> 
            

            <Form.Item  label="Name" name="name" layout='horizontal'  rules={[
                {   required:true,
                    message:"Please enter name"}]}>
                <Input/> 
            </Form.Item>

            <Form.Item  label="Email" name="email" layout='horizontal'  rules={[
                {   required:true,
                    message:"Please enter Email"}]}>
                <Input/> 
            </Form.Item>

            <Form.Item  label="Password" name="password" layout='horizontal'  rules={[
                {   required:true,
                    message:"Please enter password"}]}>
                <Input.Password/> 
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            <Link to='/login' style={{padding:10}}>Already Registered? Login</Link>
        </Form>   
        
    </div>
    </>
  )
}

export default Register
