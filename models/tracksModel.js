// ROUTE 4
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrackSchema = new Schema(
    {
        url:{type: String},
        title: { type: String },
        category: { type: String},
        description: { type: String},
        reporter: { type: String},
        tags: {type: String},
        yearCollection: {type: Number},
        comments: {type: String},
        datePost:{type:String}
    }
    // { date: { type: Date, default: Date.now() } },
    // { timestamps: true },   // Date post
)

module.exports = mongoose.model('tracks', TrackSchema)
