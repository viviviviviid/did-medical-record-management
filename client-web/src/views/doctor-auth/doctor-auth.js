import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './doctor-auth.css';

export default function DoctorAuth() {
    const doctorList = [
        {name: '홍승재', id: "980901-1037414"},
        {name: '서민석', id: "980901-1037414"},
        {name: '황준모', id: "980901-1037414"},
    ]
    return(
        <div className='root'>
            <Header />
                <div className='column-center auth-box'>
                <p style={{fontSize:'30px'}}>의사 명단</p>
                    <div className='records-box'>
                        <div className='records-index'>
                            <p className='records-index-date'>이름</p>
                            <p className='records-index-hpt'>주민등록번호</p>
                            {/* <p className='records-index-notes'>진료 내용</p> */}
                        </div>
                        { doctorList.map((item, index) => {
                            return (
                                <div className={`records-list pointer`} 
                                    key={index} >
                                    <div className='records-list-date'>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='records-list-hpt'>
                                        <p>{item.id}</p>
                                    </div>
                                    <input 
                                        type="checkbox"
                                        className='auth-checkbox' 
                                        onClick={() => {
                                            // 인증 axios 요청
                                        }}/>
                                </div>
                            )
                        }) }

                    </div>
                </div>
            <Footer />
        </div>
    )
}