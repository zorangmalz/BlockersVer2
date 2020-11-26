import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";

const setting = StyleSheet.create({
    largeText: {
        fontSize: 24,
        fontFamily: 'NunitoSans-Bold',
        color: '#5CC27B',
        marginLeft: 32,
        marginBottom: 16
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

export default function SettingReset({ navigation }) {
    const AlertButton = () => {
        Alert.alert(
            "초기화 하시겠습니까?",
            "금연 시계가 초기화됩니다.",
            [
                {
                    text: "취소",
                    onPress: () => console.log("Cancel"),
                },
                { text: "확인", onPress: () => reset() }
            ]
        )
    }
    const [stress, setStress] = useState(false);
    const [symptom, setSymptom] = useState(false);
    const [environ, setEnviron] = useState(false);
    const [habit, setHabit] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
    const [fullTime,setFullTime]=useState();

    var count = 4;
    const ref = firestore().collection("UserInfo");

    const pushstress = () => {
        setSelect(select.concat('스트레스'))
    }

    const filterstress = () => {
        setSelect(select.filter(info => info !== '스트레스'))
    }

    const pushsymptom = () => {
        setSelect(select.concat('금단증상'))
    }

    const filtersymptom = () => {
        setSelect(select.filter(info => info !== '금단증상'))
    }

    const pushenviron = () => {
        setSelect(select.concat('주변환경'))
    }

    const filterenviron = () => {
        setSelect(select.filter(info => info !== '주변환경'))
    }

    const pushhabit = () => {
        setSelect(select.concat('습관'))
    }

    const filterhabit = () => {
        setSelect(select.filter(info => info !== '습관'))
    }
    async function reset() {
        var a = moment().toArray()
        if(a[1]===12){
            a[1]=1
            a[0]=a[0]+1
        }else{
            a[1]=a[1]+1
        }
        var b=fullTime
        var c = (b.diff(a, "seconds")) * -1
        updateAndReset(a,c)
            
    }
    async function updateAndReset(a,c){
        
        await ref.doc(user.uid).update({
            SmokingTime: "",
            failedReason:firebase.firestore.FieldValue.arrayUnion(a+"/"+select+"/"+c)
        })
    
    navigation.navigate("ResetComplete")
    }
    useEffect(() => {
        if(user){
        ref.doc(user.uid).get().then(document=>{
            setFullTime(moment(document.data().SmokingTime))
        })}

        stress === true ? count = count + 1 : count = count - 1;
        symptom === true ? count = count + 1 : count = count - 1;
        environ === true ? count = count + 1 : count = count - 1;
        habit === true ? count = count + 1 : count = count - 1;
        if ((count <= 4) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if (select[0] === "스트레스") setStress(false);
            if (select[0] === "금단증상") setSymptom(false);
            if (select[0] === "주변환경") setEnviron(false);
            if (select[0] === "습관") setHabit(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [stress, symptom, environ, habit,user]);

    function onAuthStateChanged(users) {
        setUser(users);

        if (initializing) setInitializing(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    if (initializing) return null;
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>초기화</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ marginBottom: 70, paddingTop: 32 }}>
                    <Text style={setting.largeText}>금연에 실패하셨나요?</Text>
                    <Text style={[setting.mediumText, { marginLeft: 48, marginBottom: 8 }]}>다음 도전을 도와드리기 위해</Text>
                    <Text style={[setting.mediumText, { marginLeft: 48, marginBottom: 32 }]}>실패한 이유를 말씀해주세요.(최대 2개)</Text>
                    {stress === false ?
                        <TouchableOpacity onPressIn={pushstress} onPress={() => setStress(!stress)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>스트레스</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterstress} onPress={() => setStress(!stress)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>스트레스</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {symptom === false ?
                        <TouchableOpacity onPressIn={pushsymptom} onPress={() => setSymptom(!symptom)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>금단증상</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtersymptom} onPress={() => setSymptom(!symptom)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>금단증상</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {environ === false ?
                        <TouchableOpacity onPressIn={pushenviron} onPress={() => setEnviron(!environ)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>주변환경</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterenviron} onPress={() => setEnviron(!environ)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>주변환경</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {habit === false ?
                        <TouchableOpacity onPressIn={pushhabit} onPress={() => setHabit(!habit)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>습관</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterhabit} onPress={() => setHabit(!habit)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>습관</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={{flex: 0}}>
                <TouchableOpacity onPress={select.length > 0 ? AlertButton : () => console.log("실패요인을 입력해주세요")}>
                    <View style={{ width: "100%", height: 60, backgroundColor: select.length > 0 ? '#5cc27b' : '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>초기화</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}