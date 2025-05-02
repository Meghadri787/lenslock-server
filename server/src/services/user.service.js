
import { sendEmail } from "../utils/sendMail.js"
import { genarate6DigitOtp } from "../utils/OtpGenarate.js"
import { fileDestroy, fileUploader } from "../utils/fileUpload.js"
import { timeExpire } from "../utils/timeExpire.js"
import { Users } from "../model/user.model.js"

import mongoose from "mongoose"
import {  tokenGenarate } from "../utils/tokenGenarate.js"


export const UserService = {

  async createUser(body) {
    console.log("ok created account ");
    
    // step1 : email exist or not 
    const { email } = body
    const isExist = await Users.findOne({ email })
    if(isExist) { 
      throw new Error("User alrady exist ")
    }

    const user = await Users.create(body)

    const otp = genarate6DigitOtp()
    user.otp = otp
    user.otpExpiary = Date.now() + 5 * 60 * 1000 // OTP valid for 5 minutes

    await user.save()

    await sendEmail(
      user.email,
      `Welcome ${user.name}`,
      "Thank you for choosing BookBuddy. for your Reading Partner .",
    )
    await sendEmail(user.email, "Verify Account - OTP", otp)
    const token = await tokenGenarate(user)
    return { token , user}
  },

  async verifyOtp(otp) {
    const user = await Users.findOne({ otp , otpExpiary: { $gt: Date.now() } })    
    if (!user) {
      throw new Error("Invalid OTP")
    }

    user.otp = null
    user.otpExpiary = null
    user.isVerify = true
    await user.save()
    return user
  },

  async sendOtpForVerification(email) {
    const user = await Users.findOne({ email })
    if (!user) {
      throw new Error("User not found")
    }

    const otp = genarate6DigitOtp()
    user.otp = otp
    user.otpExpiary = Date.now() + 5 * 60 * 1000 // OTP valid for 5 minutes
    await user.save()
    await sendEmail(email, "Verify Account - OTP", otp)
  },

  async loginUser(email, password) {
    const user = await Users.findOne({ email }).select("+password")
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password")
    }
    const token = await tokenGenarate(user)
    return { token , user}
  },

  async getUserById(id) {
    const user = await Users.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) } // Match the user by ID
      },

      {
        $lookup: {
          from: "users", // Collection name should match MongoDB collection (pluralized)
          localField: "friends",
          foreignField: "_id",
          as: "friends",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "friendsRequast", // Ensure the field name matches the schema
          foreignField: "_id",
          as: "friendRequests",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "sendFriendRequst",
          foreignField: "_id",
          as: "sentFriendRequests",
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          profile_pic: 1,
          totalFriends: { $size: "$friends" }, // Calculate total number of friends
          friends: { _id:1 , name: 1, email: 1, profile_pic: 1 },
          friendRequests: { _id:1 , name: 1, email: 1, profile_pic: 1 },
          sentFriendRequests: {_id:1 , name: 1, email: 1, profile_pic: 1 }
        }
      }
    ]);


  if (!user) throw new Error("User not found")
 console.log("user ========> " , user);
 
  return user 
},

  async getAllUser(userId){
    return await Users.find({_id : {$ne:userId}})
  } , 



  async changeProfilePic(id, file) {

    const user = await Users.findById(id)
    if (!user) {
      throw new Error("User not found")
    }

    if (user.profile_pic?.public_id) {
      await fileDestroy(user.profile_pic.public_id)
    }

    const { url, public_id, error } = await fileUploader(file)
    if (error) {
      throw new Error("File upload failed")
    }

    user.profile_pic = { url, public_id }
    await user.save()
    return user
  },




  async deleteUser(id) {
    return await Users.findByIdAndDelete(id)
  },

  async updateUser(id, updateData) {
    return await Users.findByIdAndUpdate(id, updateData, { new: true })
  },

  
}

