
const express = require("express");

const serverIP = process.env.SERVER_IP_ADDRESS;

// 임시 API 관리를 위한 맵
const tempAPIs = new Map();

// 특정 비밀번호를 주고 받는다던지
// 유효기간을 준다던지
const requestLink_QR = async (req, res) => {
  try{
    const jwt = req.body.jwt
    const tempPath = Math.random().toString(36).substring(2, 15);

    // 임시 API 생성 및 설정
    tempAPIs.set(tempPath, { jwt });

    // 임시 API를 app에 추가
    req.app.get(`/temp/${tempPath}`, (req, res) => {
      if (tempAPIs.has(tempPath)) {
        const data = tempAPIs.get(tempPath);
        tempAPIs.delete(tempPath); // 첫 요청 후 API 삭제
        res.json(data);
      } else {
        res.status(404).send('Not found or already used');
      }
    });

    return res.json({ link: `http://${serverIP}:5003/temp/${tempPath}` });
  }catch(error){
    console.log("requestLink_QR function error: ", error)
    return res.status(400).send(error);
  }
}

module.exports={
  requestLink_QR
}