import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';

export default function SettingExitComplete({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
                <ScrollView>
                    <Image 
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: "50%", marginBottom: 32}}
                        source={require('./icon/resetcheck.png')} 
                    />
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>탈퇴 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'normal',
                        color: '#000000',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>이용해주셔서 감사합니다.</Text>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.popToTop()}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}