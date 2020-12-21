import React from 'react'
import {
    View,
    SafeAreaView,
    StatusBar,
    Image,
    Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    Platform
} from 'react-native'
import Swiper from 'react-native-swiper'
import { useFocusEffect } from "@react-navigation/native"

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        marginLeft: "10%",
        marginRight: "10%",
        fontSize: 14,
        fontFamily: "NunitoSans-Regular",
        color: "#303030",
        textAlign: "center",
        marginTop: HEIGHT * 0.05
    },
    image: {
        width: WIDTH * 0.85,
        height: HEIGHT * 0.7,
        marginBottom: HEIGHT * 0.05
    }
})

export default function GuideScreen({ navigation, route }) {
    const one = "흡연/금연모드 변경 버튼을 통해 흡연/금연모드를 자유롭게 바꾸면서 금연을 실천해 보세요. 알림을 통해 미션과 커뮤니티 소식을 전해 들을 수 있습니다."
    const two = "평균 흡연양을 입력하고 하루하루 흡연양을 기록하세요 담배 +1 버튼을 누르면  흡연한 담배 개수가 올라갑니다."
    const three = "금연달력을 통해  금연 활동을 한눈에 볼 수 있습니다. 금연리포트 & 정보에서는 금연에 유용한 정보와 복약등록, 건강상태를 체크할 수 있어요! ‘한번만 참아봐’는 흡연충동이 발생한 경우 눌러 잠깐의 딴 짓을 통해 흡연 욕구를 낮춰주는 4D 프로그램이 실행됩니다."
    const four = "금연한 시간과 개피 수, 아낀 돈을 한눈에 볼 수 있어요"

    //android 전용 뒤로가기 금지
    useFocusEffect(
        React.useCallback(() => {
            if(Platform.OS==="android"){
                console.log("??")
                if (route.params?.from) {
                    const onBackPress = () => {
                        if (route.name === route.params?.from) {
                            return false;
                        } else {
                            return true;
                        }
                    };
                    BackHandler.addEventListener('hardwareBackPress', onBackPress);
                    return () =>
                        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
                }
            }
            
        }, [route.params?.from])
    );
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <Swiper
                    loop={false}
                    activeDotColor="#5cc27b"
                >
                    <View style={style.screen}>
                        <Text style={style.text} >{one}</Text>
                        <Image style={style.image} source={require("../icon/guideone.png")} />
                    </View>
                    <View style={style.screen}>
                        <Text style={style.text} >{two}</Text>
                        <Image style={style.image} source={require("../icon/guidetwo.png")} />
                    </View>
                    <View style={style.screen}>
                        <Text style={[style.text, { marginTop: HEIGHT * 0.015 }]} >{three}</Text>
                        <Image style={[style.image]} source={require("../icon/guidethree.png")} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={style.screen}>
                        <Text style={style.text} >{four}</Text>
                        <Image style={style.image} source={require("../icon/guidefour.png")} />
                    </TouchableOpacity>
                </Swiper>
            </SafeAreaView>
        </>
    )
}