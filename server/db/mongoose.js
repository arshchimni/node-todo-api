const mongoose = require("mongoose");

mongoose.Promise=global.Promise;
dbUrl=process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/TodoApp';
mongoose.connect(dbUrl);

module.exports.mongoose=mongoose;