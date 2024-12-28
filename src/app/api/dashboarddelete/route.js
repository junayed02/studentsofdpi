
import { ConnectToDb } from "@/database";
import Notice from "@/models/Notice";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await ConnectToDb();
    const { searchParams } = new URL(req.url);
    const existingUrl = searchParams.get("id");
    if (!existingUrl) {
      return NextResponse.json({
        success: false,
        message: "url required",
      });
    }
    const deleteData = await Notice.findByIdAndDelete(existingUrl);
    if (deleteData) {
      return NextResponse.json({
        success: true,
        message: "delete successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
