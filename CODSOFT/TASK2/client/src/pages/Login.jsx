import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from "../store/auth";
const Login = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const navigate = useNavigate();
    if (isLoggedIn === true){
        navigate("/");
    }
  const [Data, setData] = useState({username:"", password:""});
  const history = useNavigate();
  const dispatch = useDispatch();
  const change = (e)=>{
    const {name, value} = e.target;
    setData({...Data, [name]: value});
  };
  const submit = async () => {
    try {
        if(Data.username ==="" || Data.password ===""){
            alert("All fields are reqired")
        }
        else{
            const response = await axios.post("http://localhost:1000/api/v1/log-in", Data);
            setData({username: "", password:""})
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            dispatch(authActions.login());
            history("/");
        }
    } catch (error) {
        // console.log(error);
        alert(error.response.data.message);
    }
  }
  return (
    <div className='h-[90vh] flex items-center justify-center'>
    <div className='p-2 w-2/6 h-2/6 rounded justify-center items-center' style={{background:"#104c56"}}>
        <div className='text-xl font-semibold'>Login</div>
        <input
            type="username"
            placeholder='username'
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded'   
            name='username' 
            value={Data.username}
            onChange={change}
            style={{background:"#bcc1b4", color:"black"}}
        />
        <input
            type="password"
            placeholder='password'
            className='bg-gray-700 px-3 py-2 my-3 w-full rounded'   
            name='password' 
            required
            value={Data.password}
            onChange={change}
            style={{background:"#bcc1b4", color:"black"}}
        />
       <div className='w-full flex items-center justify-between'>
       <button className='bg-yellow-500 text-xl font-semibold text-black px-3 py-2 rounded'
        style={{background:"#c87c21", color:"#3d263f"}}
       onClick={submit}>
            Login
        </button>
        <Link to="/signup" className='text-gray-400 hover:text-gray-200 transition-all duration-300'>New user? Sign up</Link>
       </div>
    </div>
</div>
  )
}

export default Login;