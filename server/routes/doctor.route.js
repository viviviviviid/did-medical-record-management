const router = require("express").Router();
const controller = require("../controller/medicalRecord.controller.js");

router.post("/get-patients-list", controller.getAllMyPatientList);
router.post("/get-all-patient-records", controller.getAllMyPatientsRecords);

module.exports = router;