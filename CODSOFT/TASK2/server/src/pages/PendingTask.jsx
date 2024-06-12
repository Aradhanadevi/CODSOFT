import React, {useState, useEffect} from 'react';
import Cards from '../components/Home/Cards';
import axios from "axios";

const PendingTask = () => {
  const [Data, setData] = useState();
  const headers = {
    id:localStorage.getItem("id"), 
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v2/get-pending-task", {
          headers
      });
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <div>
      <Cards home="false" data={Data}/>
    </div>
  )
}

export default PendingTask;