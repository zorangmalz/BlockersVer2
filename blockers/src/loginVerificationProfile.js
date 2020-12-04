import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    BackHandler,
    Alert,
    Platform
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
import { useFocusEffect } from "@react-navigation/native";


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
        fontSize: 18,
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

export default function LoginVerificationProfile({ navigation, route }) {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [repeat, setRepeat] = useState(false);
    const GenderData = [{
        value: '남성',
    }, {
        value: '여성',
    }];

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [nickState, setNickState] = useState(false)
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage, setIsImage] = useState(false);
    const [haveProfile, setHaveProfile] = useState(false);

    const [totalUser, setTotalUser] = useState()
    const ref = firestore().collection("UserInfo");

    async function updateInfo(code, bir, se, nick, pic) {
        console.log(code, bir, se, nick, pic)
        if (pic.length > 0) {
            // await ProfilePicture(nickname)
            await ref.doc(code).set({
                birth: bir,
                sex: se,
                nickname: "Blockers" + totalUser,
                gotProfile: true,
                profilePicture: pic,
                name: nick,
                drug: false,
                email: user.email
            })
        } else {
            await ref.doc(code).set({
                birth: bir,
                sex: se,
                nickname: "Blockers" + totalUser,
                gotProfile: false,
                name: nick,
                drug: false,
                email: user.email
            })
        }
        firestore().collection("TotalUser").doc("userNum").set(
            {
                numCount: totalUser + 1
            }
        )
    }

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
    }, []);

    useEffect(() => {
        if (user) {
            firestore().collection("TotalUser").doc("userNum").get().then(doc => {
                setTotalUser(doc.data().numCount)
            })
        }
    }, [user])

    async function move() {
        setIos(true)
        const uid = firebase.auth().currentUser.uid;
        if (isImage) {
            await uploadImage()
            var url2 = await storage()
                .refFromURL("gs://blockers-8a128.appspot.com/User/" + uid + "/" + "프로필사진")
                .getDownloadURL();

        } else {
            var url2 = ""
        }
        console.log(url2, "url2~~~")
        await updateInfo(user.uid, birthday, gender, nickname, url2)
        navigation.navigate("ModeSelect")
    }


    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.05
    };


    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
                console.log(response.uri, "uri!!!!!")
                setPicone(false);
                setIsImage(true)
            }
        });
    };
    async function uploadImage() {
        const uid = firebase.auth().currentUser.uid;
        const uri = imageOne;
        const reference = storage().ref("User/" + uid + "/프로필사진");
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        console.log(uploadUri, "uploadUri")
        await reference.putFile(uploadUri);
        setHaveProfile(true)
    }

    //다음 버튼 눌렀는지 유무
    const [ios, setIos] = useState(false);

    //ios 전용
    useEffect(() => {
        if (Platform.OS === "ios") {
            if (ios === false) {
                navigation.addListener('beforeRemove', (e) => {
                    e.preventDefault();
                    Alert.alert(
                        '회원가입을 중단하겠습니까?',
                        '',
                        [
                            {
                                text: '취소', onPress: () => console.log("cancel")
                            },
                            {
                                text: '확인',
                                onPress: () => { navigation.dispatch(e.data.action), iosdeletes() }
                            },
                        ]
                    );
                }), [navigation]
            }
        }
    }, [ios]);

    //ios전용 함수
    async function iosdeletes() {
        const user = firebase.auth().currentUser
        user.delete()
    }

    //android 전용
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (route.name === "프로필 설정") {
                    finishLogin()
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    async function finishLogin() {
        Alert.alert(
            '회원가입을 중단하겠습니까?',
            '',
            [
                {
                    text: '취소', onPress: () => console.log("cancel")
                },
                {
                    text: '확인', onPress: () => deletes()
                }
            ]
        )
    }

    async function deletes() {
        const user = firebase.auth().currentUser
        user.delete().then(() => {
            navigation.goBack()
        }).catch(() => {
            navigation.goBack()
        })
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={Platform.OS === "android" ? finishLogin : navigation.goBack()}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>프로필 설정</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={showCameraRoll1} style={{ alignSelf: 'center', marginTop: 16 }}>
                        {isImage === true ?
                            imageOne && <Image resizeMode="cover" source={{ uri: imageOne }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                            :
                            <Image source={require('./icon/userprofile.png')} style={{ width: 132, height: 132 }} resizeMode="contain" />
                        }

                    </TouchableOpacity>
                    <View>
                        <TextInput onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="이름" />
                        {repeat === true ?
                            <Text style={login.repeat}>중복된 닉네임입니다.</Text>
                            :
                            <Text style={{ marginBottom: 28 }}></Text>
                        }
                        <View style={{ marginLeft: "10%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: "flex-end" }}>
                            <Dropdown
                                baseColor="#5cc27b"
                                itemTextStyle={{ fontSize: 30, fontFamily: 'NunitoSans-Bold', color: "#303030" }}
                                dropdownOffset={{ top: 0, left: 0 }}
                                dropdownPosition={0}
                                pickerStyle={{ width: "25%" }}
                                containerStyle={{ width: "25%", height: 30 }}
                                label="성별"
                                data={GenderData}
                                onChangeText={({value}) => setGender(value)}
                            />
                            <TextInput keyboardType="number-pad" onChangeText={text => setBirthday(text)} style={[login.textinput, { width: "45%", marginLeft: "12%", alignSelf: "flex-start" }]} placeholder="생일(940524)" />
                        </View>
                    </View>
                    <View style={{ marginTop: "70%" }}>
                        <Text style={login.rule}>
                            계정 생성시 Blockers
                        <TouchableOpacity onPress={() => navigation.navigate("개인정보처리방침")}><Text style={{ textDecorationLine: 'underline' }}> 개인정보 처리약관</Text></TouchableOpacity>
                        과</Text>
                        <Text style={login.rule}>
                            <TouchableOpacity onPress={() => navigation.navigate("서비스 이용 약관")}><Text style={{ textDecorationLine: 'underline' }}>이용약관</Text></TouchableOpacity>
                        에 동의하게 됩니다.(마케팅 정보 수신동의 포함)</Text>
                    </View>
                </ScrollView>
                {nickname.length > 0 && birthday.length > 0 ?
                    <TouchableOpacity onPress={move} style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>시작하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>시작하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}