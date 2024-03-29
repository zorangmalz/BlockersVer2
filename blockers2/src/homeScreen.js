import React, {useState, useEffect} from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    VirtualizedList,
    TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';

const date = StyleSheet.create({
    viewcontainer: {
        marginTop: 3,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    largedate: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    smalldate: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
});

const resource = StyleSheet.create({
    container : {
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5CC27B'
    },
    smallText : {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default function HomeScreen({navigation}) {
    const DATA=[];
    const num = 1;
    const [month, setMonth] = useState('00');
    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();
    const [timestart, setTimestart] = useState(false);
    const [viewopacity, setViewOpacity] = useState(true);
    const [startButton, setStartButton] = useState(false);

    const onButtonStart = () => {
        setTimestart(true);
        console.log(timestart)
    }

    var days = 0;
    var hours = 0;
    var mins = 0;
    var secs = 0;
    /** 
    useEffect(() => {
        let timer = setInterval(function () {
                console.log("참")
                secs = secs + 1;
                if (secs === 59) {
                    mins = mins + 1;
                    secs = 0;
                }
                if (mins === 60) {
                    hours = hours + 1;
                    mins = 0;
                }
                if (hours === 24) {
                    days = days + 1;
                    hours = 0;
                }
                setDay(days);
                setHour(hours);
                setMin(mins);
                setSec(days);
            
            if (timestart === false) {
                clearInterval(timer);
                setDay(0);
                setHour(0);
                setMin(0);
                setSec(0);
            }
        }, 1000);
        return () => {

        }
    }, [timestart]);
    */

    const onButtonClear = () => {
        setTimestart(false);
        console.log("클릭되었습니다");
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor:'#FFFFFF', flex:1}}>
                <View accessibilityRole="header" style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, width: "100%", paddingLeft: "4%", paddingRight: "4%"}}>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: "flex-start",
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ fontWeight: '100', color: '#979797' }}>Hello,</Text>
                            <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}> Blockers</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={require('./icon/alram.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{marginBottom: 70}}>
                    <Swiper dotStyle={{ borderColor: '#5CC27B', borderWidth: 1, backgroundColor: '#FFFFFF' }} activeDotColor='#5CC27B' style={{ height: 250 }}>
                        {startButton ?
                            <View style={{marginTop: 15, width: "100%"}}>
                                <Text style={{alignSelf:'center', fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>Verification Period({month}/{day}~{month}/{day+2})</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image resizeMode="contain" source={require('./icon/checkred.png')} />
                                        </View>
                                        <Text style={{ marginTop: 4, fontSize: 14 }}>1st</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image resizeMode="contain" source={require('./icon/checkred.png')} />
                                        </View>
                                        <Text style={{ marginTop: 4, fontSize: 14 }}>2nd</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B' }} />
                                        <Text style={{marginTop:4, fontSize: 14}}>3rd</Text>
                                    </View>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{ borderWidth: 3, width: 48, height: 48, borderColor: '#5CC27B' }} />
                                        <Text style={{marginTop:4, fontSize: 14}}>Final</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }} onPress={()=>{navigation.navigate('Verification')}}>
                                    <View style={{ backgroundColor: '#5CC27B', width: 100, borderRadius: 20, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>인증하기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Start your Smoking Cessation With </Text>
                                    <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}>Blockers</Text>
                                </Text>
                                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setStartButton(true)}>
                                    <View style={{ backgroundColor: '#5CC27B', width: 100, borderRadius: 20, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ffffff', fontWeight:'bold' }}>시작하기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <View>
                            {viewopacity === true ?
                                <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={() => {
                                    setViewOpacity(false);
                                    setTimestart(true);
                                    console.log(timestart);
                                }}>
                                    <View style={{
                                        width: "100%",
                                        zIndex: 1,
                                        position: 'absolute',
                                        height: 200,
                                        backgroundColor: '#000000',
                                        opacity: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} >
                                        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>터치해서 금연 시작하기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <View />
                            }
                            <View style={{ zIndex: 0, marginTop: 15 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('초기화')} style={{ alignItems: 'center'}}>
                                    <Text style={{ fontSize: 12, textDecorationLine: 'underline', alignSelf: 'flex-end', paddingRight: 20, marginBottom: 10 }}>Reset</Text>
                                </TouchableOpacity>
                                <View style={{
                                    backgroundColor: '#5CC27B',
                                    marginRight: 20,
                                    marginLeft: 20,
                                    height: 64,
                                    borderRadius: 30
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <View style={date.viewcontainer}>
                                            <Text style={date.largedate}>{day}</Text>
                                            <Text style={date.smalldate}>days</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 32 }}>
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        </View>
                                        <View style={date.viewcontainer}>
                                            <Text style={date.largedate}>{hour}</Text>
                                            <Text style={date.smalldate}>hours</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 32 }}>
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        </View>
                                        <View style={date.viewcontainer}>
                                            <Text style={date.largedate}>{min}</Text>
                                            <Text style={date.smalldate}>minutes</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', height: 32 }}>
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                            <View style={{ width: 3, height: 3, backgroundColor: '#FFFFFF' }} />
                                        </View>
                                        <View style={date.viewcontainer}>
                                            <Text style={date.largedate}>{sec}</Text>
                                            <Text style={date.smalldate}>seconds</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                                    <View style={resource.container}>
                                        <Text style={resource.smallText}>얼마나 안폈지?</Text>
                                        <Text style={resource.largeText}>1,000 대</Text>
                                    </View>
                                    <View style={resource.container}>
                                        <Text style={resource.smallText}>얼마나 아꼈지?</Text>
                                        <Text style={resource.largeText}>225,000 원</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Swiper>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 18 }}>
                        <Image source={require('./icon/lightbulb.png')} />
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 금연을 시작하고 건강 정보를 받아가세요</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginTop: 32,
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                            <Image source={require('./icon/calendar.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('./icon/chatbot.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 17,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{maxWidth: 300}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: 30,
                                paddingBottom: 5,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Challenge {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontWeight: 'normal' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 40, marginRight: 20 }} onPress={()=> navigation.navigate('Challenge')}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingTop: 17,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }}>
                        <View style={{maxWidth: 300}}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: 30,
                                paddingBottom: 5,
                                paddingLeft: 14,
                                paddingRight: 14
                            }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB83D' }} />
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Mission {num}</Text>
                            </View>
                            <Text style={{ marginLeft: 32 }}>
                                <Text style={{ fontSize: 14, color: '#979797', fontWeight: 'normal' }}>180 days Smoking Cessation Challenge with</Text>
                                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}> Blockers</Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 40, marginRight: 20 }} onPress={()=> navigation.navigate('Mission')}>
                            <View style={{ borderColor: '#5CC27B', width: 80, height: 30, borderRadius: 15, borderWidth: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'normal' }}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}