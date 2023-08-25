import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp({ onSubmit }) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        domain: 'naver.com',
        birthday: '',
        phoneNumber: '',
        isDoctor: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="signup-container">
            {/* 회원 가입 폼 */}
            <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
            <div className="email-input">
                <input type="text" name="email" placeholder="Email" onChange={handleInputChange} />
                @
                <select name="domain" onChange={handleInputChange} value={userInfo.domain}>
                    <option value="naver.com">naver.com</option>
                    <option value="google.com">google.com</option>
                    {/* 기타 도메인 추가 */}
                </select>
            </div>
            <input type="text" name="birthday" placeholder="Birthday (e.g. 970723)" onChange={handleInputChange} />
            <input type="text" name="phoneNumber" placeholder="PhoneNumber (e.g. 010-1234-5678)" onChange={handleInputChange} />
            <label>
                <input type="checkbox" name="isDoctor" checked={userInfo.isDoctor} onChange={(e) => setUserInfo(prev => ({ ...prev, isDoctor: e.target.checked }))} />
                Is Doctor
            </label>
            <button onClick={() => onSubmit(userInfo)}>회원가입 완료</button>
        </div>
    );
}

export default function Auth() {
    const navigate = useNavigate();
    const key = '5e5e83f35a6ed8891b1e4e5f3d407bbf';
    const uri = 'http://localhost:3000/login/auth';
    const code = new URL(document.location.toString()).searchParams.get("code");
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${key}&redirect_ur=${uri}&code=${code}`)
            .then(res => {
                const accessToken = res.data.access_token;
                axios.post('http://localhost:5001/user/login', { token: accessToken })
                    .then(response => {
                        if (response.data === true) {
                            sessionStorage.setItem('login', true);
                            navigate('/');
                        } else {
                            setIsSignUp(true);
                        }
                    })
                    .catch(err => {
                        console.error("SERVER_LOGIN_ERR:", err);
                    });
            })
            .catch(err => {
                console.error("KAKAO_LOGIN_ERR:", err);
            });
    }, [code, navigate, key, uri]);

    const handleSignUp = async (userInfo) => {
        console.log("here")
        const response = await axios.post('http://localhost:5001/user/signup', userInfo);
        console.log(response)
        if (response.data === true) {
            navigate('/');
        } else {
            // Handle sign up error (e.g. showing an error message)
        }
    };

    if (isSignUp) {
        return <SignUp onSubmit={handleSignUp} />;
    }

    return null;
}
