import { ConnectToDb } from "@/database";
import Notice from "@/models/Notice";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await ConnectToDb();
    const { searchParams } = new URL(req.url);
    const myId = searchParams.get("id");
    let allNotice;
    if (allNotice) {
      allNotice = await Notice.find({ _id: myId });
    } else {
      allNotice = await Notice.find({});
    }
    if (allNotice) {
      return NextResponse.json({
        success: true,
        data: allNotice,
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
