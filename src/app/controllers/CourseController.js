const Course = require('../models/Course');

class CourseController {
    // eslint-disable-next-line class-methods-use-this
    async all(req, res) {
        const courses = await Course.find({}).exec();

        if (!courses) {
            return res.status(401).send({ code: 'course/not-found', status: 'course does not exist' });
        }

        return res.send({ code: 'course/success', status: 'success', data: courses });
    }

    // eslint-disable-next-line class-methods-use-this
    async detail(req, res) {
        const courses = await Course.find({
            $or: [{ _id: req.query._id }, { slug: req.query.slug }],
        }).exec();

        if (!courses) {
            return res.status(401).send({ code: 'course/not-found', status: 'course does not exist' });
        }

        return res.send({ code: 'course/success', status: 'success', data: courses });
    }
}

module.exports = new CourseController();
