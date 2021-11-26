var express = require("express");
var router = express.Router();
var scheduleCtrl = require("../controllers/schedule");

router.get("/", scheduleCtrl.index)
router.get("/new", scheduleCtrl.new);
router.post("/", scheduleCtrl.create);
router.get("/:id", scheduleCtrl.show)

module.exports = router;
