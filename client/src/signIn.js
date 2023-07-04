
import KakaoLogin from "react-kakao-login";
import React, {useState} from 'react';

const OAuthLogin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const kakaoClientId = 'fa812615dfd34745d82ce43a05cd3f92'
    const handleLogin = async (data)=>{
      try{
        console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }

    const handleLogout = () => {
      setIsLoggedIn(false);
    }

    return(
        <div>
          {isLoggedIn ? (
            <div>
              <p>로그인 되었습니다.</p>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <KakaoLogin
              token={kakaoClientId}
              onSuccess={handleLogin}
            />
          )}
          
        </div>
    )
}

export default OAuthLogin
