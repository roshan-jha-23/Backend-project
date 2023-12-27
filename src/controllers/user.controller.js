import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from"../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation lagana hoga
    //check if already exist.:username/email
    //check for images
    //check for avatar
    //upload them to cloudinary
    //create user object -create entery in db
    //remove pass and refresh token
    //check for user creation
    //return res
    const {fullName,email,username,password}=req.body
    console.log("email: ",email);
    console.log("password",password);

if (
  [fullName, email, username, password].some((field) => field?.trim() === "")
) {
    throw new ApiError(400,'all fields are required');
}

const existedUser=User.findOne({
    $or:[{ username },{ email }]
})
if(existedUser){
    throw new ApiError(409,"Email or Username already exists");
}

 const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath= req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(422,"Avatar is Required");
}
//uploading on cloudinary
const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new Error (400,"error try again")
}
User.create({
    fullName,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || ""
})
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new Error (500,"Server error please try later")
}
return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
)
})




export {registerUser}