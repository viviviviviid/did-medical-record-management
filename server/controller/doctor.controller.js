require("dotenv").config();
const db = require("../model/index.js");
const express = require("express");
const axios = require("axios");
const { use } = require("../routes/user.route");
const app = express();

// test 용으로 사용 : 의사의 did가 들어가 있어야, constraint 조건에서 오류가 안남.
const testInputDoctor = () => {
  const name = "홍박사"
  const did = process.env.TEMP_DOCTOR_DID;
  db.Doctor.create({
    name,
    did,
  })
}

const testInputUser = () => {
  const name = "홍박사"
  const did = process.env.TEMP_DOCTOR_DID;
  const email = "honghong@gmail.com"
  const birthday = "851225"
  const isDoctor = true
  const wallet = "홍박사님을 아세요?"

  db.User.create({
    name,
    did,
    email,
    birthday,
    isDoctor,
    wallet
  })
}

const testStart = () => {
  testInputUser();
  testInputDoctor();
}

testStart()


ß