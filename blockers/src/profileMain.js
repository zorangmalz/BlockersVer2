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
    FlatList,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

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
    const [user, setUser] = useState();
    const [userBirth, setuserBirth] = useState("");
    const [userNick, setUserNick] = useState();
    const [haveProfile, setHaveProfile] = useState();
    const [sex, setSex] = useState("");
    const [name,setUserName]=useState();
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage, setIsImage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    //리프레시 컨트롤
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //이미지 업로드 시 firebase와 소통
    async function uploadImage(a) {
        const uri = a;
        const reference = storage().ref("User/" + user.uid + "/프로필사진");
        console.log(uri, imageOne, reference)
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri).then(async () => {
            const uid = firebase.auth().currentUser.uid
            const url = await storage().refFromURL("gs://blockers-8a128.appspot.com/User/" + uid + "/프로필사진").getDownloadURL()
            console.log(url)
            firestore()
                .collection('UserInfo')
                .doc(uid)
                .update({
                    profilePicture: url,
                    gotProfile: true
                })
        })
        setImageLoading(true)
        setTimeout(() => {
            setImageLoading(false)
        }, 1000)
    }

    //이미지 골라서 업로드
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
                setIsImage(true)
            }
        });
    };

    //react native image picker 요소
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

    //프로필 사진 가져오기
    async function getImage() {
        const ref = await firestore().collection("UserInfo").doc(user.uid)
        const url = await storage()
            .refFromURL("gs://blockers-8a128.appspot.com/User/" + user.uid + "/프로필사진")
            .getDownloadURL()
            .catch(() => {
                setIsImage(false)
                ref.update({
                    gotProfile: false
                })
            })
        setImageSource(url)
        setIsLoading(true);
    }

    //이게 좀 느림
    async function getUser() {
        const USER = firebase.auth().currentUser
        await firestore().collection("UserInfo").doc(USER.uid).get().then(documentSnapshot => {
            console.log(documentSnapshot.data().nickname, "hihi")
            setUserNick(documentSnapshot.data().nickname)
            setUserName(documentSnapshot.data().name)
            setuserBirth(documentSnapshot.data().birth)
            setHaveProfile(documentSnapshot.data().gotProfile)
            setSex(documentSnapshot.data().sex)
        })
    }

    useEffect(() => {
        //개인정보 가져오기
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })
        if (user) {
            getUser()
            console.log(user)
            console.log(haveProfile, "profile")
            if (isImage) {
                getImage()
            }
        }
    }, [imageLoading, userNick, user, imageOne, refreshing, name]);

    //챌린지 기록 가져오기
    const [items, setItems] = useState([])
    useEffect(() => {
        const UID = auth().currentUser.uid
        const list = []
        firestore().collection("UserInfo").doc(UID).collection("Challenge").onSnapshot(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                list.push({
                    ChallengeStep: doc.data().name + "님의 챌린지 (" + doc.data().long + "개월)",
                    participationDate: doc.data().challengePeriod[0] + "/" + doc.data().challengePeriod[1] + "/" + doc.data().challengePeriod[2],
                    rate: doc.data().progress + "%",
                    success: doc.data().success,
                    challengeNumber: doc.data().number
                })

            })
            setItems(list)
        })
    }, [refreshing])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {isLoading === false ?
                    <ActivityIndicator size="large" color="#5cc27b" style={{position: "absolute", top: HEIGHT/2-20, left: WIDTH/2-20}} />
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
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>개인정보</Text>
                                </Text>
                            </View>
                        </View>
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View style={{ alignSelf: "center", marginTop: 16 }}>
                                <TouchableOpacity onPress={showCameraRoll1}>
                                    {isImage === true ?
                                        imageLoading ?
                                            <ActivityIndicator size="large" color="#5cc27b" style={{ width: 100, height: 100, borderRadius: 50 }} />
                                            :
                                            <Image resizeMode="cover" source={{ uri: imageSource }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                        :
                                        imageLoading ?
                                            <ActivityIndicator size="large" color="#5cc27b" style={{ width: 100, height: 100, borderRadius: 50 }} />
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
                                marginLeft: "10%",
                                marginBottom: 16
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
                                data={items}
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
                    </>
                }
            </SafeAreaView>
        </>
    )
}