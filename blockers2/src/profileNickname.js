import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    SafeAreaView,
    ScrollView
} from 'react-native'

export default function ProfileNickname ({navigation}) {
    const [nickname, setNickname] = useState('');
    const [same, setSame] = useState(true);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView>
                    <TextInput
                        value={nickname}
                        onChangeText={text => setNickname(text)}
                        placeholder="blockers1"
                        placeholderTextColor="#B8B8B8"
                    />
                    <Text>중복된 닉네임입니다</Text>
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
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>변경하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>변경하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}