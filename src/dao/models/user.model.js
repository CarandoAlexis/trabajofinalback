import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ["admin", "usuario", "premium"],
    default: "usuario",
  },
  githubId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

const userModel = mongoose.model("users", userSchema);

export default userModel;