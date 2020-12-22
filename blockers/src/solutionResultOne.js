import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

export default function SolutionScreen({navigation}) {
    const username="김현명";
    const userStatus="스트레스성 흡연자"
    return (
        <>
            <StatusBar  />
            <SafeAreaView>
                <View>
                    <Text>{username}님은</Text>
                    <Text>{userStatus}입니다.</Text>
                    <Text></Text>
                </View>
            </SafeAreaView>
        </>
    )
}