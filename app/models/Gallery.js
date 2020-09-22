const mongoose = require("mongoose")

const validator = require("validator")

const Schema = mongoose.Schema
const gallerySchema = new Schema({
    images: {
        type: Array
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Gallery = mongoose.model("Gallery",gallerySchema)
module.exports = {
    Gallery
}