import React, { useState,useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Alert,
    Modal
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
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

export default function MyPageScreen({ navigation }) {
    const [userlogined, setUserlogined] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState("");
    //Modal 띄울때 사용
    const [userlogin, setUserlogin] = useState(false);
    const loginview = () => {
        setTimeout(()=>{
            setUserlogin(true)
        }, 200)
    }

    function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
            const sexs = "boy"
            setUserlogined(true)
        } else {
            setUserlogined(false)
        }

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        if (!user) {
            setUserlogined(false)

        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    if (initializing) return null;


    const num = 1;
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={userlogin}
                    onRequestClose={() => setUserlogin(false)}
                >
                    <View style={{ flex: 1, backgroundColor: '#303030', opacity: 0.4 }} />
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={userlogin}
                    onRequestClose={() => setUserlogin(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 280,
                            height: 180,
                            borderRadius: 20,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: '#cccccc'
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
                                    navigation.navigate('회원가입')
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
                <ScrollView style={style.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                    {userlogined === true ?
                        <View style={style.containerStatus}>
                            <View style={{ marginTop: 16, marginLeft: 16, marginRight: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                                    <Text style={{ fontSize: 12, fontFamily: "HelveticaNeue", fontFamily: 'NunitoSans-Bold', color: "white" }}>{user.displayName}님</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
                                        <Text style={{ textDecorationLine: 'underline', fontSize: 9, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "white" }}>Transaction</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 34, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 24, fontFamily: 'NunitoSans-Bold', color: "white" }}>100,000 Block</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('WalletWithDrawal')} style={{ width: 54, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 15, borderWidth: 1, borderColor: "white" }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Bold', color: "white" }}>출금</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('입금')} style={{ width: 54, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 15, borderWidth: 1, borderColor: "white", backgroundColor: "white", marginLeft: 16 }}>
                                            <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Bold', color: "#303030" }}>입금</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <TouchableOpacity style={[style.containerStatus, { alignItems: 'center', justifyContent: 'center' }]} onPress={() =>
                            loginview()
                        }>
                            <Text style={{ fontSize: 24, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "white" }}>로그인이 필요한 서비스입니다.</Text>
                        </TouchableOpacity>
                    }
                    <View style={style.container}>
                        <FlatList
                            data={[
                                { key: '개인정보', name: '개인정보' },
                                { key: '공지사항', name: '공지사항' },
                                { key: '내가 쓴 글', name: '내가 쓴글' },
                                { key: '이용약관', name: '이용약관' },
                            ]}
                            renderItem={({ item }) => (<TouchableOpacity
                                onPress={() => {
                                    userlogined === true ?
                                        navigation.navigate(item.name)
                                        :
                                        loginview()
                                }}>
                                <Text style={style.item}>{item.key}</Text>
                            </TouchableOpacity>)}
                        />
                    </View>
                    <View style={{
                        marginTop: "25%",
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
                            <Ionicons name="logo-twitter" size={36}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="medium-monogram" size={36} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}