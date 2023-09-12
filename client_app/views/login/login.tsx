import React, { useState, useEffect } from 'react';
import { Image, 
        SafeAreaView, 
        ScrollView, 
        StatusBar, 
        StyleSheet, 
        Text, 
        useColorScheme, 
        View, 
        TouchableOpacity,
    } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import kakaoLogin from '../../assets/images/kakao_login.png';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { styles } from './loginStyle';
import axios from 'axios';

export default function Login(): JSX.Element {
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    // const tokenObject = {
    //     "access_token" : tokenRes.data.access_token, 
    //     "refresh_token" : tokenRes.data.refresh_token};

    const Login = async () => {
        const result = await KakaoLogin.login();
        const res = JSON.parse(JSON.stringify(result));
        console.log("===== Login Success ===== \n");
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
    };

    useEffect(() => {
        if(refreshToken)
        {
            AsyncStorage.setItem("email", "sjhong98@icloud.com");
            AsyncStorage.setItem("name", "홍승재");
            AsyncStorage.setItem("isDoctor", "true");
            AsyncStorage.setItem("birthday", "98/09/01");
            AsyncStorage.setItem("login", "true");
            AsyncStorage.setItem("jwt", "asdjfijefjsdlkfjsldfjldjfisdjf");
            navigation.navigate('MainScreen', { screen: 'Lobby' });
            // axios.post("http://172.30.1.75:5001/user/login",    // ip 주소
            //     { token : 
            //         { 
            //             "access_token" : accessToken,
            //             "refresh_token" : refreshToken,
            //         }}
            // ).then(res => {
            //     if(!res.data.dbData){   // 신규가입일때
            //         console.log("===== 신규 가입 =====\n", res.data.userInfo);
            //         AsyncStorage.setItem("email", res.data.userInfo.email);
            //         AsyncStorage.setItem("name", res.data.userInfo.profile.nickname);
            //         navigation.navigate("SignUp");
            //     } else {                // 기존회원일때
            //         console.log("===== 기존 회원 =====\n", res.data.dbData);
            //         AsyncStorage.setItem("email",res.data.dbData.email)
            //         if(res.data.dbData.isDoctor)
            //             AsyncStorage.setItem("isDoctor", "true");
            //         else    
            //             AsyncStorage.setItem("isDoctor", "false");
            //         AsyncStorage.setItem("login", "true");
            //         AsyncStorage.setItem("name", res.data.dbData.name);
            //         AsyncStorage.setItem("birthday", res.data.dbData.birthday);
            //         navigation.navigate('MainScreen', { screen: 'Lobby' });
            //     }
            // }).catch(err => {
            //     console.log(err);
            // })
        }
        
    }, [refreshToken]);

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerTitle}>DID</Text>
            </View>
            <TouchableOpacity 
                onPress={Login} 
                style={styles.loginBtnContainer}>
                <View style={styles.loginBtn}>
                        <Image 
                            source={kakaoLogin} 
                            style={styles.loginBtnImg} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
    
}