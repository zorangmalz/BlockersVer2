import React, { useState,useEffect } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Clipboard
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';


const style = StyleSheet.create({
    container: {
        marginLeft: 32,
        paddingTop: 16,
        paddingBottom: 8
    },
    profile: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.8,
        color: '#303030',
        marginBottom: 8
    },
    title: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Bold',
        color: '#303030',
        opacity: 0.8,
        marginBottom: 16
    },
    box: {
        marginLeft: 32,
        marginBottom: 16
    },
    images: {
        height: 68,
        width: 78,
        borderRadius: 10,
    },
    item: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        opacity: 0.6,
        color: '#303030'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#48d1cc'
    },
    clipboard: {
        height: 20,
        width: 16,
    },
})

export default function ProfileMain({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    const [userName, setuserName] =useState();
    const [userBirth, setuserBirth]=useState();
    const [userPhone, setuserPhone]=useState();
    const [userNick,setUserNick]=useState();
    
    const [recommend, setRecommend] = useState(true);
    const [copiedText, setCopiedText] = useState('')
    const ref=firestore().collection("UserInfo");
    
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage,setIsImage]=useState(false);
    
    const copyToClipboard = () => {
        Clipboard.setString('hello world')
    }

   
      useEffect(() => {
        auth().onAuthStateChanged(userAuth=>{
            setUser(userAuth)})
            if(user){
            firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot=>{
                console.log(documentSnapshot.data().nickname,"hihi")
                setUserNick(documentSnapshot.data().nickname)
                setuserBirth(documentSnapshot.data().birth)
            })
           hi()
        }
      }, [userNick]);
    
    
    
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
        quality:0.3
    };

    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
          }
          else {
            setImageOne(response.uri);
            setPicone(false);

            uploadImage()
          }
        });
    };
    async function uploadImage(){
        const uri=imageOne;
        const filename="프로필사진"+userNick
        const reference = storage().ref(userNick+"/"+filename);
        const uploadUri =  Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri);
    }
    async function hi(){
    console.log("HI","gs://blockers-8a128.appspot.com/"+userNick+"/프로필사진"+userNick)
        const url = await storage()
          .refFromURL("gs://blockers-8a128.appspot.com/"+userNick+"/프로필사진"+userNick)
          .getDownloadURL();
          setIsImage(true)
          setImageSource(url)
        console.log("get")
        }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <Text style={[style.title, { marginBottom: 10, marginLeft: 32, marginTop: 24 }]}>Profile</Text>
                    <View style={style.box}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={showCameraRoll1}>
                            {isImage===true?
                            <Image resizeMode="stretch" source={{ uri: imageSource}} style={{ width: 92, height: 92 }} />
                            :
                            <Image resizeMode="stretch" style={style.images} source={require('./icon/userprofile.png')}></Image>
                            }
                            
                            </TouchableOpacity>
                            <View style={{
                                marginLeft: 16,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                
                                <Text style={style.profile}>LV5</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={style.profile}>{userNick}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('닉네임 변경')}>
                                        <Image source={require('./icon/pen.png')} style={{ width: 18, height: 18, marginLeft: 8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>이름</Text>
                        {user?
                        <Text style={style.item}>{user.displayName}</Text>
                        :
                        <Text> </Text>
                        }
                        
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={style.container}>
                        <Text style={style.title}>생년월일</Text>
                        <Text style={style.item}>{userBirth}</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>휴대폰번호</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}></Text>
                            <TouchableOpacity style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold'}}>재인증</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    <View style={[style.container, { marginRight: 32 }]}>
                        <Text style={style.title}>비밀번호 재설정</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={style.item}>비밀번호를 잃어버리셨나요?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('지갑 비밀번호 재설정')} style={[style.buttonStyle, { backgroundColor: '#5cc27b', width: 54, height: 28 }]}>
                                <Text style={{ fontSize: 12, color: 'white', fontFamily: 'NunitoSans-Bold' }}>재설정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                    {recommend === true ?
                        <View>
                            <View style={style.container}>
                                <Text style={style.title}>추천인 코드</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={[style.item, { marginRight: 8 }]}>Asd12lasl1</Text>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                        <Image style={style.clipboard} source={require("./icon/clipboard.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                            <View style={style.container}>
                                <Text style={style.title}>추천인 링크</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.item, { marginRight: 8 }]}>Bit/ly.cl1929</Text>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                        <Image style={style.clipboard} source={require("./icon/clipboard.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#dddddd', width: "90%", alignSelf: 'center' }} />
                        </View>
                        :
                        <View></View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}