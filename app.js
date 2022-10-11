
const express = require('express');
const loginrouters = requiere('./login/login.routers');
const propertis = require('./config/propertis');
const DB = require ('./config/db');
//in DB
DB();
const app = express();
const router = express.Router();
app.user('/api', router);
loginrouters =require (router);
router.get('/', ( req, res) => {
    res.send('hi from home');
});

app.get('/', ( req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});
app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto: ' + 3000)
});