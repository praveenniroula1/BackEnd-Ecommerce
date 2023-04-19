import express from "express";
import { addAdminUser } from "../Models/AdminUser/AdminUserModel.js";
import { hashPassword } from "../Helpers/bCryptHelper.js";
import { newAdminUserValidation } from "../middlewares/JoiValidation/adminUserValidation.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../Helpers/emailHelper.js";
const router = express.Router();

// Server Side validation
// Encrypt User Password
// Insert into the database
// create unique verify code
// send a link pointing to our frontend with email and verification code

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4;

    const user = await addAdminUser(req.body);

    if (user?._id) {
      res.json({
        status: "success",
        message: "Created new user, please check email to verify",
      });

      const url = `${process.env.Root_Domain}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;

      // send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable To Create new user",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "User ALready Exist";
    }
    next(error);
  }
});

router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "To Do Verify new user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
