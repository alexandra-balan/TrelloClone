const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardName: String,
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    orderInList: Number,
    description: String,
    dueDate: Date
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card