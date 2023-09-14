import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';

import {useNavigate} from 'react-router-dom';

export default function PatientMedicalRecordUpdate() {
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

    const [name, setName] = useState(data.name);
    const [hospital, setHospital] = useState(data.hospital);
    const [doctor, setDoctor] = useState(data.doctor);
    const [dataOfVisit, setDataOfVisit] = useState(data.dataOfVisit);
    const [chiefComplaint, setChiefComplaint] = useState(data.chiefComplaint);
    const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState(data.historyOfPresentIllness);
    const [pastMedicalHistory, setPastMedicalHistory] = useState(data.pastMedicalHistory);
    const [medications, setMedications] = useState(data.medications);
    const [allergies, setAllergies] = useState(data.allergies);
    const [physicalExamination, setPhysicalExamination] = useState(data.physicalExamination);
    const [laboratoryResults, setLaboratoryResults] = useState(data.laboratoryResults);
    const [radiologicalFindings, setRadiologicalFindings] = useState(data.radiologicalFindings);
    const [diagnosis, setDiagnosis] = useState(data.diagnosis);
    const [treatment, setTreatment] = useState(data.treatment);
    const [medicationPrescribed, setMedicationPrescribed] = useState(data.medicationPrescribed);
    const [followUp, setFollowUp] = useState(data.followUp);
    const [comments, setComments] = useState(data.comments);
    const navigate = useNavigate();

    useEffect(() => {
        if(new URL(document.location.toString()).searchParams.get("patient"))
            setName(new URL(document.location.toString()).searchParams.get("patient"));
    }, []);

    const handleClick = () => {
        const data = {
            name: name,
            hospital: hospital,
            doctor: doctor,
            dataOfVisit: dataOfVisit,
            chiefComplaint: chiefComplaint,
            historyOfPresentIllness: historyOfPresentIllness,
            pastMedicalHistory: pastMedicalHistory,
            medications: medications,
            allergies: allergies,
            physicalExamination: physicalExamination,
            laboratoryResults: laboratoryResults,
            radiologicalFindings: radiologicalFindings,
            diagnosis: diagnosis,
            treatment: treatment,
            medicationPrescribed: medicationPrescribed,
            followUp: followUp,
            comments: comments,
        }

        //axios

        console.log("INPUT_DATA : ", data);
        const patient = new URL(document.location.toString()).searchParams.get("patient");

        navigate(`/patient-medical-records?patient=${patient}`)
    }


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>

                <p style={{fontSize:'30px'}}>진료기록 수정</p>
                <div className='input-container'>
                    <p className='input-title' style={{marginBottom:'3vh'}}>기본 정보</p>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>환자명</p>
                        </div>
                        <input className='input-1' 
                                value={name} 
                                onChange={((e) => setName(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료 병원</p>
                        </div>
                        <input className='input-1' 
                                onChange={((e) => setHospital(e.target.value))}
                                value={hospital}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>담당 의사명</p>
                        </div>
                        <input className='input-1' 
                                onChange={((e) => setDoctor(e.target.value))}
                                value={doctor}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료일자</p>
                        </div>
                        <input className='input-1' 
                                onChange={((e) => setDataOfVisit(e.target.value))}
                                value={dataOfVisit}  />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>진료 정보</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>주요 증상</p>
                        </div>
                        <textarea className='input-2' 
                                    rows='3' 
                                    onChange={((e) => setChiefComplaint(e.target.value))}
                                    value={chiefComplaint}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>진행 이력</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setHistoryOfPresentIllness(e.target.value))}
                                value={historyOfPresentIllness}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>과거 진료 이력</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setPastMedicalHistory(e.target.value))}
                                value={pastMedicalHistory}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>복용 약물</p>
                        </div>
                        <textarea className='input-2' 
                                rows='1' 
                                onChange={((e) => setMedications(e.target.value))}
                                value={medications}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>알레르기 정보</p>
                        </div>
                        <textarea className='input-2' 
                                rows='1' 
                                onChange={((e) => setAllergies(e.target.value))}
                                value={allergies}  />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>검사 결과</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>신체 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setPhysicalExamination(e.target.value))}
                                value={physicalExamination}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>실험실 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setLaboratoryResults(e.target.value))}
                                value={laboratoryResults}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>영상 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setRadiologicalFindings(e.target.value))}
                                value={radiologicalFindings}  />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>처방 내용</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>진단 결과</p>
                        </div>
                        <textarea className='input-2' 
                                rows="4" 
                                onChange={((e) => setDiagnosis(e.target.value))}
                                value={diagnosis}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>치료 방법 및 계획</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setTreatment(e.target.value))}
                                value={treatment}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>처방된 약물</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setMedicationPrescribed(e.target.value))}
                                value={medicationPrescribed}  />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>추가 정보</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>후속 치료 정보</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setFollowUp(e.target.value))}
                                value={followUp}  />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>코멘트</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setComments(e.target.value))}
                                value={comments}  />
                    </div>

                    <hr />

                    <div className='row-center'>
                        <button className='submit-button' 
                                onClick={handleClick} >제출</button>
                    </div>

                </div>

                
            </div>
            <Footer />
        </div>
    )
}