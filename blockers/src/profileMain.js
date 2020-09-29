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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const style = StyleSheet.create({
    container: {
        marginLeft: 32,
        paddingTop: 16,
        paddingBottom: 8
    },
    profile: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        opacity: 0.8,
        color: '#ffffff',
        marginBottom: 8,
    },
    containerStatus: {
        marginTop: 16,
        backgroundColor: "#646464",
        height: 130,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "90%",
        alignSelf: "center",
        paddingLeft: 16,
        paddingTop: 32,
        paddingBottom: 32,
        paddingRight: 32
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
    const [haveProfile,setHaveProfile]=useState();
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
        async function hello(){
        auth().onAuthStateChanged(userAuth=>{
            setUser(userAuth)})
            if(user){
            firestore().collection("UserInfo").doc(user.uid).get().then(documentSnapshot=>{
                console.log(documentSnapshot.data().nickname,"hihi")
                setUserNick(documentSnapshot.data().nickname)
                setuserBirth(documentSnapshot.data().birth)
                setHaveProfile(documentSnapshot.data().gotProfile)
            })
            console.log(user)
            console.log(haveProfile,"profile")
            hi()
        }
    }hello()
      }, [userNick,user,imageOne]);
    
    
    
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
            console.log(response.uri,"thisisresponsoe")
            setPicone(false);

            uploadImage(response.uri)
          }
        });
    };
    async function uploadImage(a){
        const uri=a;
        const filename="프로필사진"+userNick
        const reference = storage().ref("User/"+userNick+"/"+filename);
        console.log(uri,imageOne,filename,reference)
        const uploadUri =  Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri);
    }
    async function hi(){
    console.log("HI","gs://blockers-8a128.appspot.com/"+userNick+"/프로필사진"+userNick)
        const url = await storage()
          .refFromURL("gs://blockers-8a128.appspot.com/"+"User/"+userNick+"/프로필사진"+userNick)
            .getDownloadURL();
        setIsImage(true)
        setImageSource(url)
        console.log("get")
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={35} />
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
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>개인정보</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={[style.title, { marginLeft: 32, marginTop: 20, marginBottom: 0 }]}>Profile</Text>
                    <View style={style.containerStatus}>
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

                                <Text style={style.profile}>스트레스형 예술가형</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text style={[style.profile, {color: "white", fontFamily: "NunitoSans-Bold"}]}>{userNick}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('닉네임 변경')}>
                                        <MaterialCommunityIcons name="pencil" color="white" size={25} style={{ marginLeft: 8 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{width: 60, height: 24, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 15}}>
                            <Text style={{fontFamily: "NunitoSans-Bold", fontSize: 12, color: "#303030"}}>Step 01</Text>
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
                </ScrollView>
            </SafeAreaView>
        </>
    )
}