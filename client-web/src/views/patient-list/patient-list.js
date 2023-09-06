import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './list.css';
import InputField from '../../modules/inputField.js';
import SearchButton from './searchButton.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setPatientDid, setPatientName } from '../../redux/actions';

export default function PatientList() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [patientList, setPatientList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jwt = process.env.REACT_APP_JWT;

    const handleMouseOver = (index => {
        setActiveIndex(index);
    });

    const handleMouseOut = (() => {
        setActiveIndex(null);
    })

    useEffect(() => {
        if(!sessionStorage.getItem("login"))
            navigate("/login");

        axios.post("http://localhost:5001/doctor/get-patients-list",   // 환자 목록 가져오기
            { doctorJwt: jwt }
            )    // 의사 jwt (일단 하드코딩)
            .then((res) => {
                console.log(res);
                setPatientList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <div className='toolbar'>
                    <InputField type='text' setData={setKeyword} label='검색' width='10vw' />
                    <SearchButton keyword={keyword} patientList={patientList} setPatientList={setPatientList} />

                </div>
                <p style={{fontSize:'30px'}}>환자 목록</p>
                <div className='records-box'>
                    <div className='records-index'>
                        <p className='records-index-name-pl'>이름</p>
                        <p className='records-index-email-pl'>이메일</p>
                        <p className='records-index-date-pl'>생년월일</p>
                    </div>
                    { patientList.map((item, index) => {
                        return (
                            <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                key={index}
                                onMouseOver={ () => {handleMouseOver(index)} }
                                onMouseOut={handleMouseOut} 
                                onClick={() => {
                                    navigate(`/patient-medical-records`);
                                    dispatch(setPatientDid(item.did));
                                    dispatch(setPatientName(item.name));
                                }} >
                                <div className='records-list-name-pl'>
                                    <p>{item.name}</p>
                                </div>
                                <div className='records-list-email-pl'>
                                    <p>{item.email}</p>
                                </div>
                                <div className='records-list-date-pl'>
                                    <p>{item.birthday}</p>
                                </div>
                            </div>
                        )
                    }) }

                </div>
            </div>
            <Footer />
        </div>
    )
}