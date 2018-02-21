var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaName = "Star";

// mongoose provides built in IDs if you don't make one.
var schema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now() },
    size: { type: String, enum: ["Small", "Medium", "Large"] },
    color: {type: String, required: true}
});

module.exports = mongoose.model(schemaName, schema);
