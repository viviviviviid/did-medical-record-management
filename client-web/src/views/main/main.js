import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import "./main.css";
import { useNavigate } from 'react-router-dom';
import kakaoLogin from '../../assets/images/kakao-login.png';

function QrCard() {
    const navigate = useNavigate();
    return (
        <div className='qr-card pointer'
            onClick={() => {
                navigate("/qr-code");
            }}>
            <div className='upper-card'>
                <p>DID QR 코드</p>
            </div>
            <div className='qr-card-content'>
                <p className='qr-card-title'>이름</p>
                <p className='qr-card-text'>{sessionStorage.getItem("name")}</p>
                <p className='qr-card-title'>생년월일</p>
                <p className='qr-card-text'>{sessionStorage.getItem("birthday")}</p>
            </div>

        </div>
    )
}

export default function Main() {
    const navigate = useNavigate();
    const login = sessionStorage.getItem("login");
    
    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                {
                    login ?
                    <QrCard />
                    :
                    <div className="login-box column-center">
                        <p className="no-margin" style={{fontSize:'50px'}}>소셜로그인</p>
                        <img className='kakao-login pointer' 
                            src={kakaoLogin} 
                            onClick={()=>{navigate("/login")}} />
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}