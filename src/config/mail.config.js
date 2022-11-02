const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,       //uxcysrvxhidsjoxp 
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'oscarsvillanuevav2021@gmail.com', // generated ethereal user
      pass: 'fntutfbrdlthvsiw', // generated ethereal password
    },
  });

    transporter.verify().then(()=>{
        console.log('Ready for send emails');
    });

  const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: '"Forgot password" <{ oscarsvillanuevav2021@gmail.com }>', // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Asignacion de clave", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
  }

  const getTemplate = (name, token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img src="https://i.imgur.com/eboNR82.png" alt="">
            <h2>Hola ${ name }</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            
            <a href="http://localhost:4000/api/user/confirm/${ token }"
                target="_blank" > Confirmar Cuenta</a>
        </div>
      `;
  }

  module.exports = {
    sendEmail,
    getTemplate
  }