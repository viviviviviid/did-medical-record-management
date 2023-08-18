import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './actions.js';

export default function Auth() {
    const navigate = useNavigate();
    const key = '5e5e83f35a6ed8891b1e4e5f3d407bbf';
    const uri = 'http://localhost:3000/login/auth';
    const code = new URL(document.location.toString()).searchParams.get("code");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(code);
        
        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${key}&redirect_ur=${uri}&code=${code}`)
        .then(res => {
            console.log("TOKEN : ", res.data.access_token, res.data.refresh_token);
            sessionStorage.setItem('login', true);
            navigate('/');
        })
        .catch(err => {
            console.log("LOGIN_ERR : ", err);
        })
    }, [code]);

    return null;
}
