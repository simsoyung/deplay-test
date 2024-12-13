const express = require("express");
const controller = require("../controller/Cvisitor");
const router = express.Router();

router.get("/", controller.main);
router.get("/visitor", controller.visitor);
router.get("/visitor/:id", controller.getVisitorID);
router.post("/visitor", controller.postVisitor);
router.delete("/visitor", controller.deleteVisitor);
router.patch("/visitor", controller.patchVisitor);

module.exports = router;
