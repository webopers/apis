const Joi = require('joi');

const verifyRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(4).required(),
    });
    return schema.validate(data);
};

const verifyLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.verifyRegister = verifyRegister;
module.exports.verifyLogin = verifyLogin;
