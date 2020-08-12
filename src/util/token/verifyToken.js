const jwt = require('jsonwebtoken');

const User = require('../../app/models/User');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).send({ code: 'auth/access-denied', status: 'access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const { _id, secretKey } = verified;
        const user = await User.findById(_id).exec();

        if (!user) return res.status(401).send({ code: 'auth/access-denied', status: 'access denied' });

        if (user.secretKey !== secretKey) {
            return res.status(401).send({ code: 'auth/token-expired', status: 'access token is expired' });
        }

        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send({ code: 'auth/token-invalid', status: 'token is invalid' });
    }

    return token;
};

module.exports = verifyToken;
