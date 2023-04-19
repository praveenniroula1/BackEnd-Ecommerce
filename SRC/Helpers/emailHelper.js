import nodemailer from "nodemailer";
// email configuaration

// email template

const emailProcessor = async (emailBody) => {
  try {
    //1. create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    //2.  send mail with defined transport object
    let info = await transporter.sendMail(emailBody);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// make sure emaildata has fname,email and url
export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Fred Foo 👻" <myemail@praveenStore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email Verification Instruction", // Subject line
    text: `Hi ${emailData.fName}, Please follow the link to verify your email: ${emailData.url}`, // plain text body
    html: `<p>Hi ${emailData.fName}</p> <br></br>
    <p>Please follow the instruction to verify your email</p> <br></br>
    <p> <a href="${emailData.url}">Verify Email</a></p> <br></br>
    
    <p>Regards,</p> <br></br>
    <p>Praveen Niroula Store</p>`, // html body
  };
  emailProcessor(emailBody);
};
