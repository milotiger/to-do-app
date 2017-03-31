const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CollectionNames = require('./collectionNames');

let CategorySchema = new Schema({
    CategoryName: {type: String, unique: true},
    CategoryDescription: {type: String, default: null}
});

mongoose.model(CollectionNames.Categories, CategorySchema);