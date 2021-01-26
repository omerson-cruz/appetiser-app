const sgMail = require("@sendgrid/mail");

require("dotenv").config({ path: "./dev.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email) => {
  console.log("sending email");
  try {
    await sgMail.send({
      to: email,
      from: "omerson.e.cruz@gmail.com",
      subject: "Appetiser Verification Code",
      html: `
                    <div >

                        <p>Welcome to Appetiser App.</p>
                        <p>Please input the verification code below </p>
                        <p style="font-size: 1.8rem; font-weight: bold">code: <span class="code">00000</span</p>
                    </div>



            `,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = { sendVerificationEmail };
