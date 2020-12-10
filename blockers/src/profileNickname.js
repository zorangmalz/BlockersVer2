import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
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
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get("screen").height;

export default function ProfileNickname({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [currentNick, setCurrentNick] = useState("");
    const [same, setSame] = useState(false)
    const [isLoading,setIsLoading]=useState(false)

    async function NicknameUpdate() {
        setIsLoading(true)
        console.log(nickname)
        var check=false
        await firestore().collection("UserInfo").get().then(documentSnapshot => {
            documentSnapshot.forEach(doc => {
                console.log(doc.data().nickname)
                if (nickname === doc.data().nickname) {
                    console.log("smae!!!!!!!")
                    setSame(true)
                    check=true
                } 
            })
        })
        const user = firebase.auth().currentUser
        if (check) {
            Alert.alert(
                "중복된 닉네임입니다.",
                "",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("중복")
                    }
                ]
            )
        } else if (nickname.length > 0 && !check) {
            console.log("변경")
            await firestore().collection("UserInfo").doc(user.uid)
                .update({
                    nickname: nickname
                });
            Alert.alert(
                "변경완료",
                "",
                [
                    {
                        text: "확인",
                        onPress: navigation.goBack()
                    }
                ]
            )
        }
        setIsLoading(false)
    }

    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {isLoading ? 
                 <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                : 
                <>
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>닉네임 변경</Text>
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View>
                    <TextInput onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                    {same ? <Text style={login.repeat}>중복된 닉네임입니다.</Text> : <Text></Text>}
                </View>
            </ScrollView>
            </>
                }
              
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
                {nickname.length > 0 ?
                    <TouchableOpacity
                        onPress={NicknameUpdate}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>변경하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}