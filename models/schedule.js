const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  employee_id: String,
  work_day: String,
  start_time: String,
  end_time: String,
})

const weekSchema = new Schema({
week_id: String,
emp_schedule: [shiftSchema]
})

const scheduleSchema = new Schema({
  week_id: String,
  work_day: String,
  start_time: String,
  end_time: String,
  duration: Number,
  employee: {type: Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model("Schedule", scheduleSchema);
