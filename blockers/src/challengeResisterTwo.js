import React, {useState, useReducer, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    Dimensions,
    Modal
} from 'react-native';
import {challengeToken} from './ChallengeMain';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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

const challenge = StyleSheet.create({
    box: {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 17
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#5CC27B',
        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        width: "22.5%",
        height: 1,
        backgroundColor: '#5CC27B'
    },
    smallText: {
        fontSize: 12,
        width: 75,
        textAlign: "center",
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    },
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030'
    },
    mediumText: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    },
    kitText : {
        fontSize: 18,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B'
    }
})

export default function ChallengeResisterTwo({navigation}) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

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
    //3. 같으면 두번째 비밀번호를 입력하는 Twopassword()함수로 가고 passWordTwo가 입력됨
    const Twopassword = () => {
        setOneTime(true);
        onDelete();
        setTime(true);
    }
    //4. 다르면 처음부터 입력하는 confirmWrong()으로 감
    const confirmWrong = () => {
        setOneTime(false);
        onDelete();
        onDeleteAll();
    }
    //5. 같으면 완료화면으로 넘어가는 confirmTrue()로 감
    const confirmTrue = () => {
        setTwoTime(true);
        setPasswordVisible(false);
        navigation.popToTop();
    }
    //6. 다르면 두번째 passWordTwo를 다시 입력하도록 하는 confirmWrongTwo()로 감
    const confirmWrongTwo = () => {
        setTwoTime(false);
        onDelete();
        onDeleteAll();
    }
    //7. firestore에 저장된 비밀번호 가져와 비교하기
    async function UserPassword(USER) {
        const arr = []
        const data = await (await firestore().collection("UserInfo").doc(USER.uid).get()).data().password
        data.forEach(number => {
            arr.push(number)
        })
        Time ? compareArray(passWordTwo, arr) ? confirmTrue() : confirmWrongTwo() : compareArray(passWord, arr) ? Twopassword() : confirmWrong();
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
            UserPassword(User)
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [count])

    const username = "박지훈";
    const phoneNumber = "010-4337-6670";
    const [addressnumber, setAdressnumber] = useState('');
    const [address, setAddress] = useState('');
    const [detailaddress, setDetailaddress] = useState('');

    const [money, setMoney] = useState('');
    const Money = money.length === 0 ? 0 : parseInt(money);
    const totalmoney = Money+12500;
    function onYesorNo(state, action) {
        switch(action.type) {
            case 'nothing' : 
                return state=0
            case 'yes' : 
                return state=1
            case 'no' :
                return state=2
        }
    }
    const [YesorNo, dispatchs] = useReducer(onYesorNo, 0);
    const YesPress = () => {
        dispatchs({
            type : 'yes'
        })
    }
    const NoPress = () => {
        dispatchs({
            type: 'no'
        })
    }
    const YesColor = YesorNo===1 ? "#5CC27B" : "#FFFFFF";
    const NoColor = YesorNo===2 ? "#5CC27B" : "#FFFFFF";

    const [checkOne, setCheckOne] = useState(false);
    const [checkTwo, setCheckTwo] = useState(false);
    const [checkThree, setCheckThree] = useState(false);
    const onOneCheck = () => { setCheckOne(!checkOne) }
    const onTwoCheck = () => { setCheckTwo(!checkTwo) }
    const onThreeCheck = () => { setCheckThree(!checkThree) }
    const OneCheck = checkOne === true ? require('./icon/check.png') : undefined;
    const TwoCheck = checkTwo === true ? require('./icon/check.png') : undefined;
    const ThreeCheck = checkThree === true ? require('./icon/check.png') : undefined;

    const [info, setInfo] = useState(false);
    const kitButton = () => { setInfo(!info) }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Challenge</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ marginBottom: 70 }}>
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
                            {oneTime ? 
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', alignSelf: 'center' }}></Text>
                                :
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', marginTop: 19, alignSelf: 'center' }}>비밀번호가 다릅니다. 다시 입력해주세요</Text>
                            }
                            {twoTime ?
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', alignSelf: 'center' }}></Text>
                                :
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', marginTop: 19, alignSelf: 'center' }}>비밀번호가 다릅니다. 다시 입력해주세요</Text>
                            }
                            <View style={[modal.modalPasswordBox, {marginTop: oneTime ? twoTime ? 19 : 0 : 0}]}>
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
                    {info===false ? 
                        <View />
                        :
                        <View style={{
                            position: 'absolute', 
                            top: 0, 
                            alignSelf: 'center', 
                            justifyContent: 'flex-start',
                            width: "92%", 
                            height: 509,
                            zIndex: 1,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#C6C6C6',
                            paddingLeft: 28,
                            paddingRight: 28,
                            paddingTop: 20,
                            paddingBottom: 20,
                            marginTop: 7
                        }}>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>챌린지 키트?</Text>
                            <Text style={{marginBottom: 16}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>당신의</Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}> 챌린지 성공</Text>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>을 돕기위한</Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}> 비장의 카드!</Text>
                            </Text>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>다음과 같이 구성되어 있어요.</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit1.png')} />
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit2.png')} />
                                <Image resizeMode="contain" style={{width: 80, height: 80}} source={require('./icon/kit3.png')} />
                            </View>
                            <Text style={{marginBottom: 8}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>1. 입이 심심한 당신을 위한 </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>무가당 껌 5 set</Text>
                            </Text>
                            <Text style={{marginBottom: 8}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>2. 금연하는 것을 자연스럽게! </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>금연 굿즈!</Text>
                            </Text>
                            <Text style={{marginBottom: 18}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>3. 금연 잘하고 있나? </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>타액검사키트 2 set!</Text>
                            </Text>
                            <Text style={[challenge.kitText,{marginBottom: 16}]}>특별혜택</Text>
                            <Text style={{marginBottom: 16}}>
                                <Text style={[challenge.largeText,{fontFamily: 'NunitoSans-Regular'}]}>챌린지에 성공하면 </Text>
                                <Text style={[challenge.largeText,{color: '#FFB83D'}]}>2,000BLOCK 페이백!</Text>
                            </Text>
                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => setInfo(!info)}>
                                <View style={{width: 150, height: 50, borderRadius: 28, backgroundColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}} >
                                    <Text style={{fontSize: 16, fontFamily: 'NunitoSans-Bold', color: '#FFFFFF'}}>확인</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: "5%"}}>
                        <Text style={[challenge.mediumText,{fontFamily: 'NunitoSans-Bold'}]}>참가자 정보</Text>
                    </View>
                    <View style={{
                        marginTop: 18,
                        marginLeft: "5%",

                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Image source={require('./icon/kitone.png')} resizeMode="center" style={{width: 68, height: 68, borderRadius: 34}} />
                        <View style={{
                            marginLeft: 18,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={[challenge.mediumText, {marginBottom: 7, fontFamily: 'NunitoSans-Bold'}]}>{username}</Text>
                            <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold'}]}>{phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 28,
                        marginLeft: "5%",
                        marginRight: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold'}]}>참가금액</Text>
                        <TextInput value={money} keyboardType="numeric" onChangeText={text => setMoney(text)} placeholder="최소 10,000 ~ 최대 100,000" placeholderTextColor="#C6C6C6" style={{fontSize: 14, textAlignVertical: 'center', width:"55%", height: 40, fontFamily: 'NunitoSans-Regular', borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginLeft: 20}}/>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold', marginRight: 16}]}>BLOCK</Text>
                    </View>
                    <View style={{alignSelf: 'center', marginTop: 8, marginRight: 50}}>
                        <Text style={{fontSize: 12, color: '#FF0000', fontFamily: 'NunitoSans-Regular'}}>입력가능 : 100,000</Text>
                    </View>
                    <View style={{
                        marginTop: 32,
                        marginLeft: "5%",
                        flexDirection : 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={[challenge.mediumText, {fontFamily: 'NunitoSans-Bold', marginRight: 4}]}>챌린지 키트</Text>
                        <TouchableOpacity onPress={kitButton}>
                            <Image resizeMode="contain" source={require('./icon/questionmark.png')} style={{width: 20, height: 20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 17, marginRight: 7}} onPress={YesPress}>
                            <View style={{width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{width: 12, height: 12, borderRadius: 6, backgroundColor:YesColor}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 14, color: '#303030', opacity: 0.8}}>있음</Text>
                        <TouchableOpacity style={{marginLeft: 35, marginRight: 7}} onPress={NoPress}>
                            <View style={{width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{width: 12, height: 12, borderRadius: 6, backgroundColor:NoColor}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 14, color: '#303030', opacity: 0.8}}>없음 (+ 12,500)</Text>
                    </View>
                    {YesorNo === 1 ? 
                        <Text style={{
                            fontSize: 12,
                            color: '#FF0000',
                            alignSelf: 'center',
                            marginLeft: 85,
                            marginTop: 4,
                            fontFamily: 'NunitoSans-Regular'
                        }}>챌린지 키트가 없으면 챌린지를 진행할 수 없습니다.</Text>
                        : 
                        <View />
                    }
                    {YesorNo===2 ?
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 32,
                                marginTop: 18,
                                marginBottom: 8
                            }}>
                                <Text style={{fontSize:14, fontFamily: 'NunitoSans-Bold', color: '#303030'}}>우편번호</Text>
                                <TextInput onChangeText={text => setAdressnumber(text)} placeholder="36917" placeholderTextColor="#C6C6C6" style={{fontSize: 14, width:"36%", height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginLeft: 27, fontFamily: 'NunitoSans-Regular'}}/>
                                <TouchableOpacity style={{marginLeft: 16}} onPress={() => navigation.navigate('주소찾기')}>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFB83D',
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        paddingLeft: 9,
                                        paddingRight: 9,
                                        borderRadius: 5
                                    }}>
                                        <Text style={{fontSize: 12, fontFamily: 'NunitoSans-Bold', color: '#FFFFFF'}}>주소찾기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 32,
                                marginBottom: 8
                            }}>
                                <Text style={{fontSize:14, fontFamily: 'NunitoSans-Bold', alignSelf: 'flex-start', color: '#303030'}}>주소</Text>
                                <View style={{marginLeft: 54}}>
                                    <TextInput onChangeText={text => setAddress(text)} placeholder="경북 문경시 문경읍 온천1길 29" placeholderTextColor="#C6C6C6" style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', width: 251, height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6' }} />
                                    <TextInput onChangeText={text => setDetailaddress(text)} placeholder="1동 202호 (대원퀸즈빌)" placeholderTextColor="#C6C6C6" style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', width: 251, height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#C6C6C6', marginTop: 8 }} />
                                </View>
                            </View>
                        </View>
                        :
                        <View />
                    }
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onOneCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={OneCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8 }]}>내용을 충분히 읽고 이해했습니다.</Text>
                    </View>
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onTwoCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={TwoCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8, textDecorationLine: 'underline' }]}>개인정보 처리 약관</Text>
                    </View>
                    <View style={{
                        marginTop: 16.5,
                        flexDirection: 'row',
                        marginLeft: 32,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={onThreeCheck}>
                            <View style={{
                                width: 19,
                                height: 19,
                                borderWidth: 1,
                                borderColor: '#5CC27B',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={ThreeCheck} />
                            </View>
                        </TouchableOpacity>
                        <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular', marginLeft: 8, textDecorationLine: 'underline' }]}>기타 약관</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center', marginTop: 16, marginBottom: 10 }} />
                    {YesorNo === 2 ?
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: "5%",
                                marginRight: "5%",
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>참가금액</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>{money} Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: "5%",
                                marginRight: "5%",
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular'}]}>챌린지 키트</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>12,500 Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: 18,
                                marginRight: 18
                            }}>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold', color: '#303030' }}>총금액</Text>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold', color: '#303030'  }}>{totalmoney} Block</Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: "5%",
                                marginRight: "5%",
                                marginBottom: 9
                            }}>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular'}]}>참가금액</Text>
                                <Text style={[challenge.largeText, { fontFamily: 'NunitoSans-Regular' }]}>{money} Block</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginLeft: "5%",
                                marginRight: "5%"
                            }}>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold', color: '#303030' }}>총금액</Text>
                                <Text style={{ fontSize: 21, fontFamily: 'NunitoSans-Bold', color: '#303030' }}>{money} Block</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => {
                    {
                        YesorNo === 1 ? (
                            (checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) ?
                                setPasswordVisible(true)
                                :
                                '')
                            :
                            ((checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) && (addressnumber.length > 0) && (address.length > 0) && (detailaddress.length > 0) ?
                                setPasswordVisible(true)
                                :
                                ''
                            )
                    }
                }}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor:
                            YesorNo === 1 ? (
                                (checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) ?
                                    '#5cc27b'
                                    :
                                    '#c6c6c6'
                            )
                                :
                                ((checkOne === true) && (checkTwo === true) && (checkThree === true) && (YesorNo >= 1) && (Money >= 10000) && (Money <= 100000) && (addressnumber.length > 0) && (address.length > 0) && (detailaddress.length > 0) ?
                                    '#5cc27b'
                                    :
                                    '#c6c6c6'
                                ),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>등록하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}