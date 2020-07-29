import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard'

export default function WalletCharge({navigation}) {
    const [value, onChangeText] = useState('')
    const [check, setCheck] = useState(false)
    const checkColor = check===true ? "#5CC27B" : "#FFFFFF";
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = () => {
        Clipboard.setString('우리은행 1002-550-568544')
    }

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(text)
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ marginBottom: 70, paddingTop: 35 }}>
                    <TextInput
                        placeholder="금액입력"
                        placeholderTextColor="#B8B8B8"
                        value={value}
                        onChangeText={text=>onChangeText(text)}
                        keyboardType="number-pad"
                        style={{ width: "85%", height: 50, borderBottomColor: '#5CC27B', borderBottomWidth: 2, alignSelf: 'center', fontSize: 21 }}
                    />
                    <Text style={{ fontSize: 12, fontWeight: 'normal', color: '#ff0000', marginLeft: "7.5%", marginTop: 4 }}>금액을 입력해주세요</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#5cc27b',
                        marginLeft: 32,
                        marginTop: 22
                    }}>입금 계좌 안내</Text>
                    <View style={{ marginLeft: 32, marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'normal', color: '#333333' }}>우리은행 1002-550-568544</Text>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Image style={{ marginLeft: 5 }} source={require('./icon/copy.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginLeft: 32, marginTop: 7, fontSize: 16, fontWeight: 'normal', color: '#333333' }}>(주) 조랑말즈</Text>
                    <View style={{ width: "90%", height: 170, backgroundColor: '#E6E6E6', alignSelf: 'center', paddingTop: 16, paddingBottom: 16, paddingRight: 32, paddingLeft: 32, marginBottom: 16, marginTop: 16 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Image source={require('./icon/warning.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333333', marginLeft: 8 }}>입금시 주의사항</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#333333', marginBottom: 2 }}>- 입력한 금액만큼만 입금해주세요.</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#333333', marginBottom: 2 }}>  입금액과 일차하지 않을시 처리되지 않습니다.</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#333333', marginBottom: 2 }}>- 보이스 피싱 등 금융사고 예방을 위하 첫 입금 후</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#333333', marginBottom: 2 }}>  72시간동안 출금이 제한됩니다.</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => setCheck(!check)}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: checkColor }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: '#333333', marginLeft: 8 }}>입금시 주의사항을 확인했습니다.</Text>
                    </View>
                </ScrollView>
                {(check===true)&&(value.length>0) ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>입금하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>입금하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}