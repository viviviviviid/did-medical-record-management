import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    Text, 
    useColorScheme, 
    View, 
    TouchableOpacity } from 'react-native';
import { styles } from './bottomTabsStyle';

export default function BottomTabs() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.bottomTabs}>

        </SafeAreaView>
    );
}