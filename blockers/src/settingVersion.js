import React from 'react';
import {
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingVersion({ navigation }) {
    return (
        <>
            <StatusBar barStyle="default" />
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>버전정보</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{
                        fontSize: 40,
                        fontFamily: 'NunitoSans-Regular',
                        color: '#5CC27B',
                        marginTop: 32,
                        marginBottom: 32,
                        alignSelf: 'center'
                    }}>Ver.1.0</Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'NunitoSans-Regular',
                        alignSelf: 'center',
                        color: '#303030'
                    }}>최신버전입니다.</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}