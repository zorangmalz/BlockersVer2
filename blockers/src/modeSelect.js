import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const mode = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#5cc27b',
        alignSelf: 'center',
        margin: 32
    },
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B',
        marginLeft: 24,
        marginBottom: 36
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
    },
    buttonBox: {
        width: 160,
        height: 160,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: 160,
        height: 160,
        borderWidth: 3,
        borderRadius: 17,
        borderColor: '#FFB83D',
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function ModeSelect({navigation}) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [selectone, setSelectone] = useState([]);
    var countone = 2;

    const pushone = () => {
        setSelectone(selectone.concat('오전'));
    }

    const filterone = () => {
        setSelectone(selectone.filter(info => info !== '오전'))
    }

    const pushtwo = () => {
        setSelectone(selectone.concat('오후 & 저녁'));
    }

    const filtertwo = () => {
        setSelectone(selectone.filter(info => info !== '오후 & 저녁'))
    }

    useEffect(() => {
        one === true ? countone = countone + 1 : countone = countone - 1;
        two === true ? countone = countone + 1 : countone = countone - 1;
        if ((countone <= 2) && (countone >= 0)) {
            console.log(selectone);
        }
        if (countone > 3) {
            if (selectone[0] === "오전") setOne(false);
            if (selectone[0] === "오후 & 저녁") setTwo(false);
            setSelectone(selectone.slice(1, selectone.length));
            console.log(selectone);
        }
    }, [one, two]);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <Text style={mode.title}>Welcome Blockers</Text>
                    <Text style={[mode.mediumText, {alignSelf: 'center'}]}>Blockers에 오신 것을 환영합니다</Text>
                    <Text style={[mode.mediumText, { marginTop: 12, marginBottom: 30, alignSelf: 'center' }]}>시작하기 전에 회원님의 상태를 선택해주세요.</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        {one === false ?
                            <View>
                                <TouchableOpacity onPressIn={pushone} onPress={() => setOne(!one)}>
                                    <View style={mode.buttonBox}>
                                        <Image source={require('./icon/sun.png')} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030', alignSelf: 'center' }]}>흡연관리</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPressIn={filterone} onPress={() => setOne(!one)}>
                                    <View style={mode.activeButton}>
                                        <Image source={require('./icon/sun.png')} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030', alignSelf: 'center' }]}>흡연관리</Text>
                            </View>
                        }
                        {two === false ?
                            <View>
                                <TouchableOpacity onPressIn={pushtwo} onPress={() => setTwo(!two)}>
                                    <View style={mode.buttonBox}>
                                        <Image source={require('./icon/moon.png')} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030', alignSelf: 'center' }]}>금연관리</Text>
                            </View>
                            :
                            <View>
                                <TouchableOpacity onPressIn={filtertwo} onPress={() => setTwo(!two)}>
                                    <View style={mode.activeButton}>
                                        <Image source={require('./icon/moon.png')} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030', alignSelf: 'center' }]}>금연관리</Text>
                            </View>
                        }
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 32, marginRight: 60, marginLeft: 48, alignItems: 'flex-start'}}>
                        <View style={{width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#303030', marginRight: 20, marginTop: 11}} />
                        <Text style={mode.mediumText}>
                            <Text style={{fontFamily: 'NunitoSans-Bold'}}>흡연관리: </Text>
                            <Text>담배피는 양을 조절하고 천천히 금연하고 싶은 경우</Text>
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 16, marginRight: 60, marginLeft: 48, alignItems: 'flex-start'}}>
                        <View style={{width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#303030', marginRight: 20, marginTop: 11}} />
                        <Text style={mode.mediumText}>
                            <Text style={{fontFamily: 'NunitoSans-Bold'}}>금연관리: </Text>
                            <Text>금연을 하고 있거나 시작하고 싶은 경우</Text>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}