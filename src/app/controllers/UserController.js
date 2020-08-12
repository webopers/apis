class UserController {
    // eslint-disable-next-line class-methods-use-this
    async information(req, res) {
        return res.send(req.user);
    }
}

module.exports = new UserController();
