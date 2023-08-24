import React, { useState, useEffect} from 'react';
import Header from '../../modules/header.js';
import Footer from '../../modules/footer.js';
import {useNavigate} from 'react-router-dom';

export default function NewMedicalRecord() {
    const [name, setName] = useState("");
    const [hospital, setHospital] = useState("");
    const [doctor, setDoctor] = useState("");
    const [dataOfVisit, setDataOfVisit] = useState("");
    const [chiefComplaint, setChiefComplaint] = useState("");
    const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("");
    const [pastMedicalHistory, setPastMedicalHistory] = useState("");
    const [medications, setMedications] = useState("");
    const [allergies, setAllergies] = useState("");
    const [physicalExamination, setPhysicalExamination] = useState("");
    const [laboratoryResults, setLaboratoryResults] = useState("");
    const [radiologicalFindings, setRadiologicalFindings] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [medicationPrescribed, setMedicationPrescribed] = useState("");
    const [followUp, setFollowUp] = useState("");
    const [comments, setComments] = useState("");
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

        navigate(`/patient-medical-records?patient=${name}`)
    }


    return(
        <div className='root'>
            <Header />
            <div className='body column-center'>

                <p style={{fontSize:'30px'}}>진료기록 작성</p>
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
                                onChange={((e) => setHospital(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>담당 의사명</p>
                        </div>
                        <input className='input-1' 
                                onChange={((e) => setDoctor(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-1'>
                            <p className='desc'>진료일자</p>
                        </div>
                        <input className='input-1' 
                                onChange={((e) => setDataOfVisit(e.target.value))} />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>진료 정보</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>주요 증상</p>
                        </div>
                        <textarea className='input-2' 
                                    rows='3' 
                                    onChange={((e) => setChiefComplaint(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>진행 이력</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setHistoryOfPresentIllness(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>과거 진료 이력</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setPastMedicalHistory(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>복용 약물</p>
                        </div>
                        <textarea className='input-2' 
                                rows='1' 
                                onChange={((e) => setMedications(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>알레르기 정보</p>
                        </div>
                        <textarea className='input-2' 
                                rows='1' 
                                onChange={((e) => setAllergies(e.target.value))} />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>검사 결과</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>신체 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setPhysicalExamination(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>실험실 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setLaboratoryResults(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>영상 검사 결과</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setRadiologicalFindings(e.target.value))} />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>처방 내용</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>진단 결과</p>
                        </div>
                        <textarea className='input-2' 
                                rows="4" 
                                onChange={((e) => setDiagnosis(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>치료 방법 및 계획</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setTreatment(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>처방된 약물</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setMedicationPrescribed(e.target.value))} />
                    </div>

                    <hr />

                    <p className='input-title' style={{marginBottom:'3vh', marginTop:'5vh'}}>추가 정보</p>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>후속 치료 정보</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setFollowUp(e.target.value))} />
                    </div>

                    <div className='input-field row'>
                        <div className='desc-container-2'>
                            <p className='desc'>코멘트</p>
                        </div>
                        <textarea className='input-2' 
                                onChange={((e) => setComments(e.target.value))} />
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