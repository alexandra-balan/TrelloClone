const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistItemSchema = new Schema({
    checklist_item_description: String,
    checklist_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Checklist'
    },
    is_completed: Number
});

const ChecklistItem = mongoose.model('ChecklistItem', checklistItemSchema);

module.exports = ChecklistItem