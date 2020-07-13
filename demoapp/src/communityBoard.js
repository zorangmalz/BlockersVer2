/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local


import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TextInput,
    Button,
    Modal,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function communityBoard({ navigation }) {
    const ref = firestore().collection('communityBoard');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [writing, setWriting] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [findModal, setFindModal] = useState(false);
    const [findTitle, setFindTitle] = useState(false);
    const [stateWrite, setStateWrite] = useState({
        isLoarding: true,
        board: [],
    });

    var date = String(new Date().getDate());
    var month = String(new Date().getMonth() + 1);
    var year = String(new Date().getFullYear());
    var hours = String(new Date().getHours());
    var min = String(new Date().getMinutes());
    var sec = String(new Date().getSeconds());

    let writingTime = [year, month, date, hours, min, sec];

    async function addWriting() {
        await ref.add({
            title: title,
            content: content,
            author: author,
            createdTime: writingTime,
        });
        setModalVisible(!modalVisible);
    }

    async function findWiting() {
        await firestore()
            .collection('communityBoard')
            .where('title')
            .limit(3)
            .get()
            .then(querySnapshot => {
                if (setFindTitle === findWiting) {

                }
            });
        setFindModal(true);
    }

    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, content, author } = doc.data();
                list.push({
                    key: doc.id,
                    doc,
                    title,
                    content,
                    author,
                });
            });
            setStateWrite({
                isLoarding: false,
                list
            })
        });
    }, [stateWrite]);



    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Text style={{
                        fontSize: 21,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginBottom: 10
                    }}>공지사항</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignContent: 'center',
                        padding: 10,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        borderColor: '#76c5b7',
                        borderWidth: 3,
                        borderRadius: 5,
                        marginLeft: 20,
                        marginRight: 20,
                    }}>
                        <Icon name="clipboard-text" size={30} />
                        <Text style={{
                            fontSize: 20,
                            fontFamily: "arial",
                            fontWeight: "bold",
                            margin: 10
                        }}>Blockers {month}월 기부내역 공지!</Text>
                    </View>
                    <View style={styles.containerCommunity}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='lightbulb-on' style={{ fontSize: 30, paddingLeft: 10 }} />
                            <Text style={{ fontSize: 20, fontFamily: "arial", fontWeight: "bold", margin: 10 }}>Hot Post</Text>
                        </View>
                    </View>
                    <View style={styles.containerCommunity}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
                            <Icon name='account-multiple' style={{ fontSize: 30, paddingLeft: 10 }} />
                            <Text style={{ fontSize: 20, fontFamily: "arial", fontWeight: "bold", margin: 10 }}>Talk</Text>
                            <TouchableOpacity
                                onPress={() => { setModalVisible(!modalVisible); }}
                                style={{ alignSelf: 'center' }}
                            >
                                <Text style={{ fontSize: 10, fontFamily: "arial", fontWeight: "normal", margin: 10, alignSelf: 'flex-end' }}>글작성하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setFindModal(!findModal); }}
                                style={{ alignSelf: 'center' }}
                            >
                                <Text style={{ fontSize: 10, fontFamily: "arial", fontWeight: "normal", margin: 10, alignSelf: 'flex-end' }}>글 찾기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        data={stateWrite}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) =>
                            <View style={{
                                marginLeft: 20,
                                marginRight: 20
                            }}>
                                <View style={{ borderColor: 'black', alignSelf: 'stretch', borderWidth: 1 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('boardDetail', {
                                        boardKey: `${JSON.stringify(stateWrite.key)}`
                                    })}>
                                        <Text style={{ fontSize: 15, fontFamily: "arial", fontWeight: 'normal', alignSelf: 'flex-start', marginLeft: 5, padding: 2 }}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#ffffff' }}>
                            <TextInput placeholder={'제목'} value={title} onChangeText={setTitle} />
                            <TextInput placeholder={'저자'} value={author} onChangeText={setAuthor} />
                            <TextInput multiline placeholder={'내용'} value={content} onChangeText={setContent} />
                            <Button title={"제출하기"} onPress={() => {
                                addWriting()
                                Alert.alert("제출되었습니다")
                            }} />
                        </View>
                    </Modal>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={findModal}
                        onRequestClose={() => {
                            Alert.alert("정말 나가시겠습니까?");
                            setFindModal(!findModal);
                        }}
                    >
                        <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#ffffff' }}>
                            <TextInput value={findTitle} onChangeText={setFindTitle} onEndEditing={() => findWiting()} />
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffff',
    },
    containerCommunity: {
        margin: 15,
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default communityBoard;
*/