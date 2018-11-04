const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    boardName: String,
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isPrivate: Boolean
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board