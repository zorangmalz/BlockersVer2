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
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER :(Platform.OS==='ios' ? "ca-app-pub-8771472802759230/9484403934":'ca-app-pub-8771472802759230/7951846321' ) ;

const solution = StyleSheet.create({
    largeText: {
        fontSize: 20,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
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

export default function SolutionSmoke({ navigation,route }) {
    const {UID}=route.params
    const [ten, setTen] = useState(false);
    const [twenty, setTwenty] = useState(false);
    const [thirty, setThirty] = useState(false);
    const [forty,setForty]=useState(false);
    const [select, setSelect] = useState([]);
    const [clear, setClear] = useState(false);
    var count = 3;

    const pushten = () => {
        setSelect(select.concat('0~10 개피'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne',{UID:UID,total:0});
        }, 200)
    }

    const filterten = () => {
        setSelect(select.filter(info => info !== '0~10 개피'))
    }

    const pushtwenty = () => {
        setSelect(select.concat('11~20 개피'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne',{UID:UID,total:1});;
        }, 200)
    }

    const filtertwenty = () => {
        setSelect(select.filter(info => info !== '11~20 개피'))
    }

    const pushthirty = () => {
        setSelect(select.concat('20~30 개피'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne',{UID:UID,total:2});
        }, 200)
    }

    const filterthirty = () => {
        setSelect(select.filter(info => info !== '20~30 개피'))
    }

    const pushforty = () => {
        setSelect(select.concat('30개피 이상'));
        setTimeout(() => {
            navigation.navigate('SolutionSmokeOne',{UID:UID,total:3});
        }, 200)
    }

    const filterforty = () => {
        setSelect(select.filter(info => info !== '30개피 이상'))
    }

    useEffect(() => {
        ten === true ? count = count + 1 : count = count - 1;
        twenty === true ? count = count + 1 : count = count - 1;
        thirty === true ? count = count + 1 : count = count - 1;
        forty === true ? count = count + 1 : count = count - 1;
        if ((count <= 2) && (count >= 0)) {
            setClear(true);
            console.log(select)
        } else {
            if(select[0]==="0~10 개피") setTen(false);
            if(select[0]==="11~20 개피") setTwenty(false);
            if(select[0]==="20~30 개피") setThirty(false);
            if(select[0]==="30개피 이상") setForty(false);
            setSelect(select.slice(1, select.length));
            console.log(select);
            setClear(false);
        }
    }, [ten, twenty, thirty,forty]);

    return (
        <>
            <StatusBar barStyle="default" />
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
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>0~10 개피</Text>
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
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>11~20 개피</Text>
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
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>20~30 개피</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterthirty} onPress={()=>setThirty(!thirty)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>20~30 개피</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {forty === false ?
                        <TouchableOpacity onPressIn={pushforty} onPress={()=>setForty(!forty)}>
                            <View style={solution.buttonBox}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#303030' }]}>30개피 이상</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPressIn={filterforty} onPress={()=>setForty(!forty)}>
                            <View style={solution.activeButton}>
                                <Text style={[solution.mediumText, { fontFamily: 'NunitoSans-Bold', color: '#FFFFFF' }]}>30개피 이상</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    
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