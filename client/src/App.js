
import KakaoLogin from "react-kakao-login";

const SocialKakao =()=>{

    const kakaoClientId = 'fa812615dfd34745d82ce43a05cd3f92'
    const kakaoOnSuccess = async (data)=>{
      	console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return(
        <>
          <KakaoLogin
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFail={kakaoOnFailure}
          />
        </>
    )
}

export default SocialKakao
