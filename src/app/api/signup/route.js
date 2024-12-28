import { ConnectToDb } from "@/database";
import User from "@/models/User";
import Joi from "joi";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
const signUpValidation = Joi.object({
    Number:Joi.number().required(),
    Password:Joi.string().required(),
})

export async function POST(req) {
    try {
        await ConnectToDb()
        const addUserRequest = await req.json()
        const { Number, Password } = addUserRequest
        const { error } = signUpValidation.validate({
            Number,Password
        })
        if (error) {
            return NextResponse.json({
              success: false,
              message: error.details[0].message,
            });
        }
        const existingCheck = await User.findOne({ Number: Number })
        if (existingCheck) {
          return NextResponse.json({
            success: false,
            message:
              "The Phone Number you entered is already registered. Please Log In using your password",
          });
        } else {
          const hashPassword = await bcrypt.hash(Password, 5)
          const createUser = await User.create({
            Number,
            Password: hashPassword,
          });
          if (createUser) {
            return NextResponse.json({
              success: true,
              message: "Sign Up Successfull",
            });
          } else {
            return NextResponse.json({
              success: false,
              message: "Something Went Wrong",
            });
          }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message:'Something went wrong'
        })
        
    }
}