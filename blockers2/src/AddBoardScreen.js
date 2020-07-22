/**
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    Button,
    StatusBar,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function AddBoardScreen({navigation}) {
    const [writeList, setWriteList] = useState({
        title: '',
        content: '',
        author: '',
        isLoarding: false,
    });

    const ref = firestore().collection('communityBoard');

    const updateTextInput = (text, field) => {

    }

    function saveBoard() {
        setWriteList({
            isLoarding: true,
        });
        ref.add({
            title: writeList.title,
            content: writeList.content,
            author: writeList.author,
        }).then((docRef) => {
            setWriteList({
                title: '',
                content: '',
                author: '',
                isLoarding: false,
            });
            navigation.goBack();
        }).catch((e) => {
            console.log("Error adding document: ", e);
            setWriteList({
                isLoarding: false,
            });
        });
    }

    return ()
}
*/