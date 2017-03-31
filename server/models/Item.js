const mongoose = require('mongoose');
const Schema = mongoose.Schema
const CollectionNames = require('./collectionNames');

let ItemSchema = new Schema({
    ItemName: {type: String, unique: true},
    ItemDescription: {type: String, default: null},
    Category: {type: Schema.Types.ObjectId, default: null, ref: CollectionNames.Categories},
    CreatedAt: {type: Number, default: Date.now},
    ModifiedAt: {type: Number, default: Date.now}
});

mongoose.model(CollectionNames.Items, ItemSchema);