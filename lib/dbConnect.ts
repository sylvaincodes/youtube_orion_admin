import mongoose from "mongoose";
export function dbConnect() {

  //check if moongose is already connected
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.MONGODB_URI as string);
}
