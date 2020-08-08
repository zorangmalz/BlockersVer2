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

export default function SolutionSmoke({ navigation }) {
    const [ten, setTen] = useState(false);
    const [twenty, setTwenty] = useState(false);
    const [thirty, setThirty] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    var count = 3;

    const pushten = () => {
        setSelect(select.concat('0~10 개피'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne');
        }, 200)
    }

    const filterten = () => {
        setSelect(select.filter(info => info !== '0~10 개피'))
    }

    const pushtwenty = () => {
        setSelect(select.concat('11~20 개피'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne');
        }, 200)
    }

    const filtertwenty = () => {
        setSelect(select.filter(info => info !== '11~20 개피'))
    }

    const pushthirty = () => {
        setSelect(select.concat('20개피 이상'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne');
        }, 200)
    }

    const filterthirty = () => {
        setSelect(select.filter(info => info !== '20개피 이상'))
    }

    useEffect(() => {
        ten === true ? count = count + 1 : count = count - 1;
        twenty === true ? count = count + 1 : count = count - 1;
        thirty === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if(select[0]==="0~10 개피") setTen(false);
            if(select[0]==="11~20 개피") setTwenty(false);
            if(select[0]==="20개피 이상") setThirty(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [ten, twenty, thirty]);

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
                    <Text style={solution.largeText}>하루에 담배를 몇 개피 피우시나요?</Text>
                    {ten === false ?
                        <TouchableOpacity onPressIn={pushten} onPress={()=>setTen(!ten)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>0~10 개피</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterten} onPress={()=>setTen(!ten)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>0~10 개피</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {twenty === false ?
                        <TouchableOpacity onPressIn={pushtwenty} onPress={()=>setTwenty(!twenty)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>11~20 개피</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwenty} onPress={()=>setTwenty(!twenty)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>11~20 개피</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {thirty === false ?
                        <TouchableOpacity onPressIn={pushthirty} onPress={()=>setThirty(!thirty)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>20개피 이상</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={()=>setThirty(!thirty)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>20개피 이상</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <TextInput placeholder="Ex) 30" placeholderTextColor="#707070" style={{width: '50%', height: 50, paddingBottom: 8, borderBottomColor: '#000000', borderBottomWidth: 1, fontSize: 21, fontFamily: 'NunitoSans-Bold', color: '#707070', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}