import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './list.css';
import InputField from '../../modules/inputField.js';
import SearchButton from './searchButton.js';
import NewRecordButton from './newRecordButton.js'

export default function PatientList() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const list = [
        {index:0, name:'홍승재', age:26, gender:'남' },
        {index:1, name:'서민석', age:27, gender:'남' },
        {index:2, name:'허재경', age:32, gender:'남' },
    ];

    const [viewList, setViewList] = useState(list);

    const handleMouseOver = (index => {
        setActiveIndex(index);
    });

    const handleMouseOut = (() => {
        setActiveIndex(null);
    })

    useEffect(() => {
        console.log("VIEWLIST: ", viewList);
    }, [viewList]);


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <div className='toolbar'>
                    <InputField type='text' setData={setKeyword} label='검색' width='10vw' />
                    <SearchButton keyword={keyword} list={list} setViewList={setViewList} />
                    <NewRecordButton />

                </div>
                <p style={{fontSize:'30px'}}>환자 명단</p>
                <div className='records-box'>
                    <div className='records-index'>
                        <p className='records-index-date'>이름</p>
                        <p className='records-index-hpt'>나이</p>
                        <p className='records-index-doctor'>성별</p>
                        {/* <p className='records-index-notes'>진료 내용</p> */}
                    </div>
                    { viewList.map((item, index) => {
                        return (
                            <div className={`records-list pointer ${activeIndex === index ? "records-mouseover" : ""}`} 
                                key={index}
                                onMouseOver={ () => {handleMouseOver(index)} }
                                onMouseOut={handleMouseOut} 
                                onClick={() => {
                                    navigate(`/patient-medical-records?patient=${item.name}`);
                                }} >
                                <div className='records-list-date'>
                                    <p>{item.name}</p>
                                </div>
                                <div className='records-list-hpt'>
                                    <p>{item.age}</p>
                                </div>
                                <div className='records-list-doctor'>
                                    <p>{item.gender}</p>
                                </div>
                                {/* <div className='records-list-notes'>
                                    <p>{item.notes}</p>
                                </div> */}
                            </div>
                        )
                    }) }

                </div>
            </div>
            <Footer />
        </div>
    )
}