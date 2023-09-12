import React, { useState, useEffect} from 'react';
import axios from "axios"
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './doctor-auth.css';

export default function DoctorAuth() {
    // isDoctor true이면서, Doctor 테이블에 없는 사람들 리스트 불러오기 - axios
    // doctorList에 형식맞춰 넣기
    // 체크박스 눌리면 axios로 눌린 정보 보내기
    // Doctor 테이블에 넣기
    // jwt 업데이트하고 해당 의사의 핸드폰으로 강제 업데이트 해준다는 컨셉 // 근데 이렇게 딥하게 할필요는 없음 // 테스트할때 편하라고 
    const [waitingList, setWaitingList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5001/user/get-doctor-waiting-list');
                setWaitingList(response.data);
                console.log(waitingList)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

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
                        { waitingList.map((item, index) => {
                            return (
                                <div className={`records-list pointer`} 
                                    key={index} >
                                    <div className='records-list-date'>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='records-list-hpt'>
                                        <p>{item.birthday}</p>
                                    </div>
                                    <input 
                                        type="checkbox"
                                        className='auth-checkbox' 
                                        onClick={() => {
                                            console.log(item)   
                                            axios.post('http://localhost:5001/doctor/new-doctor', item)
                                            .then(res => {
                                                console.log(res.data) // 의사의 새로운 jwt 
                                            }).catch(console.log)
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