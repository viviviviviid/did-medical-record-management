import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Empty() {
    return (
        <div className='row-center'>
            <p>진료 내역이 없습니다</p>
        </div>
    )
}

export default function Records() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [records, setRecords] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const navigate = useNavigate();

    async function getDb() {
        const _records = await axios.post("http://localhost:5001/user/get-my-record", 
            { vcJwt: localStorage.getItem("jwt") }
        )
        setRecords(_records.data);
        console.log("records : ", records, records.length);
        if(records.length === 0)
            setIsEmpty(true);
    }

    useEffect(() => {
        if(!sessionStorage.getItem("login"))
            navigate("/login");
        getDb();
    }, [])

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
            <p style={{fontSize:'30px'}}>진료 기록</p>
                <div className='records-box'>
                    <div className='records-index'>
                        <p className='records-index-date'>날짜</p>
                        <p className='records-index-hpt'>병원</p>
                        <p className='records-index-doctor'>의사</p>
                        <p className='records-index-notes'>진료 내용</p>
                    </div>
                    {
                        isEmpty ?
                        <Empty />
                        :
                        records.map((item, index) => {
                            return (
                                <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                    key={index}
                                    onMouseOver={ () => {handleMouseOver(index)} }
                                    onMouseOut={handleMouseOut} >
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
                        })
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}