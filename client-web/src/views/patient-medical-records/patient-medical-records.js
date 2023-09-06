import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import {useNavigate} from 'react-router-dom';
import InputField from '../../modules/inputField.js';
import NewRecordButton from './newRecordButton.js';
import axios from 'axios';
import "./patient-medical-records.css";
import { useDispatch, useSelector } from 'react-redux';
import { setPatientRecord } from '../../redux/actions';

export default function PatientMedicalRecords() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const patientDid = useSelector(state => state.patientDid);
    const dispatch = useDispatch();

    const name = useSelector(state => state.patientName);

    useEffect(() => {
        axios.post("http://localhost:5001/doctor/get-all-patient-records", 
            {doctorJwt: sessionStorage.getItem("jwt"), patientDid: patientDid}
            )
            .then((res) => {
                setRecords(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [patientDid]);

    const handleMouseOver = (index => {
        setActiveIndex(index);
    });

    const handleMouseOut = (() => {
        setActiveIndex(null);
    })


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
            <p style={{fontSize:'30px'}}>{name}님의 진료 기록</p>
                <div className='records-box'>
                    <div className='records-index'>
                        <p className='records-index-date'>진료 내용</p>
                        <p className='records-index-hpt'>병원</p>
                        <p className='records-index-doctor'>담당의사</p>
                        <p className='records-index-notes'>진료일자</p>
                    </div>
                    { records.map((item, index) => {
                        return (
                            <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                key={index}
                                onMouseOver={ () => {handleMouseOver(index)} }
                                onMouseOut={handleMouseOut} 
                                onClick={() => {
                                    navigate(`/patient-medical-record-view`);
                                    console.log(records[index]);
                                    dispatch(setPatientRecord(records[index]));
                                }}>
                                <div className='records-list-date'>
                                    <p>{item.diagnosis}</p>
                                </div>
                                <div className='records-list-hpt'>
                                    <p>{item.hospital}</p>
                                </div>
                                <div className='records-list-doctor'>
                                    <p>{item.doctorName}</p>
                                </div>
                                <div className='records-list-notes'>
                                    <p>{item.update_at}</p>
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