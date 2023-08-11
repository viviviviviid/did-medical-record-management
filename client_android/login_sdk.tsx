import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import kakaoLogin from './assets/images/kakao_login.png';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import Lobby from './lobby';

// kakao sdk 로그인 방식

function Login(): JSX.Element {

    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [idToken, setIdToken] = useState("");

    const REST_API_KEY = '5e5e83f35a6ed8891b1e4e5f3d407bbf';
    const REDIRECT_URI = '';

    const login = () => {
      KakaoLogin.login().then((result) => {
          console.log("Login Success", JSON.stringify(result));
      }).catch((error) => {
        console.log(error);
      });
    };
 
    useEffect(()=> {
        console.log("\n===== token saved =====\n", "access token : ", accessToken, "\nrefresh token : ", refreshToken, "\nid token : ", idToken);
    }, [accessToken, refreshToken, idToken]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}> 
      <View style={{flex: 1}}>
        <Image source={kakaoLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default Login;


// koe101