var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "Planet";

// mongoose provides built in IDs if you don't make one.
var schema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now() },
    size: { type: String, enum: ["Small", "Medium", "Large"] },
    hasLife: { type: Boolean, default: false },
    habitable: { type: Boolean, default: false },

    // RELATIONSHIPS
    starId: {type: ObjectId, ref: "Star", required: true} // magic string
});

module.exports = mongoose.model(schemaName, schema);
