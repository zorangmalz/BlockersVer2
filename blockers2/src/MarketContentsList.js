import React, { useState } from 'react';
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
    Button,
    TouchableHighlight,
    Clipboard
} from 'react-native';

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
        paddingBottom: 16
    },
    image: {
        height: 129,
        width: 343,
        marginBottom: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.8,
        color: '#000000',
        marginRight: 8
    },
    content: {
        fontSize: 14,
        fontWeight: 'normal',
        opacity: 0.8,
        color: '#000000',
    },
    discount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'red',
        opacity: 0.6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'normal',
        opacity: 0.6,
        color: '#000000',
        textDecorationLine: "line-through",
        marginRight: 8,
    }
})

export default function MarketContentsList({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView >
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ContentsInfo')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.image} source={require("./icon/juzi.jpg")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={[styles.title, {marginBottom: 8}]}>제주산 한라봉 10kg</Text>
                        <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={styles.price}>55,000원</Text>
                            <Text style={styles.title}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </View>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.image} source={require("./icon/juzi.jpg")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={[styles.title, {marginBottom: 8}]}>제주산 한라봉 10kg</Text>
                        <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={styles.price}>55,000원</Text>
                            <Text style={styles.title}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </View>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.image} source={require("./icon/juzi.jpg")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={[styles.title, {marginBottom: 8}]}>제주산 한라봉 10kg</Text>
                        <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={styles.price}>55,000원</Text>
                            <Text style={styles.title}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </View>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.image} source={require("./icon/juzi.jpg")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={[styles.title, {marginBottom: 8}]}>제주산 한라봉 10kg</Text>
                        <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={styles.price}>55,000원</Text>
                            <Text style={styles.title}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </View>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}