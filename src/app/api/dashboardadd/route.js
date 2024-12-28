import { ConnectToDb } from "@/database";
import Notice from "@/models/Notice";

import Joi from "joi";
import { NextResponse } from "next/server";

const noticeValidation = Joi.object({
  Title: Joi.string().required(),
  Description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await ConnectToDb();
    const AdminRequest = await req.json();
    const { Title, Description } = AdminRequest;
    const { error } = noticeValidation.validate({
      Title,
      Description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
      const createData = await Notice.create(AdminRequest)
      if (createData) {
          return NextResponse.json({
            success: true,
            message: "Added Successfull",
          });
      } else {
          return NextResponse.json({
            success: false,
            message: "Something went wrong",
          });
      }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
