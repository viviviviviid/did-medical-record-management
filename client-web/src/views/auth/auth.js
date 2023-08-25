import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/actions.js';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './auth.css';


export default function Auth() {
    const navigate = useNavigate();
    const key = process.env.REACT_APP_KAKAO_LOGIN;
    const uri = 'http://localhost:3000/login/auth';
    const code = new URL(document.location.toString()).searchParams.get("code");
    const dispatch = useDispatch();


    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        dispatch(setIsLoading(true));
    }, []);

    useEffect(() => {
        console.log("isLoading : ", isLoading);       // 1번 로그
    }, [isLoading]);

    useEffect(() => {
        console.log(code);

        const fetchData = async() => {
            const tokenRes = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${key}&redirect_ur=${uri}&code=${code}`);

            const tokenObject = {"access_token" : tokenRes.data.access_token, "refresh_token" : tokenRes.data.refresh_token};
            
            console.log(tokenObject);

            await axios.post('http://localhost:5001/user/login', {token: tokenObject})
                .then(res => {
                    if(!res.data.dbData){ // 신규가입일때
                        console.log("카카오 계정 정보: ", res.data.userInfo);
                        navigate('/signup');
                    } else {              // 기존회원일때
                        console.log("DB 정보: ", res.data.dbData);

                        dispatch(setIsLoading(false));      // loading 
                        navigate('/');
                    }               
                })
                .catch(console.log)

                // 이거 원래 useState로 진행하려 했는데, DB에서 내용 받고 useState에 넣고 적용되는데 시간이 좀 걸리는거같아서
                // chatGPT한테 물어보니까 useEffect 하나 더 써야한다더라고, 그래서 이렇게 .then 안에 넣어놧어
                // 바꾸고싶으면 바꿔도 됨

                // 아 그리고 내가 DB에서 이미 회원가입한 내용이 있는지 찾는 식별자가 카카오 이메일 계정이라서
                // 회원가입할때 카카오 이메일 계정을 박아두고 수정 못하게 해줘야할거같아. 이름하고 전화번호도
                // 이 개인정보는 신규가입일때 추가적으로 보내줄게 위에 있을거야 -> res.data.userInfo
        }

        fetchData();


    }, [code]);

    return (
        isLoading ? 
            <div className='row-center auth-loaded'>
            </div>
            :
            <div className='column-center auth-loading'>
                    <p>Loading</p>
                <Box sx={{ width: '60%' }}> 
                    <LinearProgress />
                </Box>
            </div>
    )
}
