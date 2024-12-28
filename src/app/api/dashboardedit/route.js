


import { ConnectToDb } from "@/database";
import Notice from "@/models/Notice";
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
    const { Title,Description } =
      storedData;
    const userProfile = await Notice.findOneAndUpdate(
      {
        _id: myId,
      },
      { Title, Description },
      { new: true }
    );
    if (userProfile) {
      return NextResponse.json({
        success: true,
        message: "successfulll",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
