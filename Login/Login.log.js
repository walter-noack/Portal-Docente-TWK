const mongoose = require('mongoose');
const loginshema = requiere('./login.models');

// methods
loginshema.statics = {
    create: function (data,cd) {
        const user = new this(data);
        user.save(cd);
    },
    login: function (query,cd) {
        this.find(query, cd);
    }
}
constloginmodel = mongoose.model('Users', loginshema);
module.exports = loginshema;