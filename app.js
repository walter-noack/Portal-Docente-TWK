const express = require('express');
const app = express();

const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login', async (req,res)=>{
    //datos que vamos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;
    //comprobamos que los datos sean correctos

    if(user ==='admin' && password == '12345'){
        let passwordHash = await bcryptjs.hash(password, 8);
        res.json({
            message:'!Autenticacion correcta!',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message:"ingrese correctamente sus credenciales"
        })
    }
});

app.get('/compare',(req,res)=>{
    let hashSaved = "$2a$08$yfGJWJ5DSxdOjJa82icDMeMFJhKxTYmp/FTHcobPpRhPvTBOZtjtm";
    let compare = bcryptjs.compareSync('12345', hashSaved);
    if(compare){
        res.json('OK');
    }else{
        res.json('no son iguales');
    }
})

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto: ' + 3000)
});
