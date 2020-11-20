import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1011958477260123/9244108660';

const HEIGHT = Dimensions.get("window").height;

export default function SolutionMain({navigation,route}) {
    const {UID}=route.params

    const solution = StyleSheet.create({
        largeText: {
            fontSize: 16,
            fontFamily: 'NunitoSans-Bold',
            color: '#303030',
            marginLeft: "8%",
            marginBottom: 50,
            marginTop: 28,
            marginRight: 24
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
            borderColor: '#5CC27B',
            marginLeft: 38,
            marginRight: 38,
            marginBottom: HEIGHT * 0.024,
            justifyContent: 'center',
            alignItems: 'center',
        },
        activeButton: {
            width: "80%",
            height: 50,
            borderRadius: 28,
            backgroundColor: '#5CC27B',
            marginLeft: 38,
            marginRight: 38,
            marginBottom: HEIGHT * 0.024,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    const title = "니코틴 중독 정도를 파악하고 \n 맞춤 금연전략을 세워보세요";

    return (
        <>
            <StatusBar barStyle="light-content" />
            
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: "center", height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", backgroundColor: '#ffffff' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 20
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>니코틴 중독 평가</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={[solution.largeText, {marginBottom: HEIGHT * 0.07, lineHeight: 30}]}>{title}</Text>
                  
                    
                </ScrollView>

            </SafeAreaView>
            <SafeAreaView style={{ flex: 0 }}>
  
    
                <TouchableOpacity onPress={() => navigation.navigate("SolutionSmoke",{UID:UID})}>
                    <View style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: '#5cc27b',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Bold' }}>시작하기</Text>
                    </View>
                </TouchableOpacity>
                
            </SafeAreaView>
            
        </>
    )
}