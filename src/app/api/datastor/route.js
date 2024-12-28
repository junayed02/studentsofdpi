import { ConnectToDb } from "@/database";
import User from "@/models/User";

import { NextResponse } from "next/server";

export async function PUT(req) {
  await ConnectToDb();
  try {
    const requestedId = new URL(req.url);
    const { searchParams } = requestedId;
    const myId = searchParams.get("id");
    if (!myId) {
      return NextResponse.json({
        success: false,
        message: "Invalid Candid",
      });
    }
    const storedData = await req.json();
    const { Name,Session,Phone,Email,Roll, Reg,Semester,Group,Blood,Skills } = storedData;
    const userProfile = await User.findOneAndUpdate(
      {
        _id: myId,
      },
      { Name, Session,Phone,Email, Roll, Reg, Semester, Group, Blood, Skills },
      { new: true }
    );
    if (userProfile) {
      return NextResponse.json({
        success: true,
        message:'successfulll'
      })
    }
  } catch (error) {
    console.log(error);
  }
}
