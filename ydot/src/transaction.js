import React, {useState} from 'react';
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

const style = StyleSheet.create({
    bigbox: {
        width: '90%',
        height: 500,
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
                    <View style={style.bigbox}>
                        <View style={{ marginTop: 16, width: "100%" }}>
                            {list.map(transaction =>
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
                                    }}>Tx type : Smart contract execution</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", marginBottom: 8 }}>
                                        <Text style={{
                                            fontFamily: 'Metropolis-Regular',
                                            fontSize: 12,
                                            color: '#202426',
                                        }}>Timestamp : {transaction.number}</Text>
                                        <Text style={{
                                            fontFamily: 'Metropolis-Bold',
                                            fontSize: 12,
                                            color: transaction.type === "receive" ? '#78e185' : "#e78276",
                                        }}>{transaction.text}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", marginBottom: 8 }}>
                                        <Text style={{
                                            fontFamily: 'Metropolis-Regular',
                                            fontSize: 12,
                                            color: '#202426',
                                            marginRight: 8
                                        }}>
                                            <Text>Txhash: </Text>
                                            <Text style={{textDecorationLine: 'underline'}}>0x82ac…aaf6c</Text>
                                        </Text>
                                        <TouchableOpacity onPress={copyToClipboard}>
                                            <Image source={require('./icon/blackclip.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                        <Text style={{
                            fontFamily: 'Metropolis-Regular',
                            fontSize: 14,
                            color: '#202426',
                            opacity: 0.6,
                            alignSelf: 'center'
                        }}>Powerd by Klaytn</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}