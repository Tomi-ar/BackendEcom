const twilio = require("twilio");
const dotenv = require('dotenv');
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const twNewUser = {
    from: "whatsapp:+14155238886",
    body: "Mensaje desde Twilio, nuevo usuario registrado",
    mediaUrl: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"],
    to: process.env.TWILIO_NUMBER
}

const twNewOrder = {
    from: "whatsapp:+14155238886",
    mediaUrl: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"],
    to: process.env.TWILIO_NUMBER

}

module.exports = { client, twNewUser, twNewOrder };