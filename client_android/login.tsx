import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import kakaoLogin from './assets/images/kakao_login.png';
import { login } from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import Lobby from './lobby';



function Login(): JSX.Element {

  // 웹뷰 방식  
  
  const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [idToken, setIdToken] = useState("");

    const REST_API_KEY = '5e5e83f35a6ed8891b1e4e5f3d407bbf';
    const REDIRECT_URI = 'http://localhost:8081/lobby';
 
    // useEffect(()=> {
    //     console.log("\n===== token saved =====\n", "access token : ", accessToken, "\nrefresh token : ", refreshToken, "\nid token : ", idToken);
    // }, [accessToken, refreshToken, idToken]);

    // const onNavigationStateChange = (navState) => {
    //     if (navState && navState.url) {
    //       const { url } = navState;
    //       console.log("url : ", url);
    //     }
    //   };
    
    //   useEffect(()=>{
    //     onNavigationStateChange();
    //   }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}> 
        <WebView style={{flex: 1}} source={{uri:`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}} 
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default Login;


// koe101