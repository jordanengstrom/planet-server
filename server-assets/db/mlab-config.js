var mongoose = require('mongoose');
var connectionString = "mongodb://admin:admin@ds044907.mlab.com:44907/nebulous";

var connection = mongoose.connection;
mongoose.connect(connectionString, {
    server: { socketOptions: {keepAlive: 30000, connectTimeoutMS: 30000}}
});

connection.on("error", err => {
    console.log("mlab error: ", err);
});

connection.once("open", () => {
    console.log("Connected to mlab!");
});