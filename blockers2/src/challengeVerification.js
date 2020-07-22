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
        fontWeight: 'normal',
        marginBottom: 20,
        color: '#707070',
        alignSelf: 'flex-start'
    }
})

export default function ChallengeVerification() {
    const [imageOne, setImageOne] = useState(undefined);
    const [imageTwo, setImageTwo] = useState(undefined);

    const options = {
        title: '사진가져오기',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };

    const showImagePicker1 = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response =', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
                setImageOne(response.uri);
            }
        });
    };

    const showImagePicker2 = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response =', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
                setImageTwo(response.uri);
            }
        });
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
                            <TouchableOpacity onPress={showImagePicker1}>
                                <ImageBackground source={require('./icon/plus.png')} style={{ width: 164, height: 146, borderRadius: 14, borderWidth: 1, marginBottom: 8 }}>
                                    {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 164, height: 146, borderRadius: 14, borderWidth: 1, marginBottom: 8 }} />}
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#79808C' }}>입에 문 사진</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={showImagePicker2}>
                                <ImageBackground source={require('./icon/plus.png')} style={{ width: 164, height: 146, borderRadius: 14, borderWidth: 1, marginBottom: 8 }}>
                                    <Image resizeMode="stretch" source={{ uri: imageTwo }} style={{ width: 164, height: 146, borderRadius: 14, borderWidth: 1, marginBottom: 8 }} />
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#79808C'}}>입에 문 사진</Text>
                        </View>
                    </View>
                    <View style={{justifyContent:'center', marginLeft: 32, marginRight: 32}}>
                        <Text style={{fontSize:21, fontWeight: '600', color: '#707070', alignSelf: 'center', marginBottom: 20}}>인증방법</Text>
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
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>인증하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}