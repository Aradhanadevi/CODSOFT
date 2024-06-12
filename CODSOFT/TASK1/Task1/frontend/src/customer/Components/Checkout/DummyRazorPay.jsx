import { Box, Button, TextField, Typography } from "@mui/material";

// Add this component to your Checkout.js file
const DummyRazorpayForm = ({ handleNext }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dummy payment details submitted");
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="dummy-razorpay-form">
      <Typography variant="h6" gutterBottom>
        Dummy Razorpay Payment
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="UPI ID" variant="outlined" fullWidth required />
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Typography variant="caption">OR</Typography>
        </Box>
        <TextField label="Card Number" variant="outlined" fullWidth required />
        <TextField
          label="Card Holder Name"
          variant="outlined"
          fullWidth
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            required
          />
          <TextField label="CVV" variant="outlined" fullWidth required />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Pay Now
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Typography variant="body2">
          This is a dummy form. No real transaction will occur.
        </Typography>
      </Box>
    </form>
  );
};
export default DummyRazorpayForm;

// Then, update the step rendering logic in your Checkout component:
//   {step === 3 ? (
//     <DummyRazorpayForm handleNext={handleNext} />
//   ) : step === 2 ? (
//     <AddDeliveryAddressForm handleNext={handleNext} />
//   ) : (
//     <OrderSummary />
//   )}

// const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

// <div className="space-y-5">
//   {/* ... (rest of your existing JSX) */}
//   <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
//     <div className="border p-5 bg-white shadow-lg rounded-md">
//       {/* ... (rest of your existing JSX for price details) */}
//       <Button
//         onClick={handleClickOpen}
//         variant="contained"
//         type="submit"
//         sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
//       >
//         Payment
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Payment</DialogTitle>
//         <DialogContent>
//           <DummyRazorpayForm handleNext={handleClose} />
//         </DialogContent>
//       </Dialog>
//     </div>
//   </div>
// </div>
