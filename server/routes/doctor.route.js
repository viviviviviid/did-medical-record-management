const router = require("express").Router();
const controller_record = require("../controller/medicalRecord.controller.js");
const controller_doctor = require("../controller/doctor.controller.js")

router.post("/get-patients-list", controller_record.getAllMyPatientList);
router.post("/get-all-patient-records", controller_record.getAllMyPatientsRecords);
router.post("/new-doctor", controller_doctor.doctorRegister)

module.exports = router;