import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Clipboard,
    RefreshControl,
    Dimensions,
    Modal
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const style = StyleSheet.create({
    container: {
        marginLeft: 32,
        paddingTop: 16,
        paddingBottom: 8
    },
    profile: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        opacity: 0.8,
        color: '#ffffff',
        marginBottom: 8,
    },
    containerStatus: {
        marginTop: 16,
        backgroundColor: "#646464",
        height: 130,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "90%",
        alignSelf: "center",
        paddingLeft: 16,
        paddingTop: 32,
        paddingBottom: 32,
        paddingRight: 32
    },
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8,
        marginBottom: 16
    },
    box: {
        marginLeft: 32,
        marginBottom: 16
    },
    images: {
        height: 68,
        width: 78,
        borderRadius: 10,
    },
    item: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        opacity: 0.6,
        color: '#303030'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#48d1cc'
    },
    clipboard: {
        height: 20,
        width: 16,
    },
})

const modal = StyleSheet.create({
    modalText: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#202426',
        marginTop: 32,
    },
    modalPasswordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    iconBox: {
        height: 80,
        width: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#5cc27b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    largeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    mediumBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    smallBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 0.25 * WIDTH,
        height: 0.1 * HEIGHT
    },
    number: {
        fontSize: 34,
        fontFamily: 'NunitoSans-Regular',
        color: '#352641',
    },
})

//Refresh 하는 시간 설정
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function ProfileMain({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const [userName, setuserName] = useState();
    const [userBirth, setuserBirth] = useState();
    const [userPhone, setuserPhone] = useState();
    const [userNick, setUserNick] = useState();
    const [haveProfile, setHaveProfile] = useState();
    const [copiedText, setCopiedText] = useState('')
    const ref = firestore().collection("UserInfo");

    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage, setIsImage] = useState(false);

    const copyToClipboard = () => {
        Clipboard.setString('hello world')
    }
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

    //비밀번호 재설정 변수 선언
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);

    //상태 확인
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    //프론트 상 이미지 처리
    const OneImage = one === true ? <Ionicons name="ios-medical-sharp" color="#303030" size={20} /> : <View style={{width: 20, height: 20, backgroundColor: "#ffffff"}} />
    const TwoImage = two === true ? <Ionicons name="ios-medical-sharp" color="#303030" size={20} /> : <View style={{width: 20, height: 20, backgroundColor: "#ffffff"}} />
    const ThreeImage = three === true ? <Ionicons name="ios-medical-sharp" color="#303030" size={20} /> : <View style={{width: 20, height: 20, backgroundColor: "#ffffff"}} />
    const FourImage = four === true ? <Ionicons name="ios-medical-sharp" color="#303030" size={20} /> : <View style={{width: 20, height: 20, backgroundColor: "#ffffff"}} />

    //각각의 경우
    function pass(count, action) {
        switch (action.type) {
            case 'plus':
                return count += 1;
            case 'minus':
                return count -= 1;
            case 'delete':
                setOne(false);
                setTwo(false);
                setThree(false);
                setFour(false);
                return count = 0;
            case 'confirmwrong':
                return count = 0;
        }
    }

    const [count, dispatch] = useReducer(pass, 0);
    const onIncrease = () => {
        dispatch({
            type: 'plus'
        })
    }
    const onDecrease = () => {
        dispatch({
            type: 'minus'
        })
    }

    const onDelete = () => {
        dispatch({
            type: 'delete'
        })
    }

    //첫번째 비밀번호, 두번째 비밀번호 선언
    const [passWord, setPassWord] = useState([]);
    const [passWordTwo, setPassWordTwo] = useState([]);

    //비밀번호 배열에 비밀번호 넣기
    const onAddOne = () => {
        Time === false ? setPassWord(passWord.concat(1)) : setPassWordTwo(passWordTwo.concat(1))
    }
    const onAddTwo = () => {
        Time === false ? setPassWord(passWord.concat(2)) : setPassWordTwo(passWordTwo.concat(2))
    }
    const onAddThree = () => {
        Time === false ? setPassWord(passWord.concat(3)) : setPassWordTwo(passWordTwo.concat(3))
    }
    const onAddFour = () => {
        Time === false ? setPassWord(passWord.concat(4)) : setPassWordTwo(passWordTwo.concat(4))
    }
    const onAddFive = () => {
        Time === false ? setPassWord(passWord.concat(5)) : setPassWordTwo(passWordTwo.concat(5))
    }
    const onAddSix = () => {
        Time === false ? setPassWord(passWord.concat(6)) : setPassWordTwo(passWordTwo.concat(6))
    }
    const onAddSeven = () => {
        Time === false ? setPassWord(passWord.concat(7)) : setPassWordTwo(passWordTwo.concat(7))
    }
    const onAddEight = () => {
        Time === false ? setPassWord(passWord.concat(8)) : setPassWordTwo(passWordTwo.concat(8))
    }
    const onAddNine = () => {
        Time === false ? setPassWord(passWord.concat(9)) : setPassWordTwo(passWordTwo.concat(9))
    }
    const onAddZero = () => {
        Time === false ? setPassWord(passWord.concat(0)) : setPassWordTwo(passWordTwo.concat(0))
    }
    const onDeleteOne = () => {
        Time === false ? setPassWord(passWord.slice(0, passWord.length - 1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length - 1))
    }
    const onDeleteAll = () => {
        Time === false ? setPassWord(passWord.slice(0, 0)) : setPassWordTwo(passWordTwo.slice(0, 0))
    }

    //실제 비밀번호랑 맞는지 확인 과정
    //0. 비밀번호 입력 횟수/첫번째가 같은지 다른지 알수 있는 변수/두번째가 같은지 다른지 알수 있는 변수 선언
    const [Time, setTime] = useState(false);
    const [oneTime, setOneTime] = useState(true);
    const [twoTime, setTwoTime] = useState(true);
    let i = 0;
    //1. 현재 User 조회
    const User = firebase.auth().currentUser;
    //2. 배열 비교 함수 선언
    function compareArray(arr1, arr2) {
        for (i=0; i<arr1.length || i<arr2.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
    //3. 두번째 비밀번호를 입력하는 Twopassword()함수로 가고 passWordTwo가 입력됨
    const Twopassword = () => {
        setOneTime(true);
        onDelete();
        setTime(true);
    }
    //4. passWord와 passWordTwo가 같으면 완료화면으로 넘어가는 confirmTrue()로 감
    async function confirmTrue(user){
        await firestore().collection("UserInfo").doc(user.uid)
            .update({
                password: passWordTwo
            })
        setTwoTime(true);
        setPasswordVisible(false);
        navigation.popToTop();
    }
    //5. 다르면 두번째 passWordTwo를 다시 입력하도록 하는 confirmWrongTwo()로 감
    const confirmWrongTwo = () => {
        setTwoTime(false);
        onDelete();
        onDeleteAll();
    }

    useEffect(() => {
        if (count > 4) {
            console.log("초과되었습니다.");
            Time === false ? setPassWord(passWord.slice(0, passWord.length - 1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length - 1))
            dispatch({
                type: 'minus'
            })
        }
        else if (count < 0) {
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log("작습니다.");
            dispatch({
                type: 'plus'
            })
        }
        else if (count === 0) {
            setOne(false);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log(Time === false ? passWord : passWordTwo);
            console.log("0");
        }
        else if (count === 1) {
            setOne(true);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log(Time === false ? passWord : passWordTwo);
            console.log("1");
        }
        else if (count === 2) {
            setOne(true);
            setTwo(true);
            setThree(false);
            setFour(false);
            console.log(Time === false ? passWord : passWordTwo);
            console.log("2")
        }
        else if (count === 3) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(false);
            console.log(Time === false ? passWord : passWordTwo);
            console.log("3")
        }
        else if (count === 4) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(true);
            console.log(Time === false ? passWord : passWordTwo);
            console.log("4")
            //실제와 같은지 비교
            Time ? compareArray(passWord, passWordTwo) ? confirmTrue(User) : confirmWrongTwo() : Twopassword();
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [count])

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
                <Modal
                    animationType="slide"
                    visible={passwordVisible}
                    onRequestClose={() => setPasswordVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: '#CCCCCC', justifyContent: 'flex-end' }}>
                        <View style={{
                            flex: 0.7,
                            borderTopRightRadius: 35,
                            borderTopLeftRadius: 35,
                            backgroundColor: '#ffffff',
                            alignItems: 'center'
                        }}>
                            <Text style={modal.modalText}>비밀번호</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingLeft: 60,
                                paddingRight: 60,
                                marginTop: 16
                            }}>
                                <View style={[modal.iconBox, { marginRight: 12 }]}>
                                    {OneImage}
                                </View>
                                <View style={[modal.iconBox, { marginRight: 6 }]}>
                                    {TwoImage}
                                </View>
                                <View style={[modal.iconBox, { marginLeft: 6 }]}>
                                    {ThreeImage}
                                </View>
                                <View style={[modal.iconBox, { marginLeft: 12 }]}>
                                    {FourImage}
                                </View>
                            </View>
                            {twoTime ?
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', alignSelf: 'center' }}></Text>
                                :
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', marginTop: 19, alignSelf: 'center' }}>비밀번호가 다릅니다. 다시 입력해주세요</Text>
                            }
                            <View style={[modal.modalPasswordBox, { marginTop: oneTime ? twoTime ? 19 : 0 : 0 }]}>
                                {oneTime === false ?
                                    <View style={modal.largeBox}>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddOne}>
                                                <Text style={modal.number}>1</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddTwo}>
                                                <Text style={modal.number}>2</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddThree}>
                                                <Text style={modal.number}>3</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddFour}>
                                                <Text style={modal.number}>4</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddFive}>
                                                <Text style={modal.number}>5</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddSix}>
                                                <Text style={modal.number}>6</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddSeven}>
                                                <Text style={modal.number}>7</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddEight}>
                                                <Text style={modal.number}>8</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddNine}>
                                                <Text style={modal.number}>9</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onDelete} onPressIn={onDeleteAll}>
                                                <Text style={modal.text}>취소</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddZero}>
                                                <Text style={modal.number}>0</Text >
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onDecrease} onPressIn={onDeleteOne}>
                                                <Image source={require('./icon/delete.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <View style={modal.largeBox}>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddOne}>
                                                <Text style={modal.number}>1</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddTwo}>
                                                <Text style={modal.number}>2</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddThree}>
                                                <Text style={modal.number}>3</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddFour}>
                                                <Text style={modal.number}>4</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddFive}>
                                                <Text style={modal.number}>5</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddSix}>
                                                <Text style={modal.number}>6</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddSeven}>
                                                <Text style={modal.number}>7</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddEight}>
                                                <Text style={modal.number}>8</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddNine}>
                                                <Text style={modal.number}>9</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={modal.mediumBox}>
                                            <TouchableOpacity style={modal.smallBox} onPress={onDelete} onPressIn={onDeleteAll}>
                                                <Text style={modal.text}>취소</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onIncrease} onPressIn={onAddZero}>
                                                <Text style={modal.number}>0</Text >
                                            </TouchableOpacity>
                                            <TouchableOpacity style={modal.smallBox} onPress={onDecrease} onPressIn={onDeleteOne}>
                                                <Image source={require('./icon/delete.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Text style={[style.title, { marginLeft: 32, marginTop: 20, marginBottom: 0 }]}>Profile</Text>
                    <View style={style.containerStatus}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={showCameraRoll1}>
                            {isImage===true?
                            <Image resizeMode="stretch" source={{ uri: imageSource}} style={{ width: 92, height: 92 }} />
                            :
                            <Image resizeMode="stretch" style={style.images} source={require('./icon/userprofile.png')}></Image>
                            }
                            </TouchableOpacity>
                            <View style={{
                                marginLeft: 16,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={style.profile}>스트레스형 예술가형</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text style={[style.profile, {color: "white", fontFamily: "NunitoSans-Bold", marginBottom: 0}]}>{userNick}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('닉네임 변경')}>
                                        <MaterialCommunityIcons name="pencil" color="white" size={25} style={{ marginLeft: 8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{width: 60, height: 24, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 15}}>
                            <Text style={{fontFamily: "NunitoSans-Bold", fontSize: 12, color: "#303030"}}>Step 01</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>이름</Text>
                        {user?
                        <Text style={style.item}>{user.displayName}</Text>
                        :
                        <Text> </Text>
                        }
                        
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>생년월일</Text>
                        <Text style={style.item}>{userBirth}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>휴대폰번호</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}></Text>
                            <TouchableOpacity style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold'}}>재인증</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>비밀번호 재설정</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}>비밀번호를 잃어버리셨나요?</Text>
                            <TouchableOpacity onPress={() => setPasswordVisible(true)} style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold' }}>재설정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}