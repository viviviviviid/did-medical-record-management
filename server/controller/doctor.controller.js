require("dotenv").config();
const db = require("../model/index.js");

const doctorRegister = async (req, res) => {
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
