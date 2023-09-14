import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import BottomTabs from '../../modules/bottomTabs.tsx/bottomTabs';


export default function Lobby(): JSX.Element {
    const [name, setName] = useState("");
    const [bir, setBir] = useState("");
    const navigation = useNavigation();

    const qr = () => {
        navigation.navigate("QrView");
    }

    useEffect(() => {
        AsyncStorage.getItem("name")
        .then(res => {
            if(res !== null)
                setName(res);
        })
        AsyncStorage.getItem("birthday")
        .then(res => {
            if(res !== null)
                setBir(res);
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
            </View>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    onPress={qr}>
                    <View style={styles.card}>
                        <View style={styles.upperCard}>
                            <Text style={styles.cardTitle}>DID QR 코드</Text>
                        </View>
                        
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardText1}>이름</Text>
                                <Text style={styles.cardText2}>{name}</Text>
                                <Text style={styles.cardText1}>출생일</Text>
                                <Text style={styles.cardText2}>{bir}</Text>
                            </View>
                        
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}