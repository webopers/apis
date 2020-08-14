const bcrypt = require('bcrypt');
const shortID = require('shortid');
const User = require('../models/User');

const createToken = require('../../util/token/createToken');
const { verifyRegister, verifyLogin } = require('../../util/data/verifyRequest');

class AuthController {
    // eslint-disable-next-line class-methods-use-this
    async register(req, res) {
        const { error } = verifyRegister(req.body);

        if (error) {
            return res.status(400).send({ code: 'auth/data-invalid', status: error.details[0].message });
        }

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
        const secretKey = shortID.generate();

        const user = new User({
            username,
            email,
            password: hashedPassword,
            name: req.body.name,
            secretKey,
        });

        try {
            const savedUser = await user.save();
            const token = createToken({ _id: savedUser._id, secretKey });
            user._id = savedUser._id;
            return res
                .cookie('access_token', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                })
                .send({ code: 'auth/success', status: 'register success', data: { _id: user._id } });
        } catch (err) {
            res.status(400).send(err);
        }
        return user;
    }

    // eslint-disable-next-line class-methods-use-this
    async login(req, res) {
        const { error } = verifyLogin(req.body);

        if (error) {
            return res
                .status(400)
                .send({ code: 'auth/data-invalid', status: error.details[0].message, original: req.body });
        }

        const { email = '', password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .send({ code: 'auth/not-exist', status: 'user does not exist', original: req.body });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send({ code: 'auth/password-incorrect', status: 'password is incorrect' });
        }

        const { secretKey } = user;

        const token = createToken({ _id: user._id, secretKey });
        return res
            .cookie('access_token', token, {
                maxAge: 365 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            .send({ code: 'auth/success', status: 'login success', data: { _id: user._id } });
    }
}

module.exports = new AuthController();
