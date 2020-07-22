import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const wallet = StyleSheet.create({
    mainText : {
        fontSize: 16,
        fontWeight: 'normal',
        alignSelf: 'flex-start',
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function WalletMain({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <ScrollView style={{ marginBottom: 70}}>
                    <TouchableOpacity style={[wallet.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('Transaction')}>
                        <Text style={wallet.mainText}>Transaction</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[wallet.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('입금')}>
                        <Text style={wallet.mainText}>입금</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[wallet.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('WalletWithDrawal')}>
                        <Text style={wallet.mainText}>출금</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[wallet.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('WalletPassword')}>
                        <Text style={wallet.mainText}>비밀번호설정</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};