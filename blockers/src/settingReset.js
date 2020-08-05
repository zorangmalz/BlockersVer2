import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { set } from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


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

export default function SettingReset({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [stress, setStress] = useState(false);
    const [symptom, setSymptom] = useState(false);
    const [environ, setEnviron] = useState(false);
    const [habit, setHabit] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [user, setUser] = useState();
    const [uid,setuid]=useState();
    const [initializing, setInitializing] = useState(true);
    var count = 4;

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

    function onAuthStateChanged(users) {
        setUser(users);
        
        if (initializing) setInitializing(false);
      }
      const ref=firestore().collection("UserInfo");

    async function reset(){
        setModalVisible(false)
        if(user){
            await ref.doc(uid).update({
                SmokingTime:""
              })
        }
        navigation.navigate("ResetComplete")
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;

    useEffect(() => {
        stress === true ? count = count + 1 : count = count - 1;
        symptom === true ? count = count + 1 : count = count - 1;
        environ === true ? count = count + 1 : count = count - 1;
        habit === true ? count = count + 1 : count = count - 1;
        if ((count <= 4) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if(select[0]==="스트레스") setStress(false);
            if(select[0]==="금단증상") setSymptom(false);
            if(select[0]==="주변환경") setEnviron(false);
            if(select[0]==="습관") setHabit(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [stress, symptom, environ, habit]);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView style={{ marginBottom: 70, paddingTop: 32 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                    >
                        <View style={{ position: 'absolute', top: "33%", justifyContent: 'space-between', borderColor: '#000000', borderWidth: 1, borderRadius: 10, alignSelf: 'center', width: 250, height: 170, alignItems: 'center', backgroundColor: '#ffffff' }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: 'NunitoSans-Bold',
                                marginTop: 20
                            }}>초기화 하시겠습니까?</Text>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: 'NunitoSans-Regular'
                                }}>챌린지를 진행중인 경우</Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: 'NunitoSans-Regular'
                                }}>자동으로 포기하게 됩니다.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderLeftWidth: 1, borderRightWidth: 0.5, borderBottomLeftRadius: 10, borderTopWidth: 1 }} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', width: 125, height: 40, borderColor: '#000000', borderRightWidth: 1, borderLeftWidth: 0.5, borderBottomRightRadius: 10, borderTopWidth: 1 }} 
                                onPress={
                                    reset
                                }>
                                    <Text>초기화</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Text style={setting.largeText}>금연에 실패하셨나요?</Text>
                    <Text style={[setting.mediumText, { marginLeft: 48, marginBottom: 8 }]}>다음 도전을 도와드리기 위해</Text>
                    <Text style={[setting.mediumText, { marginLeft: 48, marginBottom: 32 }]}>실패한 이유를 말씀해주세요.(최대 2개)</Text>
                    {stress === false ?
                        <TouchableOpacity onPressIn={pushstress} onPress={()=>setStress(!stress)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>스트레스</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterstress} onPress={()=>setStress(!stress)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>스트레스</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {symptom === false ?
                        <TouchableOpacity onPressIn={pushsymptom} onPress={()=>setSymptom(!symptom)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>금단증상</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtersymptom} onPress={()=>setSymptom(!symptom)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>금단증상</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {environ === false ?
                        <TouchableOpacity onPressIn={pushenviron} onPress={()=>setEnviron(!environ)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>주변환경</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterenviron} onPress={()=>setEnviron(!environ)}>
                            <View style={setting.activeButton}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>주변환경</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {habit === false ?
                        <TouchableOpacity onPressIn={pushhabit} onPress={() => setHabit(!habit)}>
                            <View style={setting.buttonBox}>
                                <Text style={[setting.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#000000' }]}>습관</Text>
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
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => setModalVisible(true)}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>초기화</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}