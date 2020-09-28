import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const verification = StyleSheet.create({
    proText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        marginBottom: 20,
        color: '#707070',
        alignSelf: 'flex-start'
    }
})

export default function ChallengeVerification({navigation}) {
    const [imageOne, setImageOne] = useState(undefined);
    const [imageTwo, setImageTwo] = useState(undefined);

    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };

    const showCamera1 = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
            }
        });
    };

    const showCamera2 = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                setImageTwo(response.uri);
            }
        });
    };

    const showCameraRoll = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageTwo(response.uri);
            }
        });
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0 }} />
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={35} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 24
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Verification</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ marginBottom: 70 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginBottom: 32,
                        marginTop: 16
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{ width: 160, height: 160, borderRadius: 14, borderWidth: 0.7, borderColor: imageOne === undefined ? '#000000' : '#ffffff', marginBottom: 8, justifyContent: 'center', alignItems: 'center' }} onPress={showCamera1}>
                                <ImageBackground source={require('./icon/plus.png')} style={{ width: 150, height: 150, borderRadius: 14 }}>
                                    {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 150, height: 150, borderRadius: 14, borderWidth: 1 }} />}
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', color: '#79808C' }}>입에 문 사진</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{width: 160, height: 160, borderRadius: 14, borderWidth: 0.7, borderColor: imageTwo===undefined ? '#000000' : '#ffffff', marginBottom: 8, justifyContent: 'center', alignItems: 'center'}} onPress={showCamera2}>
                                <ImageBackground source={require('./icon/plus.png')} style={{ width: 150, height: 150, borderRadius: 14 }}>
                                    {imageTwo&&<Image resizeMode="stretch" source={{ uri: imageTwo }} style={{ width: 150, height: 150, borderRadius: 14, borderWidth: 1, marginBottom: 8 }} />}
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={{fontSize: 16, fontFamily: 'NunitoSans-Bold', color: '#79808C'}}>입에 문 사진</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'center', marginLeft: 32, marginRight: 32}}>
                        <Text style={{fontSize:21, fontFamily: 'NunitoSans-Regular', color: '#707070', alignSelf: 'center', marginBottom: 20}}>인증방법</Text>
                        <Text style={verification.proText}>1. 입에 타액검사 키트를 문 사진 1장 첨부</Text>
                        <Text style={verification.proText}>2. 음성반응이 나온 타액검사 키트 사진 1장 첨부</Text>
                        <Text style={verification.proText}>3. 인증샷 간격은 최대 5분입니다.</Text>
                        <View>
                            <Text style={[verification.proText, {marginBottom: 0}]}>4. 인증 성공여부는 2-3일내로 진행도에서 확인</Text>
                            <Text style={verification.proText}>    가능합니다.</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <View style={{ 
                        width: "100%", 
                        height: 60, 
                        backgroundColor: (imageOne===undefined)||(imageTwo===undefined) ? '#c6c6c6' : '#5cc27b',
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>인증하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}