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
        color: '#303030',
        opacity: 0.8
    },
    buttonBox: {
        width: "80%",
        height: 50,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#999999',
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

export default function SolutionSmokeOne({ navigation }) {
    const [yesone, setyesone] = useState(false);
    const [noone, setnoone] = useState(false);
    const [yestwo, setyestwo] = useState(false);
    const [notwo, setnotwo] = useState(false);
    const [selectone, setSelectone] = useState([]);
    const [selecttwo, setSelecttwo] = useState([]);
    var countone = 2;
    var counttwo = 2;

    const pushyesone = () => {
        setSelectone(selectone.concat('네원'));
    }

    const filteryesone = () => {
        setSelectone(selectone.filter(info => info !== '네원'))
    }

    const pushnoone = () => {
        setSelectone(selectone.concat('아니오원'))
    }

    const filternoone = () => {
        setSelectone(selectone.filter(info => info !== '아니오원'))
    }

    const pushyestwo = () => {
        setSelecttwo(selecttwo.concat('네투'))
    }

    const filteryestwo = () => {
        setSelecttwo(selecttwo.filter(info => info !== '네투'))
    }
    const pushnotwo = () => {
        setSelecttwo(selecttwo.concat('아니오투'))
    }

    const filternotwo = () => {
        setSelecttwo(selecttwo.filter(info => info !== '아니오투'))
    }

    useEffect(() => {
        yesone === true ? countone = countone + 1 : countone = countone - 1;
        noone === true ? countone = countone + 1 : countone = countone - 1;
        yestwo === true ? counttwo = counttwo + 1 : counttwo = counttwo - 1;
        notwo === true ? counttwo = counttwo + 1 : counttwo = counttwo - 1;
        if ((countone <= 2) && (countone >= 0)) {
            console.log(selectone);
        } 
        if(countone>3) {
            if(selectone[0]==="네원") setyesone(false);
            if(selectone[0]==="아니오원") setnoone(false);
            setSelectone(selectone.slice(1, selectone.length));
            console.log(selectone);
        }
        if ((counttwo <= 2) && (counttwo >= 0)) {
            console.log(selecttwo);
        } 
        if (counttwo>2) {
            if(selecttwo[0]==="네투") setyestwo(false);
            if(selecttwo[0]==="아니오투") setnotwo(false);
            setSelecttwo(selecttwo.slice(1, selecttwo.length));
            console.log(selecttwo);
        }
        if((counttwo===2)&&(countone===2)) {
            setTimeout(() => {
                navigation.navigate('SolutionSmokeTwo')
            }, 300)
        }
    }, [yesone, noone, yestwo, notwo]);

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
                        <Text style={{ fontSize: 24, fontFamily: 'NunitoSans-Regular' }}>
                            
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={solution.largeText}>금연구역에서 담배를 참기 어려운가요?</Text>
                    {yesone === false ?
                        <TouchableOpacity onPressIn={pushyesone} onPress={()=>setyesone(!yesone)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>네</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filteryesone} onPress={()=>setyesone(!yesone)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>네</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {noone === false ?
                        <TouchableOpacity onPressIn={pushnoone} onPress={()=>setnoone(!noone)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>아니오</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filternoone} onPress={()=>setnoone(!noone)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>아니오</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <Text style={[solution.largeText, {marginTop: 20}]}>몸이 아파도 담배를 피우시나요?</Text>
                    {yestwo === false ?
                        <TouchableOpacity onPressIn={pushyestwo} onPress={()=>setyestwo(!yestwo)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>네</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filteryestwo} onPress={()=>setyestwo(!yestwo)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>네</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {notwo === false ?
                        <TouchableOpacity onPressIn={pushnotwo} onPress={()=>setnotwo(!notwo)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>아니오</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filternotwo} onPress={()=>setnotwo(!notwo)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>아니오</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}