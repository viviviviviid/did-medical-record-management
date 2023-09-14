import { signUp_DID, update_DID } from "./did.controller.js"


const test = async ()  => {

  const data = await signUp_DID({
    name: "minseok", 
    email: "tyy8282@gmail.com", 
    birthday: "19970723",
    phoneNumber: "010-2701-1627",
    isDoctor: false,
  })
  console.log("data", data)

  // console.log(await update_DID(data.jwt, "0x000000"));
}

test();


// 이걸 서버쪽에서 해줘야함
// babel로 묶어 쓰거나, 답변대로 동적 호출을 하던가.
// es6 <--> commonJS