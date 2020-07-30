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

export default function SettingResetComplete({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
                <ScrollView>
                    <Image 
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: "30%", marginBottom: 32}}
                        source={require('./icon/resetcheck.png')} 
                    />
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'NunitoSans-Bold',
                        color: '#000000',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>초기화 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#000000',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>어플리케이션을 종료하시면 다시 시작할 수 있습니다.</Text>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.popToTop()}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}