const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: String,
    list: {type: Schema.Types.ObjectId, ref: 'List'},
    board: {type: Schema.Types.ObjectId, ref: 'Board'},
    attachments: [{
        name: String,
        mimetype: String,
        url: String,
        preview: {
            height: Number,
            width: Number
        }
    }]

    //comments
});

cardSchema.methods.getPublicFields = function () {
    var fields = {
        _id: this._id,
        title: this.title,
        list: this.list,
        board: this.board,
        attachments: this.attachments
    };

    return fields;
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;