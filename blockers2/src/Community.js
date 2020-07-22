
import React, { useLayoutEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

const styles = {
    image: {
        width: "100%"
    },
    board: {
        flex: 1,
        height: 120,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
    },
    bigFont: {
        marginLeft: 24,
        marginTop: 8,
        width: 73,
        height: 22,
        fontSize: 16,
        fontWeight: "bold"
    }
}
export default function CommunityHome({navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity>
                <Image source={require('./icon/alram.png')} />
              </TouchableOpacity>
            </View>
          ),
        });
      }, [navigation])
    return (
        <>
            <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView >
                    <Image style={styles.image} source={require("./icon/noti.png")} />
                    <View style={styles.board}>
                        <Text style={styles.bigFont}>Hot 게시판</Text>
                        <Text style={{ marginLeft: 24, marginTop: 8 }}>흡연 10년차다 시발</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>김현명</Text>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>방금전</Text>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                        </View>
                    </View>

                    <View style={styles.board}>
                        <Text style={styles.bigFont}>Hot 게시판</Text>
                        <Text style={{ marginLeft: 24, marginTop: 8 }}>흡연 10년차다 시발</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>김현명</Text>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>방금전</Text>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                        </View>
                    </View>

                    <View style={styles.board}>
                        <Text style={styles.bigFont}>Hot 게시판</Text>
                        <Text style={{ marginLeft: 24, marginTop: 8 }}>흡연 10년차다 시발</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>김현명</Text>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>방금전</Text>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                        </View>
                    </View>

                    <View style={styles.board}>
                        <Text style={styles.bigFont}>ot 게시판</Text>
                        <Text style={{ marginLeft: 24, marginTop: 8 }}>흡연 10년차다 시발</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>김현명</Text>
                            <Text style={{ marginLeft: 24, marginTop: 8 }}>방금전</Text>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                            <Image source={require("./icon/lightbulb.png")}></Image>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}