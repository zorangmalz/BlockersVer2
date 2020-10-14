import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} />
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            marginLeft: 24
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Transaction</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView style={{ marginBottom: 70 }}>
                    <View style={wallet.container}>
                        <View style={{ flexDirection: 'row', marginRight: 24, alignItems: 'center', justifyContent: 'space-between' }}>
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