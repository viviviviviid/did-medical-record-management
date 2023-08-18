import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const menu = [{title:'진료기록', route:'medical-records'}, {title:'메뉴1', route:'menu1'}, {title:'메뉴2', route:'menu2'}];
    const login = sessionStorage.getItem('login');
    const name = '승재';    // 이후에 session에서 가져올 것

    return (
        <div className='header'>
                <p className='header-title'>DMRS</p>
                <div className='header-menu'>
                    { menu.map((pages) => {
                        return (
                            <div className='header-menu-buttons pointer row-center'>
                                <p className='header-menu-font' 
                                    onClick={() => {
                                        navigate(`/${pages.route}`);
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