import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const mode = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8,
        marginLeft: "10%",
        marginBottom: 32,
        marginTop: 32
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

export default function ModeSelectNonSmoker({navigation}) {
    const [ten, setTen] = useState(false);
    const [num, setNum] = useState('');
    const [twenty, setTwenty] = useState(false);
    const [several, setSeveral] = useState('');
    const [mg, setMg] = useState('');
    const [thirty, setThirty] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [user,setUser]=useState();

    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            setUser(userAuth)
        })

    }, [])

    var count = 3;

    const pushten = () => {
        setSelect(select.concat("일반담배"));
    }

    const filterten = () => {
        setSelect(select.filter(info => info !== '일반담배'))
    }

    const pushtwenty = () => {
        setSelect(select.concat('전자담배(JULL, VAPE)'));
    }

    const filtertwenty = () => {
        setSelect(select.filter(info => info !== '전자담배(JULL, VAPE)'))
    }

    const pushthirty = () => {
        setSelect(select.concat('궐련형 담배(IQOS, LIL)'));
    }

    const filterthirty = () => {
        setSelect(select.filter(info => info !== '궐련형 담배(IQOS, LIL)'))
    } 

    useEffect(() => {
        ten === true ? count = count + 1 : count = count - 1;
        twenty === true ? count = count + 1 : count = count - 1;
        thirty === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if(select[0]==="일반담배") setTen(false);
            if(select[0]==="전자담배(JULL, VAPE)") setTwenty(false);
            if(select[0]==="궐련형 담배(IQOS, LIL)") setThirty(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [ten, twenty, thirty]);

    async function move(){
        if(ten==true){
            updateInfo(user.uid,select,num,0)
        }else if(twenty==true){
            updateInfo(user.uid,select,several,mg)
        }else if(thirty==true){
            
            updateInfo(user.uid,select,num2,0)
        }   
            }
        
            const ref=firestore().collection("UserInfo");
            async function updateInfo(code,state,amount,mg){
              await ref.doc(code).update({
                  smokeInfo:state,
                  smokingAmount:amount,
                  smokingMg:mg
              })
          navigation.navigate("Home")
            }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView>
                    <Text style={mode.largeText}>어떤 종류의 담배를 피우셨었나요?</Text>
                    {ten === false ?
                        <TouchableOpacity onPressIn={pushten} onPress={()=>setTen(!ten)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterten} onPress={()=>setTen(!ten)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>일반담배</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {twenty === false ?
                        <TouchableOpacity onPressIn={pushtwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filtertwenty} onPress={() => setTwenty(!twenty)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>전자담배(JULL, VAPE)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {thirty === false ?
                        <TouchableOpacity onPressIn={pushthirty} onPress={() => setThirty(!thirty)}>
                            <View style={mode.buttonBox}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={() => setThirty(!thirty)}>
                            <View style={mode.activeButton}>
                                <Text style={[mode.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>궐련형 담배(IQOS, LIL)</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {ten === true ?
                        <>
                            <Text style={[mode.largeText, { marginBottom: 0 }]}>하루에 담배를 몇 개피 피우셨었나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0
                                }}
                                    value={num}
                                    onChangeText={text => setNum(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>개피</Text>
                            </View>
                        </>
                        :
                        <View />
                    }
                    {twenty === true ? 
                        <>
                            <Text style={[mode.largeText, { marginBottom: 0 }]}>한번 필때 몇번의 흡입을 하셨나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width:100
                                    
                                }} 
                                    value={several}
                                    onChangeText={text => setSeveral(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>번</Text>
                            </View>
                            <Text style={[mode.largeText, { marginBottom: 0 }]}>액상에 몇 mg의 니코틴을 넣으시나요?</Text>
                            <View style={{
                                width: "35%",
                                height: 50,
                                borderBottomColor: '#5cc27b',
                                borderBottomWidth: 2,
                                alignSelf: 'flex-end',
                                marginRight: '10%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row'
                            }}>
                                <TextInput keyboardType="numeric" style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular',
                                    paddingBottom: 0,
                                    width:100
                                }} 
                                    value={mg}
                                    onChangeText={text => setMg(text)}
                                />
                                <Text style={{
                                    fontSize: 21,
                                    color: '#303030',
                                    fontFamily: 'NunitoSans-Regular'
                                }}>mg</Text>
                            </View>
                        </>
                        :
                        <View />
                    }
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    {ten === true ?
                        num.length > 0 ?
                        <TouchableOpacity onPress={move}>
                            <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                            </View>
                            </TouchableOpacity>
                            :
                            <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                            </View>

                        :
                        twenty === true ?
                            (mg.length > 0) && (several.length > 0) ?
                            <TouchableOpacity onPress={move}>
                                <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                                </TouchableOpacity>
                                :
                                <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                            :
                            thirty === true ?
                            <TouchableOpacity onPress={move}>
                                <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                                </TouchableOpacity>
                                :
                                <View style={{ width: "100%", height: 60, backgroundColor: '#c6c6c6', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#ffffff' }}>확인</Text>
                                </View>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}