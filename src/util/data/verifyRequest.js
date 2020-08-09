const Joi = require('joi');

const verifyRegister = (data) => {
    const schema = Joi.object({
        username: Joi.required().string().min(6).max(55),
        email: Joi.required().email(),
        password: Joi.required().string().min(6),
        name: Joi.required().string().min(4).max(255),
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
