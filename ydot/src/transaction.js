import React, {useState,useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';

const style = StyleSheet.create({
    bigbox: {
        width: '90%',
        height: 700,
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
    const ref = firestore().collection('Ydot');
    const [first,setFirst]=useState();
    const [second,setSecond]=useState();
    const [third,setThird]=useState();

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
    useEffect(()=>{
        async function load(){
        firestore().collection("Ydot").doc("abcd").get().then(documentSnapshot=>{
            setFirst(documentSnapshot.data().first)
            setSecond(documentSnapshot.data().second)
            setThird(documentSnapshot.data().third)
        })
        console.log(first,second,third)
    }
    load()
    },[])
    const copyToClipboard = () => {
        Clipboard.setString('hello world')
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View accessibilityRole="header" style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: 87,
                    paddingBottom: 14,
                    backgroundColor: '#ffffff',
                    width: "100%",
                    paddingLeft: "5%",
                    paddingRight: "5%"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 4 }}>
                        <Image source={require('./icon/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Metropolis-Bold', color: '#161513', fontSize: 20 }}>Transaction</Text>
                    <View />
                </View>
                <ScrollView>
                    
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