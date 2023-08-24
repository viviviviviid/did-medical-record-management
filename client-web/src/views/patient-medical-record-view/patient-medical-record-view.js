import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import './patient-medical-record-view.css';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function PatientMedicalRecordView() {
    const navigate = useNavigate();
    const name = new URL(document.location.toString()).searchParams.get("patient"); // 이후에 진료기록 num으로 변경

    const data = {      // axios로 받아올 것
        name: "홍승재",
        hospital: "세브란스",
        doctor: "서민석",
        dataOfVisit: "2022/07/10",
        chiefComplaint: "배아픔",
        historyOfPresentIllness: "없음",
        pastMedicalHistory: "없음",
        medications: "없음",
        allergies: "없음",
        physicalExamination: "배가 참",
        laboratoryResults: "이상없음",
        radiologicalFindings: "이상없음",
        diagnosis: "배를 따뜻하게 할 것",
        treatment: "따뜻한 약 처방",
        medicationPrescribed: "따땃한 우유",
        followUp: "계획없음",
        comments: "",
    }


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>
                <div className='toolbar'>   
                    <Button variant="contained" 
                            sx={{backgroundColor:'lightgray', color:'black'}}
                            onClick={() => {navigate(`/patient-medical-record-update?patient=${name}`)}}>수정</Button>
                    <Button variant="contained" sx={{marginLeft:'1vw', backgroundColor:'lightgray', color:'black'}}>삭제</Button>
                </div>

                <p style={{fontSize:'30px'}}>진료 기록</p>
                    <div className='input-container'>
                        <p className='input-title' style={{marginBottom:'3vh'}}>기본 정보</p>

                        <div className='input-field row'>
                            <div className='desc-container-1'>
                                <p className='desc'>환자명</p>
                            </div>
                            <p>{data.name}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-1'>
                                <p className='desc'>진료 병원</p>
                            </div>
                            <p>{data.hospital}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-1'>
                                <p className='desc'>담당 의사명</p>
                            </div>
                            <p>{data.doctor}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-1'>
                                <p className='desc'>진료일자</p>
                            </div>
                            <p>{data.dataOfVisit}</p>
                        </div>

                        <hr />

                        <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>진료 정보</p>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>주요 증상</p>
                            </div>
                            <p>{data.chiefCompaint}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>진행 이력</p>
                            </div>
                            <p>{data.historyOfPresentIllness}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>과거 진료 이력</p>
                            </div>
                            <p>{data.pastMedicalHistory}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>복용 약물</p>
                            </div>
                            <p>{data.medications}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>알레르기 정보</p>
                            </div>
                            <p>{data.allergies}</p>
                        </div>

                        <hr />

                        <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>검사 결과</p>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>신체 검사 결과</p>
                            </div>
                            <p>{data.physicalExamination}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>실험실 검사 결과</p>
                            </div>
                            <p>{data.laboratoryResults}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>영상 검사 결과</p>
                            </div>
                            <p>{data.radiologicalFindings}</p>
                        </div>

                        <hr />

                        <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>처방 내용</p>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>진단 결과</p>
                            </div>
                            <p>{data.diagnosis}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>치료 방법 및 계획</p>
                            </div>
                            <p>{data.treatment}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>처방된 약물</p>
                            </div>
                            <p>{data.medicationPrescribed}</p>
                        </div>

                        <hr />

                        <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>추가 정보</p>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>후속 치료 정보</p>
                            </div>
                            <p>{data.followUp}</p>
                        </div>

                        <div className='input-field row'>
                            <div className='desc-container-2'>
                                <p className='desc'>코멘트</p>
                            </div>
                            <p>{data.comments}</p>
                        </div>

                        
                </div>
                
            </div>
            <Footer />
        </div>
    )
}