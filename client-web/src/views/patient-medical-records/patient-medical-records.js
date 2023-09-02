import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import {useNavigate} from 'react-router-dom';
import InputField from '../../modules/inputField.js';
import NewRecordButton from './newRecordButton.js';
import axios from 'axios';

export default function PatientMedicalRecords() {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const jwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwidXNlckluZm8iOnsibmFtZSI6Iu2ZjeyKueyerCIsImVtYWlsIjoic2pob25nOThAaWNsb3VkLmNvbSIsImJpcnRoZGF5IjoiOTgwOTAxIiwicGhvbmVOdW1iZXIiOiIwMTAtMjg5Mi02NDA4IiwiaXNEb2N0b3IiOnRydWUsImFkZHJlc3MiOiIweGMwMkM5NDRmNmQzOUM3QjREMzk3M2QyMTc1OWJCYzFBZDQ1RmYzMjcifSwibWVkaWNhbFJlY29yZHMiOiI0ZjUzY2RhMThjMmJhYTBjMDM1NGJiNWY5YTNlY2JlNWVkMTJhYjRkOGUxMWJhODczYzJmMTExNjEyMDJiOTQ1IiwiZG9jdG9yTGljZW5zZSI6bnVsbH19LCJzdWIiOnsiZGlkIjoiZGlkOmV0aHI6Z29lcmxpOjB4YzAyQzk0NGY2ZDM5QzdCNEQzOTczZDIxNzU5YkJjMUFkNDVGZjMyNyIsImFkZHJlc3MiOiIweGMwMkM5NDRmNmQzOUM3QjREMzk3M2QyMTc1OWJCYzFBZDQ1RmYzMjcifSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4NWFkYzQ4QUE5NzQ5MzE0NWJBM0ZmQzkwMjQ1RTUzNEM5MzU1YzczMCJ9.o9IBQ_fE2Dj_hyEIibbOYZX8Sp7FsQjLI6XdunLDOFkT6XwaJLwJaOszUcidEMdXpqTRgl80OCibkxh4vbZJ7AE";
    const did = "did";

    const name = new URL(document.location.toString()).searchParams.get("patient");
        // name을 통해 해당 환자의 진료기록 가져오기

    const list = [
        {index:0, date:'2023/08/10', hpt:'국군고양병원', doctor:'홍승재', notes:'척추 제거'}, 
        {index:1, date:'2022/08/12', hpt:'백병원', doctor:'홍승재', notes:'아픔'},
        {index:2, date:'2022/08/15', hpt:'국군수도병원', doctor:'서민석', notes:'아파서 옴'}
    ];

    useEffect(() => {
        axios.post("http://localhost:5001/doctor/get-all-patient-records", 
            {doctorJwt: jwt, patientDid: did}
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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
                        <p className='records-index-date'>날짜</p>
                        <p className='records-index-hpt'>병원</p>
                        <p className='records-index-doctor'>의사</p>
                        <p className='records-index-notes'>진료 내용</p>
                    </div>
                    { list.map((item, index) => {
                        return (
                            <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                key={index}
                                onMouseOver={ () => {handleMouseOver(index)} }
                                onMouseOut={handleMouseOut} 
                                onClick={() => {
                                    navigate(`/patient-medical-record-view?patient=${name}`)
                                }}>
                                <div className='records-list-date'>
                                    <p>{item.date}</p>
                                </div>
                                <div className='records-list-hpt'>
                                    <p>{item.hpt}</p>
                                </div>
                                <div className='records-list-doctor'>
                                    <p>{item.doctor}</p>
                                </div>
                                <div className='records-list-notes'>
                                    <p>{item.notes}</p>
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