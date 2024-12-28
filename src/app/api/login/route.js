import { ConnectToDb } from "@/database";
import User from "@/models/User";
import Joi from "joi";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const logInvalidation = Joi.object({
  Number: Joi.number().required(),
  Password: Joi.string().required(),
});

export async function POST(req) {
  try {
    await ConnectToDb();
    const currentUserRequest = await req.json();
    const { Number, Password } = currentUserRequest;
    const { error } = logInvalidation.validate({
      Number,
      Password,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const checkNumber = await User.findOne({ Number: Number });
    const userId = checkNumber?._id;

    if (!checkNumber) {
      return NextResponse.json({
        success: false,
        message:
          "The Phone Number is not registered. Please check the Phone Number or create a new account.",
      });
    } else {
      const isMatch = await bcrypt.compare(Password, checkNumber.Password);
      if (!isMatch) {
        return NextResponse.json({
          success: false,
          message: "Invalid Phone Number or Password",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "Log in successfull",
          userId: userId,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
