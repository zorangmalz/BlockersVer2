import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

const wallet = StyleSheet.create({
    container: {
        width: "100%",
        height: 140,
        backgroundColor: '#FFFFFF',
        paddingTop: 24,
        paddingBottom: 17,
        paddingLeft: 32
    },
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#5cc27b'
    },
    date: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    },
    content: {
        marginTop: 24,
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        color: '#303030'
    }
})

export default function WalletTransaction() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ marginBottom: 70}}>
                    <View style={wallet.container}>
                        <View style={{flexDirection: 'row', marginRight: 24, alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={wallet.title}>송금</Text>
                            <Text style={wallet.date}>2020.06.29</Text>
                        </View>
                        <Text style={wallet.content}>Tx hash: 0xajsdlj32llkjdlkf12321312lkj</Text>
                        <Text style={[wallet.content,{marginTop: 0}]}>Amount: 5,000 Block</Text>
                    </View>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}