const User = require('../models/User');

class UserController {
    // eslint-disable-next-line class-methods-use-this
    information(req, res) {
        res.send({ username: 'encacap' });
    }
}

module.exports = new UserController();
