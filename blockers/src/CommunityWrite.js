import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    Alert,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from "moment"
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get("screen").height;

const community = StyleSheet.create({
    buttonbox: {
        width: 52,
        height: 24,
        borderRadius: 5,
        backgroundColor: '#5cc27b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 16
    },
    buttontext: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Bold',
        color: '#ffffff'
    },
    titlebox: {
        paddingLeft: 32,
        borderWidth: 0.5,
        borderColor: '#707070',
        alignItems: 'flex-start',
        justifyContent: "center",
        height: 50,
        paddingRight: 32
    },
    titleandcontent: {
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#666666',
        width: "100%"
    },
    contentbox: {
        paddingLeft: 32,
        alignItems: 'flex-start',
        height: WIDTH * 1.2,
        borderBottomWidth: 0.5,
        borderColor: '#707070',
        paddingTop: 8,
        paddingRight: 32
    },
    picturetext: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'NunitoSans-Regular'
    }
})

export default function CommunityWrite({ navigation }) {
    const ref = firestore().collection("Community1");
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [user, setuser] = useState()
    const [nick, setNick] = useState()
    const [filename, setFilename] = useState()
    const [vmtkfldzm, setvmtkfldzm] = useState()
    const [picture, setPicture] = useState()
    const [isPicture, setIsPicture] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        console.log(utils.FilePath.PICTURES_DIRECTORY);
        auth().onAuthStateChanged(userAuth => {
            setuser(userAuth)

        })
        if (user) {
            console.log(user)
            firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot => {
                console.log(documentSnapshot.data().nickname, "hihi")
                setNick(documentSnapshot.data().nickname)
                setvmtkfldzm(documentSnapshot.data().profilePicture)

            })

        }
    }, [user])
    async function uploadImage(a) {
        const uri = imageOne;
        setFilename(title + nick + a)

        const reference = storage().ref("community1/" + title + nick + a);
        // const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const uploadUri = uri.replace('file://', '') 

        await reference.putFile(uploadUri);
        setPicture(true)
    }
    async function writePost() {
        setIsLoading(true)

        var a = moment().toArray()


        if (a[1] === 12) {
            a[1] = 1
            a[0] = a[0] + 1
        } else {
            a[1] = a[1] + 1
        }
        console.log("is picture", isPicture)
        if (isPicture) {
            await uploadImage(a)
        }
        await ref.doc(a + title).set({
            context: content,
            like: 0,
            title: title,
            writerUid: user.uid,
            fullTime: a,
            time: a[3] + ":" + a[4],
            day: a[1] + "/" + a[2],
            docName: a + title,
            nickname: nick,
            whoLike: [],
            commentNum: 0,
            fullText: title + content,
            whoAlert: [],
            profilePicture: vmtkfldzm,
            isPicture: isPicture,
            isRepair: false
        })
        setIsLoading(false)
        Alert.alert(
            '작성 완료',
            '',
            [
                {
                    text: '확인', onPress: () => navigation.navigate("CommunityScreen", { from: "CommunityScreen" })
                }
            ]
        )

    }
    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.3
    };

    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageOne(response.uri);
                setPicone(false);
            }
        });
        setIsPicture(true)
    };

    const errorview = () => {
        Alert.alert(
            "작성 오류",
            "제목 본문 한글자 이상 작성해주세요",
            [
                {
                    text: "확인",
                    onPress: () => console.log("확인")
                }
            ]
        )
    }

    return (
        <>
            <StatusBar barStyle="default" />
            {isLoading === true ?
                <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
                :
                <>
                
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, paddingTop: 8, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={25} />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>작성하기</Text>
                                </Text>
                            </View>
                            {/* 중앙 맞추기 */}
                            <View style={{ width: "4%" }} />
                        </View>
                        <ScrollView>
                            <View style={community.titlebox}>
                                <TextInput value={title} onChangeText={text => setTitle(text)} style={community.titleandcontent} placeholder="제목" placeholderTextColor="#707070" />
                            </View>
                            <View style={community.contentbox}>
                                <TextInput value={content} onChangeText={text => setContent(text)} style={community.titleandcontent} multiline={true} placeholder="내용" placeholderTextColor="#707070" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                padding: 16,
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <TouchableOpacity onPress={showCameraRoll1} style={{
                                    width: 92,
                                    height: 92,
                                    backgroundColor: '#E5E5E5',
                                    marginRight: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 92, height: 92 }} />}
                                    {picone === true ? <Text style={community.picturetext}>Picture 1</Text> : <View />}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        
                    </SafeAreaView>
                    
                    <SafeAreaView style={{ flex: 0 }}>
                        <TouchableOpacity onPress={
                            (title.length > 0) && (content.length > 0) ? () => writePost() : errorview}>
                            <View style={{ width: "100%", height: 60, backgroundColor: (title.length > 0) && (content.length > 0) ? '#5cc27b' : "#c6c6c6", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>작성완료</Text>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                    
                </>
            }
        </>
    )
}