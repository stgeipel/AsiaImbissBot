const mongoose = require("mongoose")

const reportSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    userId: String,
    reason: String,
    rUsername: String,
    rUserId: String,
    time: String,
    serverId: String
})

module.exports = mongoose.model("Report", reportSchema);