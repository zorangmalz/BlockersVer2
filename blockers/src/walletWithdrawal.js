import React, { useState, useReducer, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Modal,
    Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

export function WalletWithdrawal({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [money, onChangeMoney] = useState('')
    const [bank, onChangeBank] = useState('')
    const [account, onChangeAccount] = useState('')
    const [check, setCheck] = useState(false)
    const checkColor = check === true ? "#5CC27B" : "#FFFFFF";
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    //create userInfo
    const ref = firestore().collection("UserInfo");


    async function addInfo(mail, code, pass) {
        await ref.doc(code).set({
            birth: "",
            cellphone: "",
            email: mail,
            password: pass,
            sex: "",
            nickname: "",
            SmokingTime: ""
        })
    }

    const OneImage = one === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const TwoImage = two === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const ThreeImage = three === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const FourImage = four === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

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

    const [oneTime, setOneTime] = useState(false);
    const [twoTime, setTwoTime] = useState(true);
    function Twopassword() {
        onDelete();
        setOneTime(true);
    }
    function confirmTrue() {
        addInfo(user.email, user.uid, passWord);
        setPasswordVisible(false)
        navigation.navigate("WalletWithDrawlComplete");
    }
    const confirmWrong = () => {
        setTwoTime(false);
        onDelete();
        onDeleteAll();
    }
    function compareArray(arr1, arr2) {
        var rst = false;

        if (arr1.length != arr2.length) {
            return rst;
        }

        arr1.forEach(function (item) {
            var i = arr2.indexOf(item);
            if (i > -1) arr2.splice(i, 1);
        });
        rst = arr2.length == 0;
        return rst;
    }

    function WrongPass() {
        compareArray(passWord, passWordTwo) === true ? confirmTrue() : confirmWrong()
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

    const [passWord, setPassWord] = useState([]);
    const [passWordTwo, setPassWordTwo] = useState([]);
    const onAddOne = () => {
        oneTime === false ? setPassWord(passWord.concat(1)) : setPassWordTwo(passWordTwo.concat(1))
    }
    const onAddTwo = () => {
        oneTime === false ? setPassWord(passWord.concat(2)) : setPassWordTwo(passWordTwo.concat(2))
    }
    const onAddThree = () => {
        oneTime === false ? setPassWord(passWord.concat(3)) : setPassWordTwo(passWordTwo.concat(3))
    }
    const onAddFour = () => {
        oneTime === false ? setPassWord(passWord.concat(4)) : setPassWordTwo(passWordTwo.concat(4))
    }
    const onAddFive = () => {
        oneTime === false ? setPassWord(passWord.concat(5)) : setPassWordTwo(passWordTwo.concat(5))
    }
    const onAddSix = () => {
        oneTime === false ? setPassWord(passWord.concat(6)) : setPassWordTwo(passWordTwo.concat(6))
    }
    const onAddSeven = () => {
        oneTime === false ? setPassWord(passWord.concat(7)) : setPassWordTwo(passWordTwo.concat(7))
    }
    const onAddEight = () => {
        oneTime === false ? setPassWord(passWord.concat(8)) : setPassWordTwo(passWordTwo.concat(8))
    }
    const onAddNine = () => {
        oneTime === false ? setPassWord(passWord.concat(9)) : setPassWordTwo(passWordTwo.concat(9))
    }
    const onAddZero = () => {
        oneTime === false ? setPassWord(passWord.concat(0)) : setPassWordTwo(passWordTwo.concat(0))
    }
    const onDeleteOne = () => {
        oneTime === false ? setPassWord(passWord.slice(0, passWord.length - 1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length - 1))
    }
    const onDeleteAll = () => {
        oneTime === false ? setPassWord(passWord.slice(0, 0)) : setPassWordTwo(passWordTwo.slice(0, 0))
    }


    useEffect(() => {
        if (count > 4) {
            console.log("초과되었습니다.");
            oneTime === false ? setPassWord(passWord.slice(0, passWord.length - 1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length - 1))
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
            console.log(oneTime === false ? passWord : passWordTwo);
            console.log("0");
        }
        else if (count === 1) {
            setOne(true);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log(oneTime === false ? passWord : passWordTwo);
            console.log("1");
        }
        else if (count === 2) {
            setOne(true);
            setTwo(true);
            setThree(false);
            setFour(false);
            console.log(oneTime === false ? passWord : passWordTwo);
            console.log("2")
        }
        else if (count === 3) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(false);
            console.log(oneTime === false ? passWord : passWordTwo);
            console.log("3")
        }
        else if (count === 4) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(true);
            console.log(oneTime === false ? passWord : passWordTwo);
            console.log("4")
            {
                oneTime === false ?
                setTimeout(() => {
                    Twopassword();
                }, 300)
                :
                setTimeout(() => {
                    WrongPass();
                }, 300)
            }
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [count])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
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
                                    <Image resizeMode="contain" style={{ width: 20, height: 60 }} source={OneImage} />
                                </View>
                                <View style={[modal.iconBox, { marginRight: 6 }]}>
                                    <Image resizeMode="contain" style={{ width: 20, height: 60 }} source={TwoImage} />
                                </View>
                                <View style={[modal.iconBox, { marginLeft: 6 }]}>
                                    <Image resizeMode="contain" style={{ width: 20, height: 60 }} source={ThreeImage} />
                                </View>
                                <View style={[modal.iconBox, { marginLeft: 12 }]}>
                                    <Image resizeMode="contain" style={{ width: 20, height: 60 }} source={FourImage} />
                                </View>
                            </View>
                            {twoTime ?
                                <Text></Text>
                                :
                                <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', marginTop: 19, alignSelf: 'center' }}>비밀번호가 다릅니다. 다시 입력해주세요</Text>
                            }
                            <View style={modal.modalPasswordBox}>
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
                                                <Text style={modal.text}>지우기</Text>
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
                                                <Text style={modal.text}>지우기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ marginBottom: 70, paddingTop: 35 }}>
                    <TextInput
                        placeholder="출금 금액"
                        placeholderTextColor="#B8B8B8"
                        value={money}
                        onChangeText={text => onChangeMoney(text)}
                        keyboardType="number-pad"
                        style={{ width: "85%", height: 50, borderBottomColor: '#5CC27B', borderBottomWidth: 2, alignSelf: 'center', fontSize: 21, fontFamily: 'NunitoSans-Regular' }}
                    />
                    {money.length > 0 ?
                        <Text style={{ fontSize: 12, fontFamily: 'NunitoSans-Regular', color: '#ff0000', marginLeft: "7.5%", marginTop: 4 }}>출금 가능 금액: 120,000</Text>
                        :
                        <Text />
                    }
                    <TextInput
                        placeholder="은행"
                        placeholderTextColor="#B8B8B8"
                        keyboardType="email-address"
                        value={bank}
                        onChangeText={text => onChangeBank(text)}
                        style={{ width: "30%", height: 50, borderBottomColor: '#5CC27B', borderBottomWidth: 2, marginLeft: "7.5%", fontSize: 21, marginTop: 28, fontFamily: 'NunitoSans-Regular' }}
                    />
                    <TextInput
                        placeholder="계좌번호"
                        placeholderTextColor="#B8B8B8"
                        value={account}
                        onChangeText={text => onChangeAccount(text)}
                        keyboardType="number-pad"
                        style={{ width: "85%", height: 50, borderBottomColor: '#5CC27B', borderBottomWidth: 2, alignSelf: 'center', fontSize: 21, marginTop: 32, fontFamily: 'NunitoSans-Regular' }}
                    />
                    <View style={{ width: "90%", height: 170, backgroundColor: '#E6E6E6', alignSelf: 'center', paddingTop: 16, paddingBottom: 16, paddingRight: 32, paddingLeft: 32, marginBottom: 16, marginTop: 16 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Image source={require('./icon/warning.png')} />
                            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Bold', color: '#333333', marginLeft: 8 }}>출금시 주의사항</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#333333', marginBottom: 5 }}>- 출금가능 금액 이하로 입력해주세요.</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#333333', marginBottom: 5 }}>- 출금은 1-3일 내로 이루어 집니다.</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#333333', marginBottom: 5 }}>- 계좌번호 오입력시 환불 불가능합니다.</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => setCheck(!check)}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: checkColor }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontFamily: 'NunitoSans-Regular', color: '#333333', marginLeft: 8 }}>출금시 주의사항을 확인했습니다.</Text>
                    </View>
                </ScrollView>
                {(money.length > 0) && (bank.length > 0) && (account.length > 0) && (check === true) ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => setPasswordVisible(true)}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>출금하기</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>출금하기</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}

export function WalletWithdrawlComplete({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView>
                    <Image
                        style={{ width: 150, height: 150, alignSelf: 'center', marginTop: "30%", marginBottom: 32 }}
                        source={require('./icon/resetcheck.png')}
                    />
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'NunitoSans-Bold',
                        color: '#303030',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>출금 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#303030',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>출금까지 5-10분 정도 소요됩니다.</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#303030',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 8
                    }}>완료시 알림으로 알려드리겠습니다.</Text>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.popToTop()}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>종료</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}