import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const isDoctor = sessionStorage.getItem("isDoctor");

    useEffect(() => {
        if(isDoctor)
            setMenu([
                {title:'QR코드 확인', route:'qr-code-scan'}, 
                {title:'환자 진료기록', route:'patient-list'}, 
                {title:'의사 인증', route:'doctor-auth'}
            ]);
        else    
            setMenu([
                {title:'QR코드', route:'qr-code'},
                {title:'나의 진료기록', route:'medical-records'}
            ]);
        
    }, [])

    
    const login = sessionStorage.getItem('login');
    const name = sessionStorage.getItem("name");

    return (
        <div className='header'>
                <p className='header-title pointer' onClick={()=>{navigate('/')}}>DMRS</p>
                <div className='header-menu'>
                    { menu.map((pages) => {
                        return (
                            <div className='header-menu-buttons pointer row-center'>
                                <p className='header-menu-font' 
                                    onClick={() => {
                                        if(login)
                                            navigate(`/${pages.route}`);
                                        else 
                                            navigate("/login");
                                    }} >{pages.title}</p>
                            </div>
                        );
                    }) }
                </div>
                <div className='header-user-info pointer row-center'>
                    { login ? 
                        <p onClick={(() => {sessionStorage.clear(); navigate('/');})}>{name}님</p> 
                        : 
                        <p onClick={() => {
                            navigate('/login');
                        }}>로그인</p> }
                </div>
            </div>
    )
}
