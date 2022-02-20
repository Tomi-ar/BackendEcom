const {createTransport} = require("nodemailer");

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL_SIGNUP,
        pass: process.env.EMAIL_PASS
    }
})

const mailSignup = {
    from: "Servidor node.js",
    to: process.env.EMAIL_SIGNUP,
    subject: "Nuevo usuario registrado",
    html: "<h3>Contenido de prueba desde <span>Nodemailer</span></h3>"
}

const mailOrder = {
    from: "Servidor node.js",
    to: process.env.EMAIL_SIGNUP,
    subject: "Nuevo pedido realizado",
}

module.exports = {transporter, mailSignup, mailOrder};