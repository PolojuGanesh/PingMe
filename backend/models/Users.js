import mongoose from "mongoose";

const createUserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    match: [/^\d{10}$/, "Phone number must contain exactly 10 digits"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
    minlength: [7, "Username must be at least 7 characters long"],
    maxlength: [14, "Username cannot exceed 14 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
    ],
  },
  contacts: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserRegister = mongoose.model("UserRegister", createUserSchema);
export default UserRegister;
