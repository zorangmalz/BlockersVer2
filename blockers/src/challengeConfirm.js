import React, {useState, useReducer, useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
        fontFamily: 'NunitoSans-Regular'
    },
    largeText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold'
    },
    mediumText: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular'
    },
    kitText : {
        fontSize: 18,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B'
    }
})

const password = StyleSheet.create({
    largeBox: {
        position: 'absolute',
        bottom: 60,
    },
    mediumBox : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: "7%"
    },
    smallBox : {
        justifyContent: 'center',
        alignItems: 'center',
        width: "34%",
        height: 40
    }, 
    number : {
        fontSize: 30,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.8
    },
    text: {
        fontSize: 25,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.8
    },
    iconBox: {
        height: 65,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function ChallengeConfirm({ navigation }) {
    let a = 1;
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
    function move() {
        addInfo(user.email, user.uid, passWord)
        navigation.navigate("WalletWithdrawlComplete")
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
    function confirmTrue () {
        addInfo(user.email, user.uid, passWord);
        navigation.popToTop();
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
    
    function WrongPass () {
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
        oneTime===false ? setPassWord(passWord.concat(1)) : setPassWordTwo(passWordTwo.concat(1))
    }
    const onAddTwo = () => {
        oneTime===false ? setPassWord(passWord.concat(2)) : setPassWordTwo(passWordTwo.concat(2))
    }
    const onAddThree = () => {
        oneTime===false ? setPassWord(passWord.concat(3)) : setPassWordTwo(passWordTwo.concat(3))
    }
    const onAddFour = () => {
        oneTime===false ? setPassWord(passWord.concat(4)) : setPassWordTwo(passWordTwo.concat(4))
    }
    const onAddFive = () => {
        oneTime===false ? setPassWord(passWord.concat(5)) : setPassWordTwo(passWordTwo.concat(5))
    }
    const onAddSix = () => {
        oneTime===false ? setPassWord(passWord.concat(6)) : setPassWordTwo(passWordTwo.concat(6))
    }
    const onAddSeven = () => {
        oneTime===false ? setPassWord(passWord.concat(7)) : setPassWordTwo(passWordTwo.concat(7))
    }
    const onAddEight = () => {
        oneTime===false ? setPassWord(passWord.concat(8)) : setPassWordTwo(passWordTwo.concat(8))
    }
    const onAddNine = () => {
        oneTime===false ? setPassWord(passWord.concat(9)) : setPassWordTwo(passWordTwo.concat(9))
    }
    const onAddZero = () => {
        oneTime===false ? setPassWord(passWord.concat(0)) : setPassWordTwo(passWordTwo.concat(0))
    }
    const onDeleteOne = () => {
        oneTime===false ? setPassWord(passWord.slice(0, passWord.length-1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length-1))
    }
    const onDeleteAll = () => {
        oneTime===false ? setPassWord(passWord.slice(0, 0)) : setPassWordTwo(passWordTwo.slice(0, 0))
    }


    useEffect(() => {
        if (count > 4) {
            console.log("초과되었습니다.");
            oneTime===false ? setPassWord(passWord.slice(0, passWord.length-1)) : setPassWordTwo(passWordTwo.slice(0, passWordTwo.length-1))
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
            console.log(oneTime===false ? passWord : passWordTwo);
            console.log("0");
        }
        else if (count === 1) {
            setOne(true);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log(oneTime===false ? passWord : passWordTwo);
            console.log("1");
        }
        else if (count === 2) {
            setOne(true);
            setTwo(true);
            setThree(false);
            setFour(false);
            console.log(oneTime===false ? passWord : passWordTwo);
            console.log("2")
        }
        else if (count === 3) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(false);
            console.log(oneTime===false ? passWord : passWordTwo);
            console.log("3")
        }
        else if (count === 4) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(true);
            console.log(oneTime===false ? passWord : passWordTwo);
            console.log("4")
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
    }, [count])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{ marginBottom: 70 }}>
                    <View style={{ marginTop: 32 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={[challenge.circle, { backgroundColor: '#ffffff' }]}>
                                <Text style={[challenge.mediumText, { color: '#5CC27B' }]}>1</Text>
                            </View>
                            <View style={challenge.bar} />
                            <View style={[challenge.circle, { backgroundColor: '#ffffff' }]}>
                                <Text style={[challenge.mediumText, { color: '#5CC27B'}]}>2</Text>
                            </View>
                            <View style={challenge.bar} />
                            <View style={[challenge.circle, { backgroundColor: '#5CC27B' }]}>
                                <Text style={[challenge.mediumText, { color: '#ffffff', fontFamily: 'NunitoSans-Bold' }]}>3</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: 4,
                        }}>
                            <Text style={challenge.smallText}>챌린지 정보</Text>
                            <Text style={challenge.smallText}>챌린지 설정</Text>
                            <Text style={challenge.smallText}>비밀번호 입력</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 45,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 60,
                        paddingRight: 60
                    }}>
                        <View style={password.iconBox}>
                            <Image resizeMode="contain" style={{width: 20, height: 60}} source={OneImage} />
                            <View style={{backgroundColor: '#5cc27b', width: 48, height: 1.5}}/>
                        </View>
                        <View style={password.iconBox}>
                            <Image resizeMode="contain" style={{width: 20, height: 60}} source={TwoImage} />
                            <View style={{backgroundColor: '#5cc27b', width: 48, height: 1.5}}/>
                        </View>
                        <View style={password.iconBox}>
                            <Image resizeMode="contain" style={{width: 20, height: 60}} source={ThreeImage} />
                            <View style={{backgroundColor: '#5cc27b', width: 48, height: 1.5}}/>
                        </View>
                        <View style={password.iconBox}>
                            <Image resizeMode="contain" style={{width: 20, height: 60}} source={FourImage} />
                            <View style={{backgroundColor: '#5cc27b', width: 48, height: 1.5}}/>
                        </View>
                    </View>
                    {twoTime ? 
                        <Text></Text>
                        :
                        <Text style={{fontFamily: 'NunitoSans-Regular', fontSize: 12, color: '#ff0000', marginTop: 16, alignSelf: 'center'}}>비밀번호가 다릅니다. 다시 입력해주세요</Text>    
                    }
                </ScrollView>
                {oneTime === false ?
                    <View style={password.largeBox}>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddOne}>
                                <Text style={password.number}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddTwo}>
                                <Text style={password.number}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddThree}>
                                <Text style={password.number}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFour}>
                                <Text style={password.number}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFive}>
                                <Text style={password.number}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSix}>
                                <Text style={password.number}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSeven}>
                                <Text style={password.number}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddEight}>
                                <Text style={password.number}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddNine}>
                                <Text style={password.number}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onDelete} onPressIn={onDeleteAll}>
                                <Text style={password.text}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddZero}>
                                <Text style={password.number}>0</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onDecrease} onPressIn={onDeleteOne}>
                                <Text style={password.text}>지우기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={password.largeBox}>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddOne}>
                                <Text style={password.number}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddTwo}>
                                <Text style={password.number}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddThree}>
                                <Text style={password.number}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFour}>
                                <Text style={password.number}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddFive}>
                                <Text style={password.number}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSix}>
                                <Text style={password.number}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddSeven}>
                                <Text style={password.number}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddEight}>
                                <Text style={password.number}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddNine}>
                                <Text style={password.number}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={password.mediumBox}>
                            <TouchableOpacity style={password.smallBox} onPress={onDelete} onPressIn={onDeleteAll}>
                                <Text style={password.text}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onIncrease} onPressIn={onAddZero}>
                                <Text style={password.number}>0</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={password.smallBox} onPress={onDecrease} onPressIn={onDeleteOne}>
                                <Text style={password.text}>지우기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {count===4 ?
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={oneTime===false ? Twopassword : WrongPass}>
                        <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>다음</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ position: 'absolute', bottom: 0, width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>다음</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )
}