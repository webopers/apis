const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            createBy: 'https://webopers.com',
        },
        // eslint-disable-next-line comma-dangle
        process.env.TOKEN_SECRET
    );
    return token;
};

module.exports = createToken;
