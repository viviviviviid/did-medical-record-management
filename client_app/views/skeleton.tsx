import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { Image, 
        SafeAreaView, 
        ScrollView, 
        StatusBar, 
        StyleSheet, 
        Text, 
        useColorScheme, 
        View, 
        TouchableOpacity } from 'react-native';
import { styles } from './lobbyStyle';


export default function Skeleton(): JSX.Element {
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();



    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
            </View>
            <View style={styles.contentContainer}>

            </View>
            <Tab.Navigator>
                <Tab.Screen name="Lobby" component={Lobby} />
                <Tab.Screen name="MedicalRecords" component={MedicalRecords} />
            </Tab.Navigator>
        </SafeAreaView>
    )

}