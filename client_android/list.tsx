import React from 'react';
import type {PropsWithChildren} from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

import kakaoLogin from './assets/images/kakao_login';


export default function List(): JSX.Element {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}> 
            <View style={{backgroundColor:'#fff', flex:2, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:60}}>DID</Text>
            </View>
            <View style={{backgroundColor:'#fff', flex:10}}>
                <Text style={{fontSize:100}} >List</Text>

            </View>
    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
  
  });