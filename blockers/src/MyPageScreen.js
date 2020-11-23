import React, { useState, useEffect, useCallback } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    Modal,
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';
import { useFocusEffect } from "@react-navigation/native";
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const style = StyleSheet.create({
    container: {
        marginBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    item: {
        paddingLeft: 10,
        fontSize: 16,
        marginTop: 32,
        marginBottom: 8,
        fontFamily: 'NunitoSans-Regular'
    },
    containerStatus: {
        marginTop: 20,
        backgroundColor: "#646464",
        height: 148,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    box: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: "#48d1cc",
        borderWidth: 3,
        alignItems: 'center',
    },
    fontText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#79808c'
    },
    fontSubTitle: {
        fontSize: 21,
        fontFamily: 'NunitoSans-Regular',
        marginLeft: 10,
        color: '#79808c'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'NunitoSans-Regular',
        width: "50%",
        height: 43
    }
})

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function MyPageScreen({ navigation }) {
    const [userlogined, setUserlogined] = useState(false);
    const [name, setName] = useState();
    const [user, setUser] = useState("");
    const [nickname, setNickname] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage, setIsImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    //로그인 띄울때 사용
    const loginview = () => {
        Alert.alert(
            "로그인이 필요한 서비스입니다.",
            "로그인하고 다양한 혜택을 만나보세요",
            [
                {
                    text: "취소",
                    onPress: () => console.log("둘러보기")
                },
                {
                    text: "확인",
                    onPress: () => navigation.navigate('로그인')
                }
            ]
        )
    }

    useEffect(() => {
        auth().onAuthStateChanged((userAuth) => {
            setUser(userAuth)
        })
    }, [])

    //프로필 사진 가져오기
    async function getImage() {
        const ref = firestore().collection("UserInfo").doc(user.uid)
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

    useEffect(() => {
        if (user) {
            const ref = firestore().collection("UserInfo").doc(user.uid)
            setUserlogined(true);
            ref.get()
                .then(data => {
                    setNickname(data.data().nickname)
                    setName(data.data().name)
                    setIsImage(data.data().gotProfile)
                })
            if (isImage) {
                getImage()
            }
        }
        else {
            setUserlogined(false);
            setIsLoading(true);
        }
    }, [refreshing, userlogined, user, isImage])

    useFocusEffect(
        useCallback(() => {
            //포커싱 되었을 떄
            auth().onAuthStateChanged(userAuth => {
                setUser(userAuth)
            })
            if (user) {
                const ref = firestore().collection("UserInfo").doc(user.uid)
                setUserlogined(true);
                ref.get()
                    .then(data => {
                        setNickname(data.data().nickname)
                        setName(data.data().name)
                        setIsImage(data.data().gotProfile)
                    })
                if (isImage) {
                    getImage()
                }
                getInfo()
            }
            else {
                setUserlogined(false);
                setIsLoading(true);
            }
            return () => {
                //포커싱 안 되었을 떄
            };
        }, [])
    );
    const [one, setOne] = useState(false)
    const [three, setThree] = useState(false)
    const [six, setSix] = useState(false)
    async function getInfo() {
        await firestore().collection("UserInfo").doc(user.uid).collection("Challenge").where("success", "==", 2).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.data().long === 1) {
                    setOne(true)
                } else if (doc.data().long === 3) {
                    setThree(true)
                } else if (doc.data().long === 6) {
                    setSix(true)
                }
            })

        })
    }
    const Success = [
        {
            id: 1,
            month: 1,
            action: one,
        },
        {
            id: 2,
            month: 3,
            action: three,
        },
        {
            id: 3,
            month: 6,
            action: six,
        },
    ]
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {isLoading === false ?
                    <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                    :
                    <>
                        <View accessibilityRole="header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
                            <View
                                style={{
                                    height: 44,
                                    flexDirection: 'row',
                                    paddingTop: 4,
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 24 }}>
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#5CC27B' }}>My Page</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => {
                                    userlogined === true ?
                                        navigation.navigate('설정')
                                        :
                                        loginview()
                                }}>
                                    <Ionicons name="settings-sharp" color="#999999" size={28} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={style.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            </View>
                            {userlogined === true ?
                                <>
                                    <View style={{ marginTop: 16, marginHorizontal: "8%", flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                                        <TouchableOpacity style={{ marginRight: 18 }} >
                                            {isImage ?
                                                <>
                                                    {imageSource && <Image style={{ width: 90, height: 90, borderRadius: 45 }} resizeMode="cover" source={{ uri: imageSource }} />}
                                                </>
                                                :
                                                <Ionicons name="person-circle" size={90} color="#dbdbdb" />
                                            }
                                        </TouchableOpacity>
                                        <View style={{
                                            height: 68,
                                            alignItems: "flex-start",
                                            justifyContent: "space-evenly"
                                        }}>
                                            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', color: "#303030" }}>{name}님</Text>
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontFamily: "NunitoSans-Bold",
                                                    color: "#303030",
                                                    marginRight: 8
                                                }}>{nickname}</Text>
                                                <TouchableOpacity onPress={() => navigation.navigate('닉네임 변경')}>
                                                    <Ionicons name="pencil-sharp" size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                <TouchableOpacity style={{
                                    width: "100%",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 100,
                                    marginTop: 16,
                                    marginBottom: 16,
                                    alignSelf: "center",
                                    backgroundColor: "#646464",
                                    borderRadius: 20
                                }} onPress={() =>
                                    loginview()
                                }>
                                    <Text style={{ fontSize: 21, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "#ffffff" }}>로그인이 필요한 서비스입니다.</Text>
                                </TouchableOpacity>
                            }
                            {userlogined === true ?
                                <ScrollView horizontal={true}>
                                    <FlatList
                                        data={Success}
                                        keyExtractor={(item) => item.id}
                                        horizontal={true}
                                        renderItem={({ item }) => (
                                            <View style={{
                                                width: 120,
                                                height: 124,
                                                borderRadius: 15,
                                                backgroundColor: "#646464",
                                                marginRight: 8
                                            }}>
                                                {item.action ?
                                                    <>
                                                        <Text style={{
                                                            fontFamily: "NunitoSans-Regular",
                                                            fontSize: 12,
                                                            color: "#ffffff",
                                                            alignSelf: "center",
                                                            marginTop: 16,
                                                            marginBottom: 16
                                                        }}>챌린지 성공카드</Text>
                                                        <Image style={{ width: 36, height: 36, alignSelf: "center" }} resizeMode="contain" source={require("./icon/climbing.png")} />
                                                        <Text style={{
                                                            fontFamily: "NunitoSans-Bold",
                                                            fontSize: 12,
                                                            color: "#ffffff",
                                                            alignSelf: "center",
                                                            marginTop: 8
                                                        }}>{item.month}개월</Text>
                                                    </>
                                                    :
                                                    <>
                                                        <Text style={{
                                                            fontFamily: "NunitoSans-Bold",
                                                            fontSize: 12,
                                                            color: "#ffffff",
                                                            marginTop: 28,
                                                            marginLeft: 22,
                                                            marginBottom: 16
                                                        }}>Locked</Text>
                                                        <Text style={{
                                                            fontFamily: "NunitoSans-Regular",
                                                            fontSize: 12,
                                                            color: "#ffffff",
                                                            width: 80,
                                                            marginLeft: 22
                                                        }}>{item.month}개월 챌린지를 성공해보세요</Text>
                                                    </>
                                                }
                                            </View>
                                        )}
                                    />
                                </ScrollView>
                                :
                                <>
                                </>
                            }
                            <View style={[style.container, { marginTop: 8 }]}>
                                <FlatList
                                    data={[
                                        { key: '개인정보', name: '개인정보' },
                                        { key: '공지사항', name: '공지사항' },
                                        { key: '이용약관', name: '이용약관' },
                                    ]}
                                    renderItem={({ item }) => (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    userlogined === true ?
                                                        navigation.navigate(item.name)
                                                        :
                                                        loginview()
                                                }}>
                                                <Text style={style.item}>{item.key}</Text>
                                            </TouchableOpacity>
                                            <View style={{ backgroundColor: "#DDDDDD", height: 1, width: "95%", alignSelf: "center" }} />
                                        </>
                                    )} />
                            </View>
                            <View style={{
                                marginTop: "15%",
                                width: "50%",
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                alignSelf: 'center'
                            }}>
                                <TouchableOpacity>
                                    <Ionicons name="logo-facebook" size={36} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionicons name="logo-youtube" size={36} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Ionicons name="logo-instagram" size={36} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </>
                }
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
                    }}
                />
            </SafeAreaView>
        </>
    )
}