import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Lobby from './lobby/lobby';
import MedicalRecords from './medical-records/medicalRecords';
import QrScan from './qr-scan.tsx/QrScan';


const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Lobby"
        screenOptions={{
          tabBarActiveTintColor: '#444',
          tabBarShowLabel: true,
        }}>
            <Tab.Screen
                name="Lobby"
                component={Lobby}
                options={{
                  title: 'QR코드',
                  headerShown: false,
                  tabBarIcon: () => (
                    <Ionicons 
                      name="qr-code-outline" 
                      size={24} 
                      color="black" />
              ),
                }}
            />
            <Tab.Screen
                name="QrScan"
                component={QrScan}
                options={{
                  title: 'QR 스캔',
                  headerShown: false,
                  tabBarIcon: () => (
                    <Ionicons 
                      name="camera-outline" 
                      size={24} 
                      color="black" />
                  ),
                  }}
            />
            <Tab.Screen
                name="MedicalRecords"
                component={MedicalRecords}
                options={{
                  title: '나의 진료기록',
                  headerShown: false,
                  tabBarIcon: () => (
                    <Ionicons 
                      name="list-outline" 
                      size={24} 
                      color="black" />
                  ),
                  }}
            />
    </Tab.Navigator>
    )
}