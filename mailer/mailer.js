const nodemailer = require ('nodemailer')

const createTrans = () => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "966039960896ea",
            pass: "d776da7d8a5310"
        }
    })
    return transport;
}

const sendMail = async () => {
    const transporter = createTrans ()
    const info = await transporter.sendMail({
        from: '"no reply message"<>',
        to: '',
        subject: 'Recuperacion de contraseña',
        html: 
        ' <b> su codigo de verificacion es </b> ',
    });
    console.log("Message sent: &s", info.messageId)
    return
}
exports.sendMail = () => sendMail()