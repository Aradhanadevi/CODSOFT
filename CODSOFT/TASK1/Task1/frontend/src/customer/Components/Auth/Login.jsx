import * as React from "react";
import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect } from "react";
import { useState } from "react";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const { auth } = useSelector((store) => store);
  const handleCloseSnakbar=()=>setOpenSnackBar(false);
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt))
    }
  
  },[jwt])
  
  
    useEffect(() => {
      if (auth.user || auth.error) setOpenSnackBar(true)
    }, [auth.user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userData={
      email: data.get("email"),
      password: data.get("password"),
     
    }
    console.log("login user",userData);
  
    dispatch(login(userData));

  };

  return (
    <div style={{background:"#e8ba88"}} >
    <React.Fragment className=" shadow-lg " style={{background:"#e8ba88"}}>
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3} style={{background:"#e8ba88"}}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{padding:".8rem 0"}}
              style={{background:"#463f6a", color:"#dcc7d3"}}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center" style={{background:"#e8ba88"}}>
         <div className="py-3 flex items-center" style={{background:"#e8ba88"}}>
        <p className="m-0 p-0">don't have account ?</p>
        <Button onClick={()=> navigate("/register")} className="ml-5" size="small" style={{color:"#302c50"}}>
          Register
        </Button>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
        <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
          {auth.error?auth.error:auth.user?"Register Success":""}
        </Alert>
      </Snackbar>
    </React.Fragment>
    </div>
  );
}
