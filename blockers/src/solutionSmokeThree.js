import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import Ionicons from 'react-native-vector-icons/Ionicons';
const adUnitId = __DEV__ ? TestIds.BANNER :(Platform.OS==='ios' ? "ca-app-pub-8262202601779055/7325930870":'ca-app-pub-8262202601779055/8327183632' ) ;

const solution = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        marginLeft: 24,
        marginBottom: 36
    },
    mediumText: {
        fontSize: 18,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030',
        opacity: 0.8
    },
    buttonBox: {
        width: 160,
        height: 160,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        width: 160,
        height: 160,
        borderWidth: 2,
        borderRadius: 17,
        borderColor: '#FFB83D',
        backgroundColor: '#FFFFFF',
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default function SolutionSmokeThree({ navigation,route }) {
    const {UID}=route.params
    const {total}=route.params
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    const [selectone, setSelectone] = useState([]);
    const [selecttwo, setSelecttwo] = useState([]);
    var countone = 2;
    var counttwo = 2;

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

    const pushthree = () => {
        setSelecttwo(selecttwo.concat('아침 첫담배'));
    }

    const filterthree = () => {
        setSelecttwo(selecttwo.filter(info => info !== '아침 첫담배'))
    }

    const pushfour = () => {
        setSelecttwo(selecttwo.concat('그 외'));
    }

    const filterfour = () => {
        setSelecttwo(selecttwo.filter(info => info !== '그 외'))
    }

    useEffect(() => {
        
        one === true ? countone = countone + 1 : countone = countone - 1;
        two === true ? countone = countone + 1 : countone = countone - 1;
        three === true ? counttwo = counttwo + 1 : counttwo = counttwo - 1;
        four === true ? counttwo = counttwo + 1 : counttwo = counttwo - 1;
        if ((countone <= 2) && (countone >= 0)) {
            console.log(selectone);
        } 
        if(countone>3) {
            if(selectone[0]==="오전") setOne(false);
            if(selectone[0]==="오후 & 저녁") setTwo(false);
            setSelectone(selectone.slice(1, selectone.length));
            console.log(selectone);
        }
        if ((counttwo <= 2) && (counttwo >= 0)) {
            console.log(selecttwo);
        } 
        if (counttwo>2) {
            if(selecttwo[0]==="아침 첫담배") setThree(false);
            if(selecttwo[0]==="그 외") setFour(false);
            setSelecttwo(selecttwo.slice(1, selecttwo.length));
            console.log(selecttwo);
        }
        if((counttwo===2)&&(countone===2)) {
            var size
            if(selectone[0]==="오전"&&selecttwo[0]==="아침 첫담배"){
                size=2
            }else if(selectone[0]==="오후 & 저녁"&&selecttwo[0]==="그 외"){
                size=0
            }else{
                size=1
            }
            size=size+total
            setTimeout(() => {
                navigation.navigate('SolutionSmokeResult',{UID:UID,total:size})
            }, 300)
        }
    }, [one, two, three, four]);

    return (
        <>
            <StatusBar  />
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
                    <Text style={solution.largeText}>언제 담배를 더 많이 피우시나요</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        {one === false ?
                            <TouchableOpacity onPressIn={pushone} onPress={() => setOne(!one)}>
                                <View style={solution.buttonBox}>
                                    <Ionicons name="sunny" color="#FFA700" size={95} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030' }]}>오전</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPressIn={filterone} onPress={() => setOne(!one)}>
                                <View style={solution.activeButton}>
                                    <Ionicons name="sunny" color="#FFA700" size={95} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>오전</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {two === false ?
                            <TouchableOpacity onPressIn={pushtwo} onPress={() => setTwo(!two)}>
                                <View style={solution.buttonBox}>
                                    <Ionicons name="moon" color="#F4E100" size={85} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030' }]}>오후 & 저녁</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPressIn={filtertwo} onPress={() => setTwo(!two)}>
                                <View style={solution.activeButton}>
                                    <Ionicons name="moon" color="#F4E100" size={85} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>오후 & 저녁</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={solution.largeText}>담배 맛이 가장 좋을 떄는 언제인가요?</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        {three === false ?
                            <TouchableOpacity onPressIn={pushthree} onPress={() => setThree(!three)}>
                                <View style={solution.buttonBox}>
                                    <Ionicons name="sunny" color="#FFA700" size={95} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030' }]}>아침 첫담배</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPressIn={filterthree} onPress={() => setThree(!three)}>
                                <View style={solution.activeButton}>
                                    <Ionicons name="sunny" color="#FFA700" size={95} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>아침 첫담배</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {four === false ?
                            <TouchableOpacity onPressIn={pushfour} onPress={() => setFour(!four)}>
                                <View style={solution.buttonBox}>
                                    <Ionicons name="moon" color="#F4E100" size={85} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Regular', color: '#303030' }]}>그 외</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPressIn={filterfour} onPress={() => setFour(!four)}>
                                <View style={solution.activeButton}>
                                    <Ionicons name="moon" color="#F4E100" size={85} />
                                    <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>그 외</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
                <BannerAd
      unitId={adUnitId}  
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={(error) => {
        console.error('Advert failed to load: ', error);
      }}
    />
            </SafeAreaView>
        </>
    )
}