const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  address: String,
  birthdate: Date,
  emp_phone: Number,
  emp_email: String,
  emp_id: Number,
  job_title: String,
  salary: Number,
  emp_type: String,
  is_admin: Boolean,
});

module.exports = mongoose.model("User", userSchema);
