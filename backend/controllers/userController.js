
const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
//@desc register user
//@route POST/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username,email,phone,address,password,role}=req.body;
    if(!username||!email||!phone||!address||!password||!role){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvialable=await User.findOne({email});
    if(userAvialable){
        res.status(400);
        throw new Error("user already registered!");
    }
    //hash password
    const hashedpassword=await bcrypt.hash(password,10);
    console.log("hashed password: ",hashedpassword);
    const user=await User.create({
        username,
        email,
        phone,
        address,
        password:hashedpassword,
        role

    });
    console.log(`user created ${user}`);
    if (user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("user data is invalid");
    }
    res.json({
        message: "register the user"
    });
});

//@desc login user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are required! ");
    }
    const user=await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid!");
    }
  
});

//@desc current user
//@route POST/api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports={registerUser,loginUser,currentUser};