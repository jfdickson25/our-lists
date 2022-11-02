const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    categories: [
        {
            name: { type: String, required: true },
            items: [
                {
                    name: {type: String, required: true},
                    quantity: {type: String, required: true},
                }
            ]
        }
    ],
    crossedOff: [
        {
            name: {type: String, required: true},
            quantity: {type: String, required: true},
            category: {type: String, required: true}
        }
    ]
});

module.exports = mongoose.model("List", listSchema);