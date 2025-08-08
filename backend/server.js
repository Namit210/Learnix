const express=require("express");
const dotenv=require('dotenv').config();

const app=express();
exports.app = app;

const port=process.env.PORT||5000;
const connectDb=require("./config/dbconnection");
connectDb();
app.use(express.json());

app.use("/api/users",require("./routes/userRoutes"));
const errorHandler=require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
