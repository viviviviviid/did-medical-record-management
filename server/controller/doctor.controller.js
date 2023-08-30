const db = require("../model/index.js");
const express = require("express");
const axios = require("axios");
const { use } = require("../routes/user.route");
const app = express();

// test 용으로 사용 : 의사의 did가 들어가 있어야, constraint 조건에서 오류가 안남.
const testInputDoctor = () => {
  const name = "홍박사"
  const did = JSON.stringify({
    "did":"did:ethr:goerli:0xEC6138620175229050554653Bf36a1f49e767e8A",
    "address":"0xEC6138620175229050554653Bf36a1f49e767e8A"
  });
  
  console.log(did)
  
  db.Doctor.create({
    name,
    did,
  })
}

testInputDoctor();