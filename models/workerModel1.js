const mongoose = require("mongoose")
//creating a database schema --this defines our database
const workerSchema = mongoose.Schema({
    // name: String,
    // field: String,
    // age: Number,
    // salary: Number,
        prodname:String,
        ddprodtype:String, 
        sdate:Date,
        tonn:String,
})

module.exports = mongoose.model("Worker1", workerSchema)


