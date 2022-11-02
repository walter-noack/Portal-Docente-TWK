const UserMail = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../config/jwt.config');
const { getTemplate, sendEmail } = require('../config/mail.config');



const signUp = async (req, res) => {
    try {

        // Obtener la data del usuario: name, email
        const { rut, name, email } = req.body;

        // Verificar que el usuario no exista
        let userMail = await UserMail.findOne({ email }) || null;

        if(userMail !== null) {
            return res.json({
                success: false,
                msg: 'Usuario ya existe'
            });
        }

        // Generar el código
        const code = uuidv4();

        // Crear un nuevo usuario
        userMail = new UserMail({ rut, name, email, code });

        // Generar token
        const token = getToken({ email, code });

        // Obtener un template
        const template = getTemplate(name, token);

        // Enviar el email
        await sendEmail(email, 'Este es un email de prueba', template);
        await userMail.save();

        res.json({
            success: true,
            msg: 'Registrado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const confirm = async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
       
       // Verificar la data
       const data = await getTokenData(token);

       if(data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log(data);

       const { email, code } = data.data;

       // Verificar existencia del usuario
       const userMail = await UserMail.findOne({ email }) || null;

       if(userMail === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       // Verificar el código
       if(code !== userMail.code) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       userMail.status = 'VERIFIED';
       await userMail.save();

       // Redireccionar a la confirmación
       return res.redirect('/confirm.html');
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}


module.exports = {
    signUp,
    confirm
}