require("dotenv").config();
const db = require("../model/index.js");

/**
 * 의사 인증 완료 후, 협회 DB와 신원 VC 업데이트 
 */
const doctorRegister = async (req, res) => {
  console.log("/new-doctor")
  try{
    const { name, did } = req.body
    await db.Doctor.create({ name, did })
    res.status(200).send("DB 업데이트 완료. 앱으로 새로운 VC가 전달되었습니다.")
  }catch(error){
    console.log("doctorRegister function error: ", error)
    res.status(400).send(error)
  }
}

module.exports = { 
  doctorRegister,
}
