import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Button
} from 'react-native';


const style = StyleSheet.create({
    container: {
        marginBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        marginTop: 15,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD"
    },
    containerStatus: {
        margin: 15,
        flex: 3,
        backgroundColor: "#333953",
        height: 140,
        borderRadius: 10,

    },
    box: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: "#48d1cc",
        borderWidth: 3,
        alignItems: 'center',
    },
    fontText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#79808c'
    },
    fontSubTitle: {
        fontSize: 21,
        fontWeight: '600',
        marginLeft: 10,
        color: '#79808c'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: '#48d1cc'
    }
})

export default function MyPageScreen({navigation}) {
    const num = 1;
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView style={style.container}>
                    <View
                        accessibilityRole="header"
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>

                            <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}> MyPage</Text>
                        </Text>
                        <Image source={require('./icon/alram.png')} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                    <View style={style.containerStatus}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ padding: 10, fontSize: 20, fontFamily: "HelveticaNeue", fontWeight: "bold", margin: 10, color: "white" }}>김현명님</Text>
                            <Text style={{ padding: 10, fontSize: 15, fontFamily: "arial", fontWeight: "bold", margin: 10, color: "white", marginLeft: 150 }}>Transaction</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                        </View>
                        <Text style={{ marginLeft: 15, fontSize: 20, fontFamily: "arial", fontWeight: "bold", color: "white" }}>100,000 Block</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={[style.buttonStyle, { backgroundColor: 'white', width: 54, height: 28, marginRight: 10, marginLeft: 218 }]}>
                                <Text style={{ fontSize: 16, color: 'black' }}>출금</Text>
                            </View>
                            <View style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28, marginRight: 10, marginLeft: 4 }]}>
                                <Text style={{ fontSize: 16, color: 'white' }}>충전</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={style.container}>
                            <FlatList
                                data={[
                                    { key: '개인정보', name: 'personal'},
                                    { key: '공지사항', name: '공지사항' },
                                    { key: '내가 쓴 글' },
                                    { key: '이용약관' },
                                ]}
                                renderItem={({ item }) => (<TouchableOpacity
                                onPress={() => navigation.navigate(item.name)} 
                                >
                                    <Text style={style.item}>{item.key}</Text>
                                </TouchableOpacity>)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}