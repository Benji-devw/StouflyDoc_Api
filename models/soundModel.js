// ROUTE 4
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SoundSchema = new Schema(
    {
        title: { type: String },
        category: { type: String, required: false },
        description: { type: String, required: false },
        reporter: { type: String, required: false },
        tags: {type: String, required: false},
        yearCollection: {type: Number, required: false},
        comments: {type: String}
    },
    { date: { type: Date, default: Date.now } },
    { timestamps: true },   // Date post
)

module.exports = mongoose.model('sound', SoundSchema)
