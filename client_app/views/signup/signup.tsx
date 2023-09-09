import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
        Text, 
        View, 
        Button,
        TextInput,
    } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './signupStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Progress from 'react-native-progress';

export default function SignUp(): JSX.Element {
    const [_name, setName] = useState("");
    const [_email, setEmail] = useState("");
    const [_birthday, setBirthday] = useState("");
    const [_phoneNumber, setPhoneNumber] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem("email")
        .then(res => {
            if(res !== null){
                setEmail(res);
            }
        })
    }, []);

    useEffect(() => {
        setUserInfo({
            name: _name,
            email: _email,
            birthday: _birthday,
            phoneNumber: _phoneNumber,
            isDoctor: isDoctor
        })
    }, [isDoctor]);

    const signUp = () => {
        if(!_name)
            setMsg("이름을 입력하세요");
        else if(!_birthday)
            setMsg("출생일을 입력하세요");
        else if(!_phoneNumber)
            setMsg("전화번호를 입력하세요");
        else {
            setMsg("");
            setIsLoading(true);

            axios.post('http://172.30.1.75:5001/user/signup', userInfo)
                .then(res => {
                    console.log("\n===== 회원가입 =====\n", res);
                    console.log("\n===== JWT 생성 완료 ===== \n", res.data.jwt);
                    AsyncStorage.setItem("jwt", res.data.jwt);
                    AsyncStorage.setItem("login", "true");
                    setIsLoading(false);
                    navigation.navigate("Lobby");
                }).catch(err => {
                    console.log(err);
            })
        }
        
    }


    return (
        isLoading ? 
        <SafeAreaView style={styles.loading}>
            <Text 
                style={styles.loadingText}>
                    JWT 생성 중
            </Text>
            <Progress.Bar indeterminate={true} width={300} />
        </SafeAreaView>
        :
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>신규 가입</Text>
                <TextInput 
                    style={styles.inputName}
                    placeholder="이름"
                    value={_name}
                    onChangeText={setName}
                />
                <Text 
                    style={styles.email}>
                        {_email}
                </Text>
                <TextInput 
                    style={styles.inputName}
                    placeholder="출생일"
                    value={_birthday}
                    onChangeText={setBirthday}
                />
                <Text 
                    style={styles.font}>
                        YY/MM/DD 형식으로 입력해주세요
                </Text>
                <TextInput 
                    style={styles.inputName}
                    placeholder="전화번호"
                    value={_phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Text 
                    style={styles.font}>
                        010-XXXX-XXXX 형식으로 입력해주세요
                </Text>
                <View style={styles.checkBoxContainer}>
                    <CheckBox 
                        style={styles.checkBox}
                        boxType='square'
                        onValueChange={setIsDoctor}
                    />
                    <Text style={styles.font}>의사이신가요?</Text>
                </View>
                <Text
                    style={styles.errMsg}> 
                    {msg}
                </Text>
                <View style={styles.btn}>
                    <Button 
                        title="회원가입"
                        onPress={signUp}
                    />
                </View>
                
                
            </View>
        </SafeAreaView>
    )
    
}