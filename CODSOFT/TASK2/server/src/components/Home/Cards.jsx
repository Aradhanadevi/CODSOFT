import React from 'react';
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Cards = ({home, setInputDiv, data, setUpdatedData}) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const handleComplteTask = async (id) =>{
        try {
                await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`, 
                {},
                {headers}
            );
            // alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleImportant = async (id) =>{
        try {
        await axios.put(
                `http://localhost:1000/api/v2/update-important-task/${id}`, 
                {},
                {headers}
            );
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (id, title, desc, deadline) =>{
        setInputDiv("fixed");
        setUpdatedData({id:id, title:title, desc:desc, deadline:deadline})
    }
    const deleteTask = async (id)=>{
        try {
            const response = await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`, 
                {headers}
            );
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }  
     // Function to format the date
     const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
    }
    return (
    <div className="grid grid-cols-3 gap-4 p-4">
        {data && data.map((items, i) => (
        <div className=" flex flex-col justify-between bg-gray-700 rounded-sm p-4">
            <div className="bg-gray-700 rounded-sm p-4">
                <h3 className="text-xl font-semibold">{items.title}</h3>
                <p className="text-gray-300 my-2">{items.desc}</p>
                <div className='"text-gray-300 my-2 text-sm'>Deadline</div>
                <p className='text-gray-300 '>{formatDate(items.deadline)}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
                <button className={`${items.complete === false ? "bg-red-500" : "bg-green-500"} 
                p-2 rounded w-3/6`}
                onClick={()=>handleComplteTask(items._id)}
                >
                    {items.complete === true ? "Completed" : "Pending"}
                </button>
                <div className="text-white p-2 w-3/6 text-xl font-semibold flex justify-around">
                    <button onClick={()=>handleImportant(items._id)}>
                        {items.important === false ? (
                        <CiHeart/>
                        ) : (
                        <FaHeart className='text-red-500' />
                        ) }
                    </button>
                    {home !== "false" && <button
                        onClick={()=>handleUpdate(items._id, items.title, items.desc)}
                    >
                        <CiEdit/>
                    </button>}
                    <button onClick={() => deleteTask(items._id)}>
                        <MdDelete/>
                    </button>
                </div>
            </div>
        </div>
    ))}
    {home === "true" &&  (
    <button  className="flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={()=>setInputDiv("fixed")} >
        <IoIosAddCircleOutline className="text-5xl"/>
        <h2 className="text-2xl mt-4 ">Add New Task</h2>
    </button>
)}    
    </div>
  );
};

export default Cards;