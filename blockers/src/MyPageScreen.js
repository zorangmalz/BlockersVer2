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
} from 'react-native';
import auth from '@react-native-firebase/auth';

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
        backgroundColor: "#85D29C",
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

    function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
            const sexs = "boy"
            user.sex = sexs
            console.log(user.sex)
            console.log(user.password)
            console.log(user.birth)
            console.log(user, "herererererer")
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
                            navigation.navigate('Setting')
                            :
                            Alert.alert(
                                '로그인이 필요한서비스입니다.',
                                '로그인하고 다양한 혜택을 만나보세요',
                                [
                                    {
                                        text: '둘러보기', onPress: () => console.log('둘러보기')
                                    },
                                    {
                                        text: '로그인', onPress: () => navigation.navigate('회원가입')
                                    }
                                ]
                                )
                        }
                        }>
                            <Image source={require('./icon/setting.png')} />
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
                                    <Text style={{ fontSize: 16, fontFamily: "HelveticaNeue", fontFamily: 'NunitoSans-Bold', color: "white" }}>김현명님</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
                                        <Text style={{ textDecorationLine: 'underline', fontSize: 9, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "white" }}>Transaction</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ marginTop: 5, fontSize: 24, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "white" }}>100,000 Block</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 2, justifyContent: 'flex-end', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('WalletWithDrawal')} style={[style.buttonStyle, { backgroundColor: '#f0f0f0', borderBottomLeftRadius: 10 }]}>
                                    <Text style={{ fontSize: 12, color: 'black', opacity: 0.6, fontFamily: 'NunitoSans-Bold' }}>출금</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('입금')} style={[style.buttonStyle, { backgroundColor: '#5cc27b', borderBottomRightRadius: 10 }]}>
                                    <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold' }}>충전</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <TouchableOpacity style={[style.containerStatus, {alignItems: 'center', justifyContent: 'center'}]} onPress={() => 
                            Alert.alert(
                                '로그인이 필요한서비스입니다.',
                                '로그인하고 다양한 혜택을 만나보세요',
                                [
                                    {
                                        text: '둘러보기', onPress: () => console.log('둘러보기')
                                    },
                                    {
                                        text: '로그인', onPress: () => navigation.navigate('회원가입')
                                    }
                                ]
                            )
                        }>
                            <Text style={{ fontSize: 24, fontFamily: "arial", fontFamily: 'NunitoSans-Bold', color: "white" }}>로그인이 필요한 서비스입니다.</Text>
                        </TouchableOpacity>
                    }
                    <View style={style.container}>
                        <FlatList
                            data={[
                                { key: '개인정보', name: 'Profile' },
                                { key: '공지사항', name: '공지사항' },
                                { key: '내가 쓴 글', name: '내가 쓴글' },
                                { key: '이용약관', name: '이용약관' },
                            ]}
                            renderItem={({ item }) => (<TouchableOpacity
                                onPress={() => {
                                    userlogined === true ?
                                        navigation.navigate(item.name)
                                        :
                                        Alert.alert(
                                            '로그인이 필요한서비스입니다.',
                                            '로그인하고 다양한 혜택을 만나보세요',
                                            [
                                                {
                                                    text: '둘러보기', onPress: () => console.log('둘러보기')
                                                },
                                                {
                                                    text: '로그인', onPress: () => navigation.navigate('회원가입')
                                                }
                                            ]
                                        )
                                    }
                                }>
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
                            <Image style={{ width: 30, height: 30 }} source={require('./icon/facebook.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ width: 30, height: 30 }} source={require('./icon/twitter.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ width: 30, height: 30 }} source={require('./icon/medium.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}