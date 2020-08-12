const mongoose = require('mongoose');

const { Schema } = mongoose;

const Course = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            max: 255,
            min: 4,
        },
    },
    {
        timestamps: true,
        // eslint-disable-next-line comma-dangle
    }
);

module.exports = mongoose.model('Course', Course);
