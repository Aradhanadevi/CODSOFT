const mongoose = require("mongoose")

const mongoDbUrl="mongodb+srv://abc:123@cluster0.if6daj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}