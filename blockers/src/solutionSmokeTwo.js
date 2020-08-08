import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const solution = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B',
        marginLeft: 24,
        marginBottom: 50
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.8
    },
    buttonBox: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#000000',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        backgroundColor: '#FFB83D',
        marginLeft: 38,
        marginRight: 38,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function SolutionSmokeTwo({ navigation }) {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    var count = 4;

    const pushone = () => {
        setSelect(select.concat('5분 이내'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeThree');
        }, 200)
    }

    const filterone = () => {
        setSelect(select.filter(info => info !== '5분 이내'))
    }

    const pushtwo = () => {
        setSelect(select.concat('30분 이내'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeThree');
        }, 200)
    }

    const filtertwo = () => {
        setSelect(select.filter(info => info !== '30분 이내'))
    }

    const pushthree = () => {
        setSelect(select.concat('1시간 이내'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeThree');
        }, 200)
    }

    const filterthree = () => {
        setSelect(select.filter(info => info !== '1시간 이내'))
    }

    const pushfour = () => {
        setSelect(select.concat('1시간 이후'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeThree');
        }, 200)
    }

    const filterfour = () => {
        setSelect(select.filter(info => info !== '1시간 이후'))
    }

    useEffect(() => {
        one === true ? count = count + 1 : count = count - 1;
        two === true ? count = count + 1 : count = count - 1;
        three === true ? count = count + 1 : count = count - 1;
        four === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if(select[0]==="0~10 개피") setOne(false);
            if(select[0]==="11~20 개피") setTwo(false);
            if(select[0]==="20개피 이상") setThree(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [one, two, three, four]);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: "100%", paddingLeft: "5%", paddingRight: "5%", marginBottom: 12 }}>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: "flex-start",
                            alignItems: 'center',
                        }}
                    >
                        
                    </View>
                </View>
                <ScrollView>
                    <Text style={solution.largeText}>아침 일어나 언제 담배를 피우시나요?</Text>
                    {one === false ?
                        <TouchableOpacity onPressIn={pushone} onPress={()=>setOne(!one)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>5분 이내</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterone} onPress={()=>setOne(!one)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>5분 이내</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {two === false ?
                        <TouchableOpacity onPressIn={pushtwo} onPress={()=>setTwo(!two)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>30분 이내</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwo} onPress={()=>setTwo(!two)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>30분 이내</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {three === false ?
                        <TouchableOpacity onPressIn={pushthree} onPress={()=>setThree(!three)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>1시간 이내</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthree} onPress={()=>setThree(!three)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>1시간 이내</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {four === false ?
                        <TouchableOpacity onPressIn={pushfour} onPress={()=>setFour(!four)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>1시간 이후</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterfour} onPress={()=>setFour(!four)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>1시간 이후</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}