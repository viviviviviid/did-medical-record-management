
import KakaoLogin from "react-kakao-login";
import React, {useState} from 'react';
import axios from 'axios';

const OAuthLogin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const kakaoClientId = '7590c1c19d4fb81f54043b4b90a9aedd';
    const handleLogin = async (data)=>{
      
    try{
      const idToken = data.response.access_token;  // 엑세스 토큰 백엔드로 전달
      axios.post("http://localhost:5001/user/usercheck", {
        token : idToken
      }).then((res) => {
        console.log(res);
      })
      
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
