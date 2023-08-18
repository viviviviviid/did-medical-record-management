import { signUp_DID } from "./signUp.did.js";

signUp_DID({
  name: "minseok", 
  email: "tyy8282@gmail.com", 
  birthday: "19970723",
  phoneNumber: "010-2701-1627",
  isDoctor: false,
  address: "0x0949D2B2b8fe7DD42e38Ea07de88815195A462C5"
})

// 이걸 서버쪽에서 해줘야함
// babel로 묶어 쓰거나, 답변대로 동적 호출을 하던가.
// es6 <--> commonJS