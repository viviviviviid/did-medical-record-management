import { useNavigate } from 'react-router-dom';
import kakaoLogin from '../../assets/images/kakao-login.png';

export default function Login() {

    const Rest_api_key = process.env.REACT_APP_KAKAO_LOGIN; //REST API KEY
    console.log("here", Rest_api_key);
    const navigate = useNavigate();
    const redirect_uri = 'http://localhost:3000/login/auth' //Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return(
        <div className="root login">
            <div className="login-header row-center">
                <p className="no-margin pointer"
                    onClick={() => {
                        navigate("/");
                    }}>DMRS</p>

            </div>
            <div className="login-body row-center">
                <div className="login-box column-center">
                    <p className="no-margin" style={{fontSize:'50px'}}>소셜로그인</p>
                    <img className='kakao-login pointer' src={kakaoLogin} onClick={handleLogin} />
                </div>
            </div>
        </div>

    )
}