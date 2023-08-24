
import KakaoLogin from "react-kakao-login";
import React, {useState} from 'react';
import axios from 'axios';

const OAuthLogin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const kakaoClientId = "5e5e83f35a6ed8891b1e4e5f3d407bbf"
    const handleLogin = async (data)=>{
      
    try{
      console.log(data);
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
