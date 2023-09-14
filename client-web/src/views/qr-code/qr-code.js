import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import QRCode from "react-qr-code";
import "./qr-code.css";
import { useNavigate } from 'react-router-dom';

export default function QrCode() {
    const navigate = useNavigate(); 
    const [sec, setSec] = useState(15);
    const [vcJwt, setVcJwt] = useState("");
    
    useEffect(() => {
        setVcJwt(localStorage.getItem("jwt"))
        setTimeout(() => {
            navigate("/");
        }, 15000);
        
        setInterval(() => {
            setSec(sec => sec-1);
        }, 1000);
    }, [])

    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <div className='qr-code-container column-center'>
                    <p className='qr-code-timer'>{sec}초 남았습니다</p>
                    <QRCode 
                        value={`${vcJwt}`}
                        bgColor="#EEE" 
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}