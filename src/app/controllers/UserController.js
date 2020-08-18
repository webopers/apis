const User = require('../models/User');

class UserController {
    // eslint-disable-next-line class-methods-use-this
    async information(req, res) {
        const responseData = {
            code: 'user/success',
            status: 'success',
        };
        const user = await User.findById(req.user._id);
        delete user.password;
        responseData.data = user;
        res.send(responseData);
    }
}

module.exports = new UserController();
