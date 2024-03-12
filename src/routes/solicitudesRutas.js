const { Router } = require('express');
const { createApplication, getApplications } = require("../controllers/solicitudesControlador")
const router = Router();

router.post("/createApplication", createApplication)
router.get("/getApplications", getApplications)

module.exports = router;