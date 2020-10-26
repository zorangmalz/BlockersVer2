import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Clipboard from "@react-native-community/clipboard";

import Ionicons from 'react-native-vector-icons/Ionicons';

import CaverExtKAS from "caver-js-ext-kas";

const style = StyleSheet.create({
    bigbox: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#ffffff',

        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingBottom: 24,
        paddingLeft: 14.5,
        paddingRight: 14.5
    }
})

export default function Transaction({ navigation }) {
    
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();
    const [third, setThird] = useState();
    const list = [
        {
            type: "receive",
            number: 3,
            text: "Receive KRAB CARD"
        },
        {
            type: "receive",
            number: 2,
            text: "Receive 40 KRAB"
        },
        {
            type: "send",
            number: 1,
            text: "Send 10 Klay"
        }
    ];
    const [copiedText, setCopiedText] = useState('')
  async function search(){
    
    const cavers=new CaverExtKAS()
    cavers.initKASAPI(1001,"KASK799VQ5VDG5O2WJ8KGWZZ","7hE6dzkae0jz+4TjqD8JtKOnsdY4h0Vg/oKY9sl6")

    const query = {
        
        size:5,
        caFilter: "0x3c3Ce9E395B8B7Ca50c5f6BAae983c8ea40630b9",
    }
    const result = await cavers.kas.tokenHistory.getTransferHistoryByAccount('0x10dAa2D245AB7f9CD388eAA38434a2aA0776d03b', query)
    console.log(result)
  }
  useEffect(()=>{
      search()
  })
    const copyToClipboard = () => {
        Clipboard.setString('hello world')
    }
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            </SafeAreaView>
            <SafeAreaView>
                <View accessibilityRole="header" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center",
                    height: 50,
                    backgroundColor: '#ffffff',
                    width: "100%",
                    paddingLeft: "5%",
                    paddingRight: "5%"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-outline" size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Transaction</Text>
                    <View />
                </View>
                <ScrollView>
                    <View style={{ marginTop: 16, width: "100%", marginBottom: 16 }}>
                        <View style={{
                            alignItems: 'flex-start',
                            borderBottomColor: '#D2D3D3',
                            borderBottomWidth: 1,
                            marginBottom: 8,
                            width: "100%"
                        }}>
                            <Text style={{
                                fontFamily: 'Metropolis-Bold',
                                fontSize: 14,
                                color: '#202426',
                                marginBottom: 8
                            }}>Transaction</Text>
                            <Text style={{
                                fontFamily: 'Metropolis-Regular',
                                fontSize: 12,
                                color: '#202426',
                                marginBottom: 8
                            }}>{first}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", marginBottom: 8 }}>
                                <Text style={{
                                    fontFamily: 'Metropolis-Bold',
                                    fontSize: 12,
                                    color: '#78e185'
                                    // "#e78276",
                                }}>Received Krab Card</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 16, width: "100%" }}>
                        <View style={{
                            alignItems: 'flex-start',
                            borderBottomColor: '#D2D3D3',
                            borderBottomWidth: 1,
                            marginBottom: 8,
                            width: "100%"
                        }}>
                            <Text style={{
                                fontFamily: 'Metropolis-Bold',
                                fontSize: 14,
                                color: '#202426',
                                marginBottom: 8
                            }}>Transaction</Text>
                            <Text style={{
                                fontFamily: 'Metropolis-Regular',
                                fontSize: 12,
                                color: '#202426',
                                marginBottom: 8
                            }}>{second}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", marginBottom: 8 }}>

                                <Text style={{
                                    fontFamily: 'Metropolis-Bold',
                                    fontSize: 12,
                                    color: '#78e185'
                                    // "#e78276",
                                }}>Received Krab Token</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 16, width: "100%" }}>
                        <View style={{
                            alignItems: 'flex-start',
                            borderBottomColor: '#D2D3D3',
                            borderBottomWidth: 1,
                            marginBottom: 8,
                            width: "100%"
                        }}>
                            <Text style={{
                                fontFamily: 'Metropolis-Bold',
                                fontSize: 14,
                                color: '#202426',
                                marginBottom: 8
                            }}>Transaction</Text>
                            <Text style={{
                                fontFamily: 'Metropolis-Regular',
                                fontSize: 12,
                                color: '#202426',
                                marginBottom: 8
                            }}>{third}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", marginBottom: 8 }}>
                                <Text style={{
                                    fontFamily: 'Metropolis-Bold',
                                    fontSize: 12,
                                    color: "#e78276"
                                    // "#e78276",
                                }}>Send 1 Klay</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontFamily: 'Metropolis-Regular',
                        fontSize: 14,
                        color: '#202426',
                        opacity: 0.6,
                        alignSelf: 'center'
                    }}>Powerd by Klaytn</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}