function index(req, res) {
  res.render("homepage/index", { title: "Home" });
}

module.exports = {
  index,
};
