import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import kakaoLogin from './assets/images/kakao_login.png';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { login } from 'react-native-kakao-logins';
import { useNavigation } from '@react-navigation/native';



function Main(): JSX.Element {

    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [idToken, setIdToken] = useState("");

    useEffect(()=> {
        console.log("===== token saved =====\n", "access token : ", accessToken, "\nrefresh token : ", refreshToken, "\nid token : ", idToken);
    }, [accessToken, refreshToken, idToken]);

    const Login = () => {

        KakaoLogin.login().then((result) => {
            const res = JSON.parse(JSON.stringify(result));     // 특정 값 추출하기 위해 json을 객체 형태로 변환
            console.log("===== Login Success ===== \n", JSON.stringify(result));
            navigation.navigate("Lobby");
            setAccessToken(res.accessToken);
            setRefreshToken(res.refreshToken);
            setIdToken(res.idToken);
        })
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}> 
      <View style={{flex:10, justifyContent:'center'}}>
        <Text style={{fontSize:100, textAlign:'center'}}>DID</Text>
      </View>
      <TouchableOpacity onPress={Login} style={{flex: 2}}>
        <View style={{backgroundColor:'#fff', flexDirection:'row', justifyContent:'center'}}>
                <Image source={kakaoLogin} style={{width:'60%', resizeMode:'contain'}} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default Main;
