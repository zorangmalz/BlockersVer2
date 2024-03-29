import React, {useReducer, useState, useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

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
        color: '#303030',
        opacity: 0.8
    },
    text: {
        fontSize: 25,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.8
    },
    iconBox: {
        height: 65,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function ProfilePasswordChange({ navigation }) {
    let a = 1;
    const text = again===false ? "변경할 비밀번호를 입력해주세요" : "변경할 비밀번호를 재입력해주세요"
    const [setting, setSetting] = useState(false);
    const [again, setAgain] = useState(false);
    var againpass = new Array();
    var passagain = new Array();

    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);

    const OneImage = one === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const TwoImage = two === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const ThreeImage = three === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
    const FourImage = four === true ? require('./icon/passwordicon.png') : require('./icon/blank.png')
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

    const [passWord, setPassWord] = useState([]);
    const onAddOne = () => {
        setPassWord(passWord.concat(1));
    }
    const onAddTwo = () => {
        setPassWord(passWord.concat(2));
    }
    const onAddThree = () => {
        setPassWord(passWord.concat(3));
    }
    const onAddFour = () => {
        setPassWord(passWord.concat(4));
    }
    const onAddFive = () => {
        setPassWord(passWord.concat(5));
    }
    const onAddSix = () => {
        setPassWord(passWord.concat(6));
    }
    const onAddSeven = () => {
        setPassWord(passWord.concat(7));
    }
    const onAddEight = () => {
        setPassWord(passWord.concat(8));
    }
    const onAddNine = () => {
        setPassWord(passWord.concat(9));
    }
    const onAddZero = () => {
        setPassWord(passWord.concat(0));
    }
    const onDeleteOne = () => {
        setPassWord(passWord.slice(0, passWord.length-1))
    }
    const onDeleteAll = () => {
        setPassWord(passWord.slice(0, 0))
    }


    useEffect(() => {
        if (count > 4) {
            console.log("초과되었습니다.");
            setPassWord(passWord.slice(0, passWord.length-1))
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
            console.log(passWord);
            console.log("0");
        }
        else if (count === 1) {
            setOne(true);
            setTwo(false);
            setThree(false);
            setFour(false);
            console.log(passWord);
            console.log("1");
        }
        else if (count === 2) {
            setOne(true);
            setTwo(true);
            setThree(false);
            setFour(false);
            console.log(passWord);
            console.log("2")
        }
        else if (count === 3) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(false);
            console.log(passWord);
            console.log("3")
        }
        else if (count === 4) {
            setOne(true);
            setTwo(true);
            setThree(true);
            setFour(true);
            console.log(passWord);
            console.log("4")
        }
    }, [count])

    const againPassword = () => {
        setAgain(true);
        againpass = passWord;
        console.log(againpass);
        onDelete();
        onDeleteAll();
    }

    const passwordcomplete = () => {
        passagain = passWord;
        console.log(passagain);
        console.log(againpass);
        againpass === passagain ? setSetting(true) : setSetting(false)
    };

    return (
        <>
            <StatusBar  />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{ marginBottom: 70 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontFamily: 'NunitoSans-Regular',
                            color: '#4c4c4c',
                            alignSelf: 'center',
                            marginTop: 16
                        }}
                    >{again===false ? "변경할 비밀번호를 입력해주세요 ": "변경할 비밀번호를 재입력해주세요"}</Text>
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
                    {setting === true ?
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'normal',
                            color: '#ff0000',
                            alignSelf: 'center',
                            marginTop: 16
                        }}>비밀번호가 다릅니다. 다시 입력해주세요.</Text>
                        :
                        <Text />
                    }
                </ScrollView>
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
                {count===4 ?
                    <TouchableOpacity onPress={again===false ? againPassword : passwordcomplete} style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
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
