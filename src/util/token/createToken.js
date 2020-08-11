const jwt = require('jsonwebtoken');

const createToken = (tokenData) => {
    const token = jwt.sign(
        { ...tokenData, createdBy: 'https://webopers.com' },
        // eslint-disable-next-line comma-dangle
        process.env.TOKEN_SECRET
    );
    return token;
};

module.exports = createToken;
