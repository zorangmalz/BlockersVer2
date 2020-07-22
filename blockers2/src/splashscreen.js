import React, {useState, useEffect} from 'react';

import {
    ActivityIndicator,
    View, 
    Image,
    SafeAreaView,
    Text
} from 'react-native';

export default function SplashScreen ({navigation}) {
    const [animating, setAnimating] =  useState(true);
    
    useEffect(()=>{
        setTimeout(()=>{
            setAnimating(false);
            navigation.navigate('HomeScreen')
        }, 3000);
    }, []);

    return (
        <>
            <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <Image
                        source={require('./icon/blockerslogo.png')}
                        style={{width: 144, height: 144}}
                    />
                    <Text
                        style={{fontSize: 31, fontWeight: 'bold', color: '#5CC27B', marginTop: 16}}
                    >Blockers</Text>
                    <Text
                        style={{fontSize: 24, fontWeight: 'bold', color: '#000000', marginTop: 16}}
                    >We Block You</Text>
                </View>
            </SafeAreaView>
        </>
    )
}