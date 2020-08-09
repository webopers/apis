const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');

    if (!token) return res.status(401).send({ code: 'auth/access-denied', status: 'access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send({ code: 'auth/token-invalid', status: 'token is invalid' });
    }

    return token;
};

module.exports = verifyToken;
