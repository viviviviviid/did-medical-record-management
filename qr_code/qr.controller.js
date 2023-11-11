
const express = require("express");
// 임시 API 관리를 위한 맵
const tempAPIs = new Map();

// 특정 비밀번호를 주고 받는다던지
// 유효기간을 준다던지
const requestLink_QR = async (req, res) => {
  try {
    const jwt = req.body.jwt;
    const password = req.body.password;
    const tempPath = Math.random().toString(36).substring(2, 15);

    tempAPIs.set(tempPath, { jwt, password });

    // POST 요청으로 변경
    req.app.post(`/temp/${tempPath}`, express.json(), (req, res) => {
      if (tempAPIs.has(tempPath)) {
        const data = tempAPIs.get(tempPath);
        // 요청 본문의 password와 저장된 password 비교
        if (req.body.password === data.password) {
          res.json({ jwt: data.jwt });
        } else {
          res.status(403).send('Unauthorized access');
        }
        tempAPIs.delete(tempPath); // 첫 요청시 API 삭제
      } else {
        res.status(404).send('Not found or already used');
      }
    });

    return res.json({ link: `http://localhost:5003/temp/${tempPath}` });
  } catch (error) {
    console.log("requestLink_QR function error: ", error);
    return res.status(400).send(error);
  }
};

module.exports = {
  requestLink_QR
}