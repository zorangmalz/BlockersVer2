import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';

export default function ContentsComplete({navigation}) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
                <ScrollView>
                    <Image 
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: "20%", marginBottom: 32}}
                        source={require('./icon/resetcheck.png')} 
                    />
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000000',
                        opacity: 0.7,
                        alignSelf: 'center'
                    }}>구매 완료</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'normal',
                        color: '#000000',
                        opacity: 0.6,
                        alignSelf: 'center',
                        marginTop: 16
                    }}>카카오톡 메시지로 상품 교환권을 전달했습니다.</Text>
                    <View style={{
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 30,
                        paddingBottom: 40,
                        marginTop: 16,
                        alignSelf: 'center',
                        alignItems: 'flex-start',
                        backgroundColor: '#E6E6E6'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#444444',
                                marginRight: 16
                            }}>상품이름</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#2E2E2E'
                            }}>녹차맛 아이스크림 150g</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#444444',
                                marginRight: 16
                            }}>상품가격</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#454545'
                            }}>2,720원</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#444444',
                                marginRight: 16
                            }}>수령방법</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#454545'
                            }}>카카오톡</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#444444',
                                marginRight: 16
                            }}>핸드폰번호</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#454545'
                            }}>010-4337-6607</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }} onPress={() => navigation.navigate('Home')}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff' }}>돌아가기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}