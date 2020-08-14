import React, { useState, useEffect } from 'react';

import {
    ActivityIndicator,
    View,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function SplashScreen({ navigation }) {
    const [animating, setAnimating] = useState(true);
    const [first, setFirst] = useState(0);
    const home = () => {
        setTimeout(() =>  {
            navigation.navigate('Home');
        },50) 
    }

    useEffect(() => {
        console.log(first);
        if (first === 0) {
            setTimeout(() => {
                setAnimating(false);
                setFirst(first+1);
                navigation.navigate('Home');
            }, 1000);
        } else {
            setTimeout(() =>  {
                navigation.navigate('Home');
            },50) 
        }
    }, []);

    return (
        <>
            <SafeAreaView style={{ width: "100%", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./icon/blockerslogo.png')}
                        style={{ width: 144, height: 144 }}
                    />
                    <Text
                        style={{ fontSize: 31, fontFamily: 'NunitoSans-Bold', color: '#5CC27B', marginTop: 16 }}
                    >Blockers</Text>
                    <Text
                        style={{ fontSize: 24, fontFamily: 'NunitoSans-Bold', color: '#000000', marginTop: 16 }}
                    >We Block You</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}