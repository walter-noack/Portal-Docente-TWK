const mailer = require('../mailer/mailer')


//generador de codigo aleatorio de cuatro digitos alfanumerico
let numbers = "0123456789";
let letras ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let todo = numbers + letras;

const generarcodigo = (longitud) => {
    let codigo = "";
    for (let x =0; x < longitud; x++) {
        let aleatorio = Math.floor(Math.random() * todo.length);
        codigo += todo.charAt(aleatorio);
    }
    return codigo;
};

console.log(generarcodigo(4));

      // Se envia el email 
        transporter.sendMail(mailOptions, function(error){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email enviado correctamente");
            res.status(200).json(req.body);
        }
        });
