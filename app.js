
const express = require('express');

const app = express();

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});
app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto: ' + 3000)
});