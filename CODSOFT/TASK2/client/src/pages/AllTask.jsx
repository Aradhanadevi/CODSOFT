import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from "../components/Home/inputData"
import axios from "axios";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({id:"", title:"", desc:"", deadline:""})
  const headers = {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`};
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
  });
  Data && console.log(Data.task);
  return (
    <>
      <div>
      <div className='w-full flex justify-end px-4 py-2'>
        <button onClick={()=>setInputDiv("fixed")} >
          <IoIosAddCircleOutline className="text-4xl hover:text-gray-100 transition-all duration-300"
          style={{color:"#3d263f"}}
          />
        </button>
      </div>
      { Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.task} setUpdatedData={setUpdatedData} /> }
    </div>
    <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default AllTask;