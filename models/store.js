const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
store_id: Number,
store_phone: String,
store_address: String,
roster:[]
})
module.exports = mongoose.model();