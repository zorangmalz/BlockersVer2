import React, { useState, useEffect, useCallback } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    RefreshControl,
    FlatList
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Refresh 하는 시간 설정
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const history = StyleSheet.create({
    text : {
        fontSize: 16,
        fontFamily: "NunitoSans-Regular",
        color: "#303030"
    }
})

export default function ProfileMain({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userBirth, setuserBirth] = useState("");
    const [userNick, setUserNick] = useState();
    const [haveProfile, setHaveProfile] = useState();
    const [sex, setSex] = useState("");

    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage, setIsImage] = useState(false);

    //리프레시 컨트롤
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    useEffect(() => {
        async function hello() {
            auth().onAuthStateChanged(userAuth => {
                setUser(userAuth)
            })
            if (user) {
                firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot => {
                    console.log(documentSnapshot.data().nickname, "hihi")
                    setUserNick(documentSnapshot.data().nickname)
                    setuserBirth(documentSnapshot.data().birth)
                    setHaveProfile(documentSnapshot.data().gotProfile)
                    setSex(documentSnapshot.data().sex)
                })
                console.log(user)
                console.log(haveProfile, "profile")
                hi()
            }
        } hello()
    }, [userNick, user, imageOne, refreshing]);

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
        quality: 0.3
    };

    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
                console.log(response.uri, "thisisresponsoe")
                setPicone(false);

                uploadImage(response.uri)
            }
        });
    };
    async function uploadImage(a) {
        const uri = a;
        const filename = "프로필사진" + userNick
        const reference = storage().ref("User/" + userNick + "/" + filename);
        console.log(uri, imageOne, filename, reference)
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri);
    }
    async function hi() {
        console.log("HI", "gs://blockers-8a128.appspot.com/" + userNick + "/프로필사진" + userNick)
        const url = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/" + "User/" + userNick + "/프로필사진" + userNick)
            .getDownloadURL();
        setIsImage(true)
        setImageSource(url)
        console.log("get")
    }

    //상태 확인
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    //챌린지 기록
    const PreviousData = [
        {
            challengeNumber: 1001,
            success: false,
            ChallengeStep: '김현명의 챌린지 (1개월)',
            participationDate: '2020/06/01',
            rate: '60%'
        },
        {
            challengeNumber: 1002,
            success: false,
            ChallengeStep: '김현명의 챌린지 (1개월)',
            participationDate: '2020/06/01',
            rate: '60%'
        },
        {
            challengeNumber: 1003,
            success: true,
            ChallengeStep: '김현명의 챌린지 (1개월)',
            participationDate: '2020/06/01',
            rate: '100%'
        },
    ];

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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>개인정보</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View style={{ alignSelf: "center", marginTop: 16 }}>
                        <TouchableOpacity onPress={showCameraRoll1}>
                            {isImage === true ?
                                <Image resizeMode="cover" source={{ uri: imageSource }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                :
                                <Ionicons name="person-circle" size={100} color="#dbdbdb" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingBottom: 4,
                        borderBottomColor: "#5cc27b",
                        borderBottomWidth: 1.5,
                        marginHorizontal: "10%",
                        marginTop: 32
                    }}><Text style={{
                        fontFamily: "NunitoSans-Bold",
                        color: "#303030",
                        fontSize: 18,
                    }}>{user ? user.displayName : "미설정"}</Text></View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginTop: 32,
                        marginLeft: "10%"
                    }}>
                        <View style={{
                            paddingBottom: 4,
                            borderBottomColor: "#5cc27b",
                            borderBottomWidth: 1.5,
                            width: 74,
                            marginRight: 40,  
                        }}><Text style={{
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            fontSize: 18,
                        }}>{sex.length > 0 ? sex : "미설정"}</Text></View>
                        <View style={{
                            paddingBottom: 4,
                            borderBottomColor: "#5cc27b",
                            borderBottomWidth: 1.5,
                            width: 130,
                        }}><Text style={{
                            fontFamily: "NunitoSans-Bold",
                            color: "#303030",
                            fontSize: 18,
                        }}>{userBirth.length > 0 ? userBirth : "미설정"}</Text></View>
                    </View>
                    <FlatList
                        data={PreviousData}
                        keyExtractor={item => item.challengeNumber}
                        renderItem={({ item }) => (
                            <View style={{
                                width: "90%",
                                borderWidth: 2,
                                borderColor: "#5cc27b",
                                alignSelf: "center",
                                borderRadius: 10,
                                marginTop: 16,
                                paddingTop: 16,
                                paddingLeft: 16,
                                paddingRight: 20,
                                paddingBottom: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily: "NunitoSans-Bold",
                                        fontSize: 16,
                                        color: "#303030",
                                        marginBottom: 16
                                    }} >{item.ChallengeStep}</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 8, height: 8, backgroundColor: '#303030', borderRadius: 4, marginRight: 8 }} />
                                            <Text style={history.text}>참가 : {item.participationDate}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            <View style={{ width: 8, height: 8, backgroundColor: '#303030', borderRadius: 4, marginRight: 8 }} />
                                            <Text style={history.text}>{item.rate}</Text>
                                        </View>
                                    </View>
                                </View>
                                {item.success === true ?
                                    <View style={{ width: 80, height: 30, backgroundColor: '#5cc27b', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>성공</Text>
                                    </View>
                                    :
                                    <View style={{ width: 80, height: 30, backgroundColor: '#ff0000', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#ffffff' }}>실패</Text>
                                    </View>
                                }
                            </View>
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}