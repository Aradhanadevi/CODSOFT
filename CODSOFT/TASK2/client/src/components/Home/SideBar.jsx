import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdImportantDevices } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { authActions } from '../../store/auth';
import axios from "axios";

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data= [
        {
            title: "All Task",
            icon: <CgNotes/>,
            link: "/",
        },
        {
            title: "Completed Task",
            icon: <FaCheck/>,
            link: "/completedtask",
        },
        {
            title: "Pending Task",
            icon: <MdOutlinePendingActions/>,
            link: "/pendingtask",
        },
        {
            title: "Important Task",
            icon: <MdImportantDevices/>,
            link: "/importanttask",
        }
    ];
    const [Data, setData] = useState()
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        navigate("/signup")
    };
    const headers = {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-task", {
            headers,
        });
        setData(response.data.data);
      };
      if (localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
      }
    })
    
  return (
    <>
        {Data && (
            <div>
            <h2 className='text-xl font-semibold'>{Data.username}</h2>
            <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
            <hr/>
        </div>
        )}
        <div>
            {data.map((items, i) =>(
            <Link  to={items.link} 
            key={i}
            className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'> 
             {items.icon} &emsp; {items.title}
            </Link>
            ))}
        </div>
        <div><button className='bg-gray-500 w-full p-2 rounded' onClick={logout}>Log Out</button></div>
    </>
  )
}

export default SideBar