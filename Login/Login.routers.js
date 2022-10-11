const { Router } = require('express');
const unsers = require( './Login.controller');
module.exports = (rputer) => {
    Router.post('register', Users.createUuser);
    Router.post('/.Login', Users.loginUser);
}