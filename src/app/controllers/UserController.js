const User = require('../models/User');

class UserController {
    // eslint-disable-next-line class-methods-use-this
    async information(req, res) {
        const { _id, name, username, email } = await User.findById(req.user._id);
        return res.send({ _id, name, username, email });
    }
}

module.exports = new UserController();
