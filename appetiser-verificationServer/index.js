const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "./dev.env" });
const { sendVerificationEmail } = require("./emails/sendGrid");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/emailVerify", async function (req, res) {
  try {
    const email = req.body.email;

    await sendVerificationEmail(email);

    res.status(200).send({
      status: "success",
      message:
        "Verification Code sent successfully. Please check on your Spam messages",
    });
  } catch (err) {
    console.log("err: ", err);
    res.status(401).send({
      error:
        "Error sending verification code. Please check if email is correct",
    });
  }
});

app.listen(port, () => {
  console.log("Server is up and running on port: " + port);
});
