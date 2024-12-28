import { ConnectToDb } from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await ConnectToDb();
    const { searchParams } = new URL(req.url);
    const myId = searchParams.get("id");
    let myData;
    if (myId) {
      myData = await User.find({ _id: myId });
    } else {
      myData = await User.find({});
    }
    if (myData) {
      return NextResponse.json({
        success: true,
        data: myData,
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
