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
import Ionicons from 'react-native-vector-icons/Ionicons';

const setting = StyleSheet.create({
    mainText : {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start',
        color: '#303030'
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function PersonalInformation({ navigation }) {
    return (
        <>
            <StatusBar  />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={35} />
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>정보</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('개인정보처리방침')}>
                        <Text style={setting.mainText}>개인정보처리방침</Text>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                    <TouchableOpacity style={[setting.mainBox, { marginTop: 32 }]} onPress={() => navigation.navigate('서비스 이용 약관')}>
                        <Text style={setting.mainText}>서비스 이용 약관</Text>
                    </TouchableOpacity>
                   
                    <View style={{ width: "85%", height: 0.5, backgroundColor: "#C6C6C6", borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center'}} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};