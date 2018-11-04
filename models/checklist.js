const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistSchema = new Schema({
    checklist_name: String,
    card_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Card'
    }
});

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;