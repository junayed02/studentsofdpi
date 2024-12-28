import mongoose from "mongoose";

const NoticeSchema = mongoose.Schema({
  Title: String,
  Description: String,
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);

export default Notice;
