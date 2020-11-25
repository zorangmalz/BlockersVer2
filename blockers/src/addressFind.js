import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';

const address  = StyleSheet.create({
    textone: {
        fontSize: 12,
        color: '#999999',
        opacity: 0.4,
        fontFamily: 'NunitoSans-Bold'
    },
    texttwo: {
        fontSize: 12,
        color: '#4C4C4C',
        opacity: 0.7,
        fontFamily: 'NunitoSans-Bold'
    },
    addressbox: {
        width: "90%",
        height: 40,
        borderRadius: 5,
        backgroundColor: '#F2F2F2',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 26,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});

export default function AddressFind({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <View style={address.addressbox}>
                        <TextInput style={{ width: "80%", fontSize: 14, color: 'black', opacity: 1 }} />
                        <TouchableOpacity>
                            <Ionicons name="search" size={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "100%", alignSelf: 'center' }} />
                    <View style={{alignSelf: 'center', marginTop: 16}}>
                        <Text style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                            <Text style={address.textone}>예) 도로명 + 건물번호:</Text>
                            <Text style={address.texttwo}> 온천1길 29</Text>
                        </Text>
                        <Text style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                            <Text style={address.textone}>      지역명 + 번지:</Text>
                            <Text style={address.texttwo}> 명륜3가 10</Text>
                        </Text>
                        <Text style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                            <Text style={address.textone}>      지역명 + 건물명:</Text>
                            <Text style={address.texttwo}> 혜화동 킹고 스타트업 스페이스</Text>
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>입력</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}