import mongoose from "mongoose";
export const ConnectToDb = async () => {
  const connectionUrl =process.env.DB_URL;
  mongoose
    .connect(connectionUrl)
    .then(() => {
      console.log("Database Connection Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
