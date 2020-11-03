import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const setting = StyleSheet.create({
    title : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Bold',
        marginTop: 16,
        marginBottom: 16,
        color: '#5cc27b'
    },
    content : {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        marginBottom: 16,
        color: '#303030',
        lineHeight: 19
    },
    line: {
        width: "100%",
        backgroundColor: "#707070",
        height: 1
    }
})

export default function SettingOften({ navigation }) {
    const question = [
        {
            id: 1,
            title: "1. 챌린지는 무엇인가요?",
            content: " Blockers 챌린지는 다양한 금연방식 맞춤 프로그램을 제공하고 스스로 금연을 실천할 수 있도록 도와주는 서비스 입니다. \n - 개인챌린지 : 혼자서 금연을 하고 지지자를 정해서 챌린지를 진행 \n- 그룹챌린지 :  Blockers내 금연 메이트와 경쟁하며 금연 챌린지를 진행하는 것"
        },
        {
            id: 2,
            title: "2. 미션과 인증은 어떻게 구성되어있나요?",
            content: " 미션은 참가자의 응답을 기반으로해 맞춤 정보를 제공하고, 자신의 상태를 기록합니다.\n 금연 인증은 선택한 금연방법에 맞춰 사진을 업로드하고, 지지자들에게 공유됩니다."
        },
        {
            id: 3,
            title: "3. 미션이나 인증에 실패하면 어떻게 되나요?",
            content: " 정해진 기간내에 미션/인증을 완수하지 않는 경우에는 직접 설정한 벌금을 징수합니다.\n 금연 지지자에게서 모금한 상금의 경우 금연지지자에게 환불처리 됩니다."
        },
        {
            id: 4,
            title: "4. 벌금은 어떻게 사용되나요?",
            content: " 벌금은 기부와 회원님의 금연 성공 상금, 서비스 운영에 사용됩니다. 그룹 챌린지의 경우 그룹 내 챌린지 성공자에게 지급 됩니다. 모두가 실패하는 경우 서비스 운영자금과 기부에 활용됩니다. \n 공지사항을 통해 벌금 징수내역과 기부내역을 투명하게 공개하며, 금연 재도전시 상금에 일부 포함됩니다."
        },
        {
            id: 5,
            title: "5. 중간에 흡연을 하면 어떻게 되나요?",
            content: " 사람은 누구나 실수를 합니다. 중간에 실수로 한대를 피우는것은 실패가 아닌 실수입니다. 실수에 대해 스스로 인지하고 주변 사람들에게 알려줘 똑같은 상황이 반복되지 않도록 하며 끝까지 챌린지를 완수하는 것이 중요합니다. \n 챌린지 탭에 있는 ‘실수 한번’ 버튼을 통해 벌금을 징수합니다. ‘실수 한번’은 10%의 벌금을 징수합니다."
        },
        {
            id: 6,
            title: "6. 챌린지 성공은 어떻게 판단하나요?",
            content: " 결심비의 90% 이상이 남아있는 경우 성공으로 판단합니다. 1회당 벌금을 스스로 설정할 수 있습니다. 성공한 경우 금연지지자들의 상금 + 결심비를 받을 수 있습니다. 6개월 챌린지를 완수하는 경우 금연 성공자 카드를 지급합니다!"
        },
        {
            id: 7,
            title: "7. Block은 무엇인가요?",
            content: " Block은 블로커즈 내에서 쓰이는 화폐입니다. 1 Block은 1원과 동일한 가치를 가지고 있으며, 블록체인 상에 토큰 이동이 기록되어 벌금과, 기부 서비스 운영비에 투명성을 보장합니다. \n출금시에도 보유하고 있는 Block만큼 출금이 가능합니다."
        }
    ]
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: "center", height: 50, paddingTop: 5, width: "100%", paddingLeft: "5%", paddingRight: "5%", backgroundColor: '#ffffff' }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>자주묻는 질문</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{
                        paddingLeft: "8%",
                        paddingRight: "8%"
                    }}>
                        <FlatList
                            data={question}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <>
                                    <Text style={setting.title}>{item.title}</Text>
                                    <Text style={setting.content}>{item.content}</Text>
                                    <View style={setting.line} />
                                </>
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}