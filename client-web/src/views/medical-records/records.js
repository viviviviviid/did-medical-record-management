import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import axios from 'axios';

export default function Records() {
    const [activeIndex, setActiveIndex] = useState(null);

    async function getDb() {
        console.log(localStorage.getItem("jwt"));
        
        const records = await axios.post("http://localhost:5001/user/get-my-record", 
            { vcJwt: localStorage.getItem("jwt") }
        )
        console.log("records : ", records);
    }

    useEffect(() => {
        getDb();
    }, [])

    const list = [
        {index:0, date:'2023/08/10', hpt:'국군고양병원', doctor:'홍승재', notes:'척추 제거'}, 
        {index:1, date:'2022/08/12', hpt:'백병원', doctor:'홍승재', notes:'아픔'},
        {index:2, date:'2022/08/15', hpt:'국군수도병원', doctor:'서민석', notes:'아파서 옴'}
    ];

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
                    { list.map((item, index) => {
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
                    }) }

                </div>
            </div>
            <Footer />
        </div>
    )
}