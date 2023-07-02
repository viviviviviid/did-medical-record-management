const signup = async (req, res) => {
    // 카카오톡 api로 이름, 번호, 주소, 생년월일, 성별 가져오기
    // 의료계종사자 유무 체크리스트
    // 지갑주소 만들어주기
    // PostgreSQL에다가 회원가입정보+지갑주소를 저장.
    // 회원가입 후 did 폴더내의 1056 등록 함수를 호출해서 방금 생성된 지갑주소를 레지스트리에 등록해야함
}

const login = async (req, res) => {
    // 카카오 API 로그인
}
 
/**
 * VC 요청
 * @param {*} req 
 * @param {*} res 
 */
const claim = async (req, res) => {
    // did 폴더내의 vc 받아오는 함수 호출
}

/**
 * 보유한 VC를 공유하기 위해 QR코드로 변환 후 화면에 송출
 * @param {*} req 
 * @param {*} res 
 */
const share = async (req, res) => {
    // VC가 유효기간이 지났는지 확인
    // claim을 통해 vc를 받은사람에 한해서, 의사에게 의료정보 공유할 시, vc 내용을 qr코드로 변환
    // 변환된 qr코드를 화면에 송출
}

/**
 * 의사가 요청한 DID 업데이트 승인 여부
 * @param {*} req 
 * @param {*} res 
 */
const approve = async (req, res) => {
    // 의사가 요청한 did 업데이트 승인 버튼
}

/**
 * 보유중인 VC를 이용하여 1056 레지스트리를 조회
 * @param {*} req 
 * @param {*} res 
 */
const retrieve = async (req, res) => {
    // vc를 보유중인 상태에서, 환자가 자신의 정보를 확인하기위해 did폴더내의 조회 함수 호출
}

/**
 * retrieve 함수를 통해 조회한 의료기록을 프론트로 전달
 * @param {*} req 
 * @param {*} res 
 */
const display = async (req, res) => {
    // 조회된 내역 프론트로 보내기
}