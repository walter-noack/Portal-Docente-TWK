const User =require('./Login.log');
 

exports.create = (req, res ,next) => {
    const newUser ={
        run: req.body.name,
       password:req.body.password,
    }
    User.create (newUser, (err,user) => {
        if(err) return res.status(401).send('access denied');
    });
    //response
    res.send({User});
}
exports.loginUser = (req, res, next) => {
    const userData = {
        run: req.body.run,
        password: req.body.password,
    }
    //Buscar user
    User.findone({run: userData.run}),  (err, user)=> {
        if (err) return res.status(401).send('access denied');
    }

}