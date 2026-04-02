import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    sparse: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    sparse: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
