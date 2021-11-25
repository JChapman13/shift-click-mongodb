const User = require("../models/user");

function index(req, res) {
  User.find({}, function (err, employees) {
    res.render("roster/employees", { employees, emp_details: undefined });
  });
}

function newUser(req, res) {
  res.render("roster/new", { title: "New Employee" });
}

function create(req, res) {
  req.body.is_admin = !!req.body.is_admin;
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const employee = new User(req.body);
  employee.save(function (err) {
    if (err) return res.redirect("/roster");
    res.redirect("/roster");
  });
}

function show(req, res) {
  User.find({}, function (err, employees) {
    let emp_details = employees.find(function (e) {
      return req.params.id == e._id;
    });
    res.render("roster/employees", { emp_details, employees });
  });
}

function deleteEmp(req, res) {
  User.findByIdAndDelete(req.params.id, function (err) {
    if (err) console.log(err);
    res.redirect("/roster");
  });
}

function editEmp(req, res) {
  User.findById(req.params.id, function (err, emp_details) {
    res.render("roster/edit", { emp_details });
  });
}

function update(req, res) {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(function (success) {
      res.redirect("/roster");
    })
    .catch(function (error) {
      res.status(404).send(err);
    });
}

module.exports = {
  index,
  new: newUser,
  create,
  show,
  delete: deleteEmp,
  edit: editEmp,
  update,
};
