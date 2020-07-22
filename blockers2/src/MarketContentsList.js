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
        height: 256,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
    },
    image: {
        height: 129,
        width: 343,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.8,
        color: '#000000',
        marginBottom: 8
    },
    content: {
        fontSize: 14,
        fontWeight: 'normal',
        opacity: 0.8,
        color: '#000000',
        marginTop: 8
    },
    discount: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'red',
        opacity: 0.6,
        marginLeft: 8,
        marginBottom: 8
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
                        <Text style={styles.title}>제주산 한라봉 10kg</Text>
                        <Text style={{ alignItems: 'center' }}>
                            <Text style={[styles.title, { marginRight: 8 }]}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </Text>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image style={styles.image} source={require("./icon/juzi.jpg")}>
                        </Image>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={styles.title}>제주산 한라봉 10kg</Text>
                        <Text style={{ alignItems: 'center' }}>
                            <Text style={[styles.title, { marginRight: 8 }]}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </Text>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image style={styles.image} source={require("./icon/juzi.jpg")}>
                        </Image>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={styles.title}>제주산 한라봉 10kg</Text>
                        <Text style={{ alignItems: 'center' }}>
                            <Text style={[styles.title, { marginRight: 8 }]}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </Text>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image style={styles.image} source={require("./icon/juzi.jpg")}>
                        </Image>
                    </View>
                    <View style={{ marginLeft: 28, alignItems: 'flex-start' }}>
                        <Text style={styles.title}>제주산 한라봉 10kg</Text>
                        <Text style={{ alignItems: 'center' }}>
                            <Text style={[styles.title, { marginRight: 8 }]}>49,500원</Text>
                            <Text style={styles.discount}>10% 할인</Text>
                        </Text>
                        <Text style={styles.content}>Lorem ipsum dolor sit amet, consetetur.</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}