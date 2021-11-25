const Schedule = require("../models/schedule");
const User = require("../models/user");
var moment = require("moment");

function index(req, res) {
  User.find({}, function (err, employees) {
    res.render("schedule/main", { employees });
  });
}

function newWeek(req, res) {
  User.find({}, function (err, employees) {
    res.render("schedule/new", { employees });
  });
}

function create(req, res) {
  const arrSchedules = [];
  let counter = 1;
  let info = req.body;

  for (const schedule in info) {
    if (schedule !== "week_id") {
      console.log(counter);
      if (counter % 2) {
        console.log("new schedule: ", counter);
        arrSchedules.push({});
      }
      const arrData = schedule.split("-");
      const day = arrData[1];
      if (arrData[2] === "start") {
        arrSchedules[arrSchedules.length - 1].week_id = info.week_id;
        arrSchedules[arrSchedules.length - 1].work_day = day;
        arrSchedules[arrSchedules.length - 1].start_time = info[schedule];
        arrSchedules[arrSchedules.length - 1].employee = arrData[0];
      } else {
        arrSchedules[arrSchedules.length - 1].work_day = day;
        arrSchedules[arrSchedules.length - 1].end_time = info[schedule];
      }
      counter++;
    }
  }
  const new_schedule = new Schedule(arrSchedules);
  console.log(arrSchedules);
  arrSchedules.forEach(function (x) {
    Schedule.save(x);
  });
  res.redirect("/schedule", { info });
}
module.exports = {
  index,
  new: newWeek,
  create,
};
