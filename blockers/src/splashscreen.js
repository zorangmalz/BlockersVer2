import React, { useState, useEffect } from 'react';

import {
    ActivityIndicator,
    View,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useScreens } from 'react-native-screens';
import auth, { firebase } from '@react-native-firebase/auth';

export default function SplashScreen({ navigation }) {
    const [user, setUser] = useState("")
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        const USER = firebase.auth().currentUser
        if (USER) {
            setTimeout(() => {
                setAnimating(false);
                navigation.navigate('Home', { UID: user, from: "Mode" });
            }, 1000);
        } else {
            setTimeout(() => {
                navigation.navigate('회원가입');
            }, 1000)
        }
    }, [])

   

    return (
        <>
            <SafeAreaView style={{ width: "100%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./icon/blockersReal.png')}
                        style={{ width: 144, height: 144 }}
                    />
                    <Text
                        style={{ fontSize: 31, fontFamily: 'NunitoSans-Bold', color: '#5CC27B', marginTop: 16 }}
                    >Blockers</Text>
                    <Text
                        style={{ fontSize: 24, fontFamily: 'NunitoSans-Bold', color: '#303030', marginTop: 16 }}
                    >We Block You</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}