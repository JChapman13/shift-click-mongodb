const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  id: Number,
  work_date: Date,
  time_start: Date,
  time_end: Date,
  duration: Number,
  is_holiday: Boolean,
});

module.exports = mongoose.model("Schedule", scheduleSchema);
