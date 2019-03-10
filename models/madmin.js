const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    serverid: String,
    servername: String,
    clientid: String,
    clientname: String,
    addedAt: String
})

module.exports = mongoose.model("Admin",adminSchema)