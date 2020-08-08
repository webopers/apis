const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    // eslint-disable-next-line class-methods-use-this
    async register(req, res) {
        const { email, username, password } = req.body;
        // Checking if user is already in the Database
        const existEmail = await User.findOne({ email });
        const exitsUser = await User.findOne({ username });

        if (existEmail) {
            return res.status(400).send({ code: 'auth/email-taken', status: 'email is already taken' });
        }
        if (exitsUser) {
            return res.status(400).send({ code: 'auth/username-taken', status: 'username is already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            name: req.body.name,
        });

        try {
            const savedUser = await user.save();
            user._id = savedUser._id;
            res.send({ _id: user._id, username, email });
        } catch (error) {
            res.status(400).send(error);
        }
        return user;
    }

    // eslint-disable-next-line class-methods-use-this
    async login(req, res) {
        const { email = '', password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ code: 'auth/not-exist', status: 'user does not exist' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send({ code: 'auth/password-incorrect', status: 'password is incorrect' });
        }

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
        return res.header('token', token).send({ token });
    }
}

module.exports = new AuthController();
