const User = require('../models/User');

class UserController {
    // eslint-disable-next-line class-methods-use-this
    async information(req, res) {
        const { _id, secretKey } = req.user;
        const user = await User.findById(_id).exec();

        if (!user) return res.status(401).send({ code: 'auth/not-exist', status: 'user does not exist' });
        if (user.secretKey !== secretKey) {
            return res.status(401).send({ code: 'auth/token-expired', status: 'access token is expired' });
        }

        return res.send(user);
        // SDMF
    }
}

module.exports = new UserController();
