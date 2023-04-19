import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "User First Name cant be more than 20 character"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [20, "User Last Name cant be more than 20 character"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    address: {
      type: String,
      maxLength: [20, "User First Name cant be more than 20 character"],
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    emailValidationCode: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Admin-User", adminUserSchema);
