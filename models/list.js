const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listName: String,
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    orderInBoard: Number
});

const List = mongoose.model('List', listSchema);

module.exports = List