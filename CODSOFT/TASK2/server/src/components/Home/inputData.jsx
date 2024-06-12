import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import axios from "axios";
const InputData = ({inputDiv, setInputDiv, UpdatedData, setUpdatedData}) => {
    const headers = {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`};
    const [Data, setData] = useState({title:"", desc:"", deadline:""});
    useEffect(() => {
      setData({
        title:UpdatedData.title,
         desc:UpdatedData.desc,
         deadline:UpdatedData.deadline
      })
    }, [UpdatedData])
    
    const change = (e) =>{
    const {name, value} = e.target;
    setData({...Data, [name]:value });
  }
  const submitData = async() =>{
    if(Data.title === "" || Data.desc === "" || Data.deadline === ""){
      alert("All fields are required.");
    }else{
      await axios.post("http://localhost:1000/api/v2/create-task", Data, {headers});
      setData({title:"", desc:"", deadline:""});
      setInputDiv("hidden");
    }
  }
  const UpdateTask = async () =>{
    if(Data.title === "" || Data.desc === ""){
      alert("All fields are required.");
    }else{
      await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`, Data, {
        headers,
      });
      setUpdatedData({id:"", title:"", desc:"", deadline:""})
      setData({title:"", desc:"", deadline:""});
      setInputDiv("hidden");
    }
  }
  
  return (
    <>
      <div className= {`${inputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
      <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
        <div className='flex justify-end'>
          <button className='text-3xl' onClick={()=>{
            setInputDiv("hidden");
            setUpdatedData({id:"", title:"", desc:"", deadline:""})
          }}
          >
          <IoIosClose />
          </button>
        </div>
          <input 
            type='text' 
            placeholder='Title' 
            name="title" 
            className='px-3  py-2 rounded w-full bg-gray-700 my-3 '
            value={Data.title}
            onChange={change}
            />
            <textarea
              name='desc'
              cols="30"
              rows="10"
              placeholder="Description"
              className='px-3 py-2 rounded w-full bg-gray-700 my-3'
              value={Data.desc}
              onChange={change}
            >
            </textarea>
            <div className='px-3 rounded w-full '>Deadline</div>
            <input type="date" 
            name='deadline'
            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
            value={Data.deadline}
            onChange={change}
            />
            {UpdatedData.id === "" ? 
            <button 
            className='px-3 py-2 bg-yellow-400 
            rounded text-black 
            text-xl font-semibold'
            onClick={submitData}
          >
            Submit
          </button> 
          : 
                <button className='px-3 py-2
                 bg-yellow-400 rounded
                  text-black text-xl font-semibold'
                onClick={UpdateTask}
                >
                Update
              </button>
             }
      
        </div>
      </div>
    </>
  )
};

export default InputData;