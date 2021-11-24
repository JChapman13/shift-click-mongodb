var express = require("express");
var router = express.Router();
var rosterCtrl = require("../controllers/roster");

router.get("/", rosterCtrl.index);
router.get("/new", rosterCtrl.new);
router.delete("/:id", rosterCtrl.delete);
router.post("/", rosterCtrl.create);
router.get("/:id", rosterCtrl.show);
router.get("/edit/:id", rosterCtrl.edit)
router.put("/edit/:id", rosterCtrl.update)

module.exports = router;
