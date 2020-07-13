/**
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    Button,
    StatusBar,
} from 'react-native';

function boardDetail({ navigation }) {
    const [writeDetail, setWriteDetail] = useState({
        isLoading: true,
        board: {},
        key: ''
    });

    useEffect(() => {
        const ref = firestore().collection('communityBoard').doc(JSON.parse(navigation.getParam('boardKey')));
        ref.get().then((doc) => {
            if (doc.exists) {
                setWriteDetail({
                    isLoading: false,
                    board: doc.data(),
                    key: doc.id
                });
            } else {
                console.log("No such document!");
            }
        });
    });

    function deleteWrite(key) {
        const { navigation } = this.props;
        setWriteDetail({
            isLoading: true
        });
        firestore().collection('communityBoard').doc(key).delete().then(() => {
            console.log("Document successfullt deleted!");
            setWriteDetail({
                isLoading: false
            });
            navigation.navigate('communityBoard');
        }).catch((e) => {
            console.log("Error removing document: ", error);
            setWriteDetail({
                isLoading: false
            });
        });
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View>
                        <Text>{writeDetail.board.title}</Text>
                    </View>
                    <View>
                        <Text>{writeDetail.board.content}</Text>
                    </View>
                    <View>
                        <Text>{writeDetail.board.author}</Text>
                    </View>
                    <Button title="수정하기" onPress={() => navigation.navigate('EditBoard', {boardKey: `${JSON.stringify(writeDetail.key)}`})} />
                    <Button title="삭제하기" onPress={() => deleteWrite(writeDetail.key)} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default boardDetail;
*/