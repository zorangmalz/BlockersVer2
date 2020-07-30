import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native'

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.4,
        alignSelf: 'center',
        width: "80%",
        textAlign: 'center',
    },
    textinput: {
        fontSize: 21, 
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.7,
        color: '#000000',
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    repeat: {
        marginLeft: "10%",
        marginTop: 8,
        alignSelf: 'flex-start',
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#ff0000'
    }
})

export default function ProfileNickname ({navigation}) {
    const [nickname, setNickname] = useState('');
    const [same, setSame] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const repeatchange = () => setRepeat(!repeat);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView>
                <View>
                        <TextInput onSubmitEditing={repeatchange} onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                        {repeat === true ?
                            <Text style={login.repeat}>중복된 닉네임입니다.</Text>
                            :
                            <Text></Text>
                        }
                    </View>
                </ScrollView>
                {nickname.length>0 ?
                    <TouchableOpacity 
                        onPress={() => Alert.alert(
                            '변경완료',
                            '',
                            [
                                {
                                    text: 'OK', onPress: () => navigation.goBack()
                                }
                            ]
                        )}
                        style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}