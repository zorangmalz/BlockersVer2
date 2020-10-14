import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Ionicons from 'react-native-vector-icons/Ionicons';

const login = StyleSheet.create({
    textinput: {
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        fontSize: 21,
        alignSelf: 'center',
        width: "80%",
        marginBottom: 32
    },
    buttontextinput: {
        fontSize: 21,
        opacity: 0.8,
        color: '#000000',
        fontFamily: 'NunitoSans-Regular',
    },
    buttontext: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'NunitoSans-Regular'
    },
    buttonbox: {
        width: 92,
        height: 32,
        backgroundColor: '#5cc27b',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function LoginVerification({ navigation }) {
    const [name, setName] = useState('');
    const [carrier, setCarrier] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [verinumber, setVerinumber] = useState('');
    const [send, setSend] = useState(false);
    const [veri, setVeri] = useState(false);
    const [countdown, setCountdown] = useState(false);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
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
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>본인인증</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{
                        fontSize: 21,
                        opacity: 0.7,
                        color: '#000000',
                        fontFamily: 'NunitoSans-Regular',
                        alignSelf: 'center',
                        marginTop: 16,
                        marginBottom: 32
                    }}>본인명의 휴대폰 번호를 입력해주세요</Text>
                    <TextInput onChangeText={({ text }) => setName(text)} style={login.textinput} placeholder="이름" />
                    <TextInput onChangeText={({ text }) => setCarrier(text)} placeholder="통신사" style={[login.textinput, { width: "20%", alignSelf: 'flex-start', marginLeft: "10%" }]} />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 4,
                        flexDirection: 'row',
                        width: "80%",
                        borderBottomColor: '#5cc27b',
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        marginRight: "10%",
                        marginLeft: "10%"
                    }}>
                        <TextInput onChangeText={text => setPhonenumber(text)} keyboardType="number-pad" placeholder="전화번호" style={login.buttontextinput} />
                        {(phonenumber !== '') === true ?
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                {countdown === true ?
                                    <CountDown
                                        size={12}
                                        until={60*3}
                                        digitStyle={{backgroundColor: '#ffffff'}}
                                        separatorStyle={{color: 'black'}}
                                        timeToShow={['M', 'S']}
                                        timeLabels={{m: null, s: null}}
                                        showSeparator
                                    />
                                    :
                                    <View></View>
                                }
                                <TouchableOpacity style={[login.buttonbox, {marginLeft: 8}]} onPressIn={()=>setCountdown(!countdown)} onPress={() => setSend(!send)}>
                                    <Text style={login.buttontext}>전송</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{width: 92, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#999999'}}>
                                <Text style={login.buttontext}>전송</Text>
                            </View>
                        }
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 4,
                        flexDirection: 'row',
                        width: "80%",
                        borderBottomColor: '#5cc27b',
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        marginTop: 32,
                        marginLeft: "10%",
                        marginRight: "10%"
                    }}>
                        <TextInput keyboardType="number-pad" onChangeText={text => setVerinumber(text)} placeholder="인증번호" style={login.buttontextinput} />
                        {send === true ?
                            (verinumber !== '') === true ?
                                <TouchableOpacity style={login.buttonbox} onPress={() => setVeri(!veri)}>
                                    <Text style={login.buttontext}>인증</Text>
                                </TouchableOpacity>
                                :
                                <View style={{ width: 92, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#999999' }}>
                                    <Text style={login.buttontext}>인증</Text>
                                </View>
                            :
                            <View></View>
                        }
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        width: '80%',
                        marginTop: 8
                    }}>
                        <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Regular', opacity: 0.8 }}>인증번호를 받지 못하셨나요?</Text>
                        <TouchableOpacity style={{
                            width: "25%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontSize: 16, fontFamily: 'NunitoSans-Bold', opacity: 0.8, textDecorationLine: 'underline' }}>재전송</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {((name !== '') && (carrier !== '') && (phonenumber !== '') && (veri !== false)) === true ?
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('아이디 찾기')}
                        style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
                    >
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, width: "100%", height: 60, backgroundColor: '#999999', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>확인</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}
