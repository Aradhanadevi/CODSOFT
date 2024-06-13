import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import axios from "axios";
const Signup = () => {
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const navigate = useNavigate();
    if (isLoggedIn === true){
        navigate("/");
    }
  const [Data, setData] = useState({username:"", email:"", password:""})
  const change = (e)=>{
    const {name, value} = e.target;
    setData({...Data, [name]: value});
  };
  const submit = async () => {
    try {
        if(Data.username ==="" || Data.email ==="" || Data.password ===""){
            alert("All fields are reqired")
        }
        else{
            const response = await axios.post("http://localhost:1000/api/v1/sign-in", Data);
            setData({username: "", email: "", password:""})
            alert(response.data.message);
            navigate("/login")
        }
    } catch (error) {
        // console.log(error);
        alert(error.response.data.message);
    }
  }
  return (
    <div className='h-[90vh] flex items-center justify-center'>
        <div className='p-2 w-2/6 rounded' style={{background:"#104c56"}}> 
            <div className='text-xl font-semibold'>SignUp</div>
            <input
                type="username"
                placeholder='username'
                className='px-3 py-2 my-3 w-full rounded'   
                style={{background:"#bcc1b4", color:"black"}}
                name='username' 
                value={Data.username}
                onChange={change}
            />
            <input
                type="email"
                placeholder='email'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'   
                name='email' 
                required
                value={Data.email}
                style={{background:"#bcc1b4", color:"black"}}
                onChange={change}
            />
            <input
                type="password"
                placeholder='password'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded'   
                name='password' 
                required
                value={Data.password}
                style={{background:"#bcc1b4", color:"black"}}
                onChange={change}
            />
            <div className='w-full flex items-center justify-between'>
            <button className='bg-yellow-500 text-xl font-semibold text-black px-3 py-2 rounded' 
            style={{background:"#c87c21", color:"#3d263f"}}
            onClick={submit}>
                Signup
            </button>
            <Link to="/login" className='text-gray-400 hover:text-gray-200 transition-all duration-300'>Already signup? Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Signup;