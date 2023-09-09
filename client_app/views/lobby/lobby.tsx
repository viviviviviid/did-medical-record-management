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


export default function Lobby(): JSX.Element {

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
            </View>
            <View style={styles.contentContainer}>

            </View>
        </SafeAreaView>
    )

}