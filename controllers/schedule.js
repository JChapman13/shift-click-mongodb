const Schedule = require("../models/schedule");
const User = require("../models/user");

function index(req, res) {
  Schedule.distinct("week_id", function (err, schedule) {
    console.log(schedule);
    res.render("schedule/main", { schedule });
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
      if (counter % 2) {
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
        arrSchedules[arrSchedules.length - 1].end_time = info[schedule];
      }
      counter++;
    }
  }

  Schedule.insertMany(arrSchedules, function (err) {
    if (err) return res.redirect("/schedule");
    res.redirect("/schedule");
  });
}

function show(req, res) {
  Schedule.find({ week_id: req.params.id })
    .populate("employee")
    .exec(function (err, employees) {
      let employeeNames = employees.map(
        (e) => e.employee.first_name + " " + e.employee.last_name
      );
      let uniqueEmployees = [...new Set(employeeNames)];
      uniqueEmployees.forEach((e, idx) => {
        uniqueEmployees[idx] = { employee: e };
        employees.forEach((eDoc) => {
          if (`${eDoc.employee.first_name} ${eDoc.employee.last_name}` === e) {
            uniqueEmployees[idx][eDoc.work_day] = {};
            uniqueEmployees[idx][eDoc.work_day].start_time = eDoc.start_time;
            uniqueEmployees[idx][eDoc.work_day].end_time = eDoc.end_time;
          }
        });
      });
      res.render("schedule/show", { uniqueEmployees });
    });
}
module.exports = {
  index,
  new: newWeek,
  create,
  show,
};
