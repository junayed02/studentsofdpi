import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  Number: Number,
  Password: String,
  Name: String,
  Session: String,
  Roll: String,
  Semester: String,
  Group: String,
  Blood: String,
  Skills: String,
  Reg: String,
  Phone: Number,
  Email:String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
