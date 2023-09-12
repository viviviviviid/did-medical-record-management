import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
        ScrollView, 
        Text,  
        View, 
        TouchableOpacity } from 'react-native';
import { styles } from './medicalRecordsStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const medicalList= [{
    name: "홍승재",
    hospital: "홍승재",
    doctorName: "홍승재",
    dateOfVisit: "홍승재",
    historyOfPresentIllness: "tes홍승재t1",
    medications: "홍승재",
    allergies: "홍승재",
    physicalExamination: "홍승재",
    laboratoryResults: "홍승재",
    radiologicalFindings: "홍승재",
    diagnosis: "홍승재",
    treatment: "홍승재",
    medicationPrescribed: "홍승재",
    followUp: "홍승재",
    additionalComments: "홍승재",
},
{
    name: "test2",
    hospital: "test2",
    doctorName: "test2",
    dateOfVisit: "test2",
    historyOfPresentIllness: "test2",
    medications: "test2",
    allergies: "test2",
    physicalExamination: "test2",
    laboratoryResults: "test2",
    radiologicalFindings: "test2",
    diagnosis: "test2",
    treatment: "test2",
    medicationPrescribed: "test2",
    followUp: "test2",
    additionalComments: "test2",
},
{
    name: "test3",
    hospital: "test3",
    doctorName: "test3",
    dateOfVisit: "test3",
    historyOfPresentIllness: "test3",
    medications: "test3",
    allergies: "test3",
    physicalExamination: "test3",
    laboratoryResults: "test3",
    radiologicalFindings: "test3",
    diagnosis: "test3",
    treatment: "test3",
    medicationPrescribed: "test3",
    followUp: "test3",
    additionalComments: "test3",
},{
    name: "test1",
    hospital: "test1",
    doctorName: "test1",
    dateOfVisit: "test1",
    historyOfPresentIllness: "test1",
    medications: "test1",
    allergies: "test1",
    physicalExamination: "test1",
    laboratoryResults: "test1",
    radiologicalFindings: "test1",
    diagnosis: "test1",
    treatment: "test1",
    medicationPrescribed: "test1",
    followUp: "test1",
    additionalComments: "test1",
},
{
    name: "test2",
    hospital: "test2",
    doctorName: "test2",
    dateOfVisit: "test2",
    historyOfPresentIllness: "test2",
    medications: "test2",
    allergies: "test2",
    physicalExamination: "test2",
    laboratoryResults: "test2",
    radiologicalFindings: "test2",
    diagnosis: "test2",
    treatment: "test2",
    medicationPrescribed: "test2",
    followUp: "test2",
    additionalComments: "test2",
},
{
    name: "test3",
    hospital: "test3",
    doctorName: "test3",
    dateOfVisit: "test3",
    historyOfPresentIllness: "test3",
    medications: "test3",
    allergies: "test3",
    physicalExamination: "test3",
    laboratoryResults: "test3",
    radiologicalFindings: "test3",
    diagnosis: "test3",
    treatment: "test3",
    medicationPrescribed: "test3",
    followUp: "test3",
    additionalComments: "test3",
},
{
    name: "test1",
    hospital: "test1",
    doctorName: "test1",
    dateOfVisit: "test1",
    historyOfPresentIllness: "test1",
    medications: "test1",
    allergies: "test1",
    physicalExamination: "test1",
    laboratoryResults: "test1",
    radiologicalFindings: "test1",
    diagnosis: "test1",
    treatment: "test1",
    medicationPrescribed: "test1",
    followUp: "test1",
    additionalComments: "test1",
},
{
    name: "test2",
    hospital: "test2",
    doctorName: "test2",
    dateOfVisit: "test2",
    historyOfPresentIllness: "test2",
    medications: "test2",
    allergies: "test2",
    physicalExamination: "test2",
    laboratoryResults: "test2",
    radiologicalFindings: "test2",
    diagnosis: "test2",
    treatment: "test2",
    medicationPrescribed: "test2",
    followUp: "test2",
    additionalComments: "test2",
},
{
    name: "test3",
    hospital: "test3",
    doctorName: "test3",
    dateOfVisit: "test3",
    historyOfPresentIllness: "test3",
    medications: "test3",
    allergies: "test3",
    physicalExamination: "test3",
    laboratoryResults: "test3",
    radiologicalFindings: "test3",
    diagnosis: "test3",
    treatment: "test3",
    medicationPrescribed: "test3",
    followUp: "test3",
    additionalComments: "test3",
},
{
    name: "test1",
    hospital: "test1",
    doctorName: "test1",
    dateOfVisit: "test1",
    historyOfPresentIllness: "test1",
    medications: "test1",
    allergies: "test1",
    physicalExamination: "test1",
    laboratoryResults: "test1",
    radiologicalFindings: "test1",
    diagnosis: "test1",
    treatment: "test1",
    medicationPrescribed: "test1",
    followUp: "test1",
    additionalComments: "test1",
},
{
    name: "test2",
    hospital: "test2",
    doctorName: "test2",
    dateOfVisit: "test2",
    historyOfPresentIllness: "test2",
    medications: "test2",
    allergies: "test2",
    physicalExamination: "test2",
    laboratoryResults: "test2",
    radiologicalFindings: "test2",
    diagnosis: "test2",
    treatment: "test2",
    medicationPrescribed: "test2",
    followUp: "test2",
    additionalComments: "test2",
},
{
    name: "test3",
    hospital: "test3",
    doctorName: "test3",
    dateOfVisit: "test3",
    historyOfPresentIllness: "test3",
    medications: "test3",
    allergies: "test3",
    physicalExamination: "test3",
    laboratoryResults: "test3",
    radiologicalFindings: "test3",
    diagnosis: "test3",
    treatment: "test3",
    medicationPrescribed: "test3",
    followUp: "test3",
    additionalComments: "test3",
},
{
    name: "test1",
    hospital: "test1",
    doctorName: "test1",
    dateOfVisit: "test1",
    historyOfPresentIllness: "test1",
    medications: "test1",
    allergies: "test1",
    physicalExamination: "test1",
    laboratoryResults: "test1",
    radiologicalFindings: "test1",
    diagnosis: "test1",
    treatment: "test1",
    medicationPrescribed: "test1",
    followUp: "test1",
    additionalComments: "test1",
},
{
    name: "test2",
    hospital: "test2",
    doctorName: "test2",
    dateOfVisit: "test2",
    historyOfPresentIllness: "test2",
    medications: "test2",
    allergies: "test2",
    physicalExamination: "test2",
    laboratoryResults: "test2",
    radiologicalFindings: "test2",
    diagnosis: "test2",
    treatment: "test2",
    medicationPrescribed: "test2",
    followUp: "test2",
    additionalComments: "test2",
},
{
    name: "test3",
    hospital: "test3",
    doctorName: "test3",
    dateOfVisit: "test3",
    historyOfPresentIllness: "test3",
    medications: "test3",
    allergies: "test3",
    physicalExamination: "test3",
    laboratoryResults: "test3",
    radiologicalFindings: "test3",
    diagnosis: "test3",
    treatment: "test3",
    medicationPrescribed: "test3",
    followUp: "test3",
    additionalComments: "test3",
},
]



export default function MedicalRecords(): JSX.Element {
    const navigation = useNavigation();
    const [isView, setIsView] = useState(false);
    const [info, setInfo] = useState({});

    function press(item) {
        console.log("\n\n===== ITEM =====\n\n", item);
        
        setIsView(true);
        setInfo(item);
    }



    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>나의 진료기록</Text>
            </View>
            { isView ?
                <View style={styles.viewContainer}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => setIsView(false)}>
                            <Ionicons 
                                name="arrow-back" 
                                size={40} 
                                color="black" />
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.viewContentContainer}>
                            <View style={styles.viewIndexContainer}>
                                <Text style={styles.viewIndex}>이름</Text>
                                <Text style={styles.viewIndex}>병원</Text>
                                <Text style={styles.viewIndex}>담당의사</Text>
                                <Text style={styles.viewIndex}>진료일자</Text>
                                <Text style={styles.viewIndex}>진행 이력</Text>
                                <Text style={styles.viewIndex}>복용 약물</Text>
                                <Text style={styles.viewIndex}>알레르기 정보</Text>
                                <Text style={styles.viewIndex}>신체 검사 결과</Text>
                                <Text style={styles.viewIndex}>실험실 결과</Text>
                                <Text style={styles.viewIndex}>영상 검사 결과</Text>
                                <Text style={styles.viewIndex}>진단 결과</Text>
                                <Text style={styles.viewIndex}>치료 방법</Text>
                                <Text style={styles.viewIndex}>처방된 약물</Text>
                                <Text style={styles.viewIndex}>후속 조치</Text>
                                <Text style={styles.viewIndex}>코멘트</Text>
                            </View>
                            <View style={styles.viewInfoContainer}>
                                <Text style={styles.viewInfo}>{info.name}</Text>
                                <Text style={styles.viewInfo}>{info.hospital}</Text>
                                <Text style={styles.viewInfo}>{info.doctorName}</Text>
                                <Text style={styles.viewInfo}>{info.dateOfVisit}</Text>
                                <Text style={styles.viewInfo}>{info.historyOfPresentIllness}</Text>
                                <Text style={styles.viewInfo}>{info.medications}</Text>
                                <Text style={styles.viewInfo}>{info.allergies}</Text>
                                <Text style={styles.viewInfo}>{info.physicalExamination}</Text>
                                <Text style={styles.viewInfo}>{info.laboratoryResults}</Text>
                                <Text style={styles.viewInfo}>{info.radiologicalFindings}</Text>
                                <Text style={styles.viewInfo}>{info.diagnosis}</Text>
                                <Text style={styles.viewInfo}>{info.treatment}</Text>
                                <Text style={styles.viewInfo}>{info.medicationPrescribed}</Text>
                                <Text style={styles.viewInfo}>{info.followUp}</Text>
                                <Text style={styles.viewInfo}>{info.additionalComments}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :
                <View style={styles.contentContainer}>
                    <View style={styles.index}>
                        <Text style={styles.indexText}>이름</Text>
                        <Text style={styles.indexText}>병원</Text>
                        <Text style={styles.indexText}>진료의사</Text>
                    </View>
                    <ScrollView style={styles.listContainer}>
                        { medicalList.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => press(item)}
                                >
                                    <View style={styles.list} >
                                        <View style={{width: 100}}>
                                            <Text style={styles.listText}>{item.name}</Text>
                                        </View>
                                        <View style={{width: 120}}>
                                            <Text style={styles.listText}>{item.hospital}</Text>
                                        </View>
                                        <View style={{width: 100}}>
                                            <Text style={styles.listText}>{item.doctorName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )})}
                        
                    </ScrollView>
                </View>
                }
        </SafeAreaView>
    )

}