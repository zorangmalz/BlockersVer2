import React, { useState, useEffect } from 'react';
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
    ActivityIndicator
} from 'react-native';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';

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

    //Modal 띄울때 사용
    const [userlogin, setUserlogin] = useState(false);
    const loginview = () => {
        setTimeout(() => {
            setUserlogin(true)
        }, 200)
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

    const Success = [
        {
            id: 1,
            month: 1,
            action: true,
        },
        {
            id: 2,
            month: 3,
            action: false,
        },
        {
            id: 3,
            month: 6,
            action: false,
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
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={userlogin}
                            onRequestClose={() => setUserlogin(false)}
                        >
                            <View style={{ width: WIDTH, height: HEIGHT, position: "absolute", backgroundColor: "#303030", opacity: 0.4 }} />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    width: 280,
                                    height: 180,
                                    borderRadius: 20,
                                    backgroundColor: '#ffffff',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{
                                        fontFamily: 'NunitoSans-Bold',
                                        fontSize: 16,
                                        color: '#303030',
                                        opacity: 0.8,
                                        marginTop: 20
                                    }}>로그인이 필요한서비스입니다.</Text>
                                    <Text style={{
                                        fontFamily: 'NunitoSans-Regular',
                                        fontSize: 14,
                                        color: '#303030',
                                        opacity: 0.6,
                                        textAlign: 'center'
                                    }}>로그인하고 다양한 혜택을 만나보세요</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: 15
                                    }}>
                                        <TouchableOpacity onPress={() => setUserlogin(false)} style={{
                                            width: 140,
                                            height: 55,
                                            borderBottomLeftRadius: 20,
                                            backgroundColor: '#999999',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: '#ffffff',
                                                fontFamily: 'NunitoSans-Regular'
                                            }}>둘러보기</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('로그인')
                                            setUserlogin(false)
                                        }}
                                            style={{
                                                width: 140,
                                                height: 55,
                                                borderBottomRightRadius: 20,
                                                backgroundColor: '#5cc27b',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: '#ffffff',
                                                fontFamily: 'NunitoSans-Regular'
                                            }}>로그인</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
                            <View style={style.container}>
                                <FlatList
                                    data={[
                                        { key: '개인정보', name: '개인정보' },
                                        { key: '공지사항', name: '공지사항' },
                                        { key: '내가 쓴 글', name: '내가 쓴글' },
                                        { key: '정보', name: "정보" },
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
                                    <Ionicons name="logo-twitter" size={36} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <AntDesign name="medium-monogram" size={36} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>
                }
            </SafeAreaView>
        </>
    )
}