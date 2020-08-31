import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

const login = StyleSheet.create({
    rule: {
        fontSize: 12,
        fontFamily: 'NunitoSans-Regular',
        color: '#000000',
        opacity: 0.4,
        alignSelf: 'center',
        width: "80%",
        textAlign: 'center',
    },
    textinput: {
        fontSize: 21, 
        fontFamily: 'NunitoSans-Bold',
        opacity: 0.7,
        color: '#000000',
        borderBottomColor: '#5cc27b',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    repeat: {
        marginLeft: "10%",
        marginTop: 8,
        alignSelf: 'flex-start',
        fontSize: 14,
        fontFamily: 'NunitoSans-Regular',
        color: '#ff0000'
    }
})

export default function LoginVerificationProfile({ navigation }) {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [repeat, setRepeat] = useState(false);
    
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [nickState,setNickState]=useState(false)
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageSource, setImageSource] = useState(undefined);
    const [isImage,setIsImage]=useState(false);
    const [haveProfile,setHaveProfile]=useState(false);

    const ref=firestore().collection("UserInfo");

    
    async function updateInfo(code,bir,se,nick){
        
    console.log("시발 여기라고")
      await ref.doc(code).update({
        birth:bir,
        sex:se,
        nickname:nick,
        gotProfile:haveProfile
      })
  
    }

    // useEffect(()=>{
    //     ref.doc(user.uid).
    // })

    function onAuthStateChanged(user) {
        setUser(user);
       
        if (initializing) setInitializing(false);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return null;



      function move(){
        uploadImage()
        updateInfo(user.uid,birthday,gender,nickname)
        navigation.navigate("Home")
        
      }
      async function repeatchange(){
          console.log("gere")
          console.log(nickname,"nickname")
          console.log(nickState,'Nickstate')
        await firestore()
        .collection('UserInfo')
        .where('nickname', '==', nickname)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc){
          console.log("samehere")
          console.log(doc.data())
          setRepeat(true)
          SetNickState(true)
            })
        })
        if (nickState===false){
            
            move()
        }else{
            console.log("same shit")
        }
    } const options = {
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
            setIsImage(true)
          }
        });
    };
    async function uploadImage(){
        const uri=imageOne;
        const filename="프로필사진"+nickname
        const reference = storage().ref(nickname+"/"+filename);
        const uploadUri =  Platform.OS === 'android' ? uri.replace('file://', '') : uri;

        await reference.putFile(uploadUri);
        setHaveProfile(true)
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <TouchableOpacity onPress={showCameraRoll1} style={{alignSelf: 'center', marginTop: 16}}>
                    {isImage===true?
                            imageOne&&<Image resizeMode="stretch" source={{ uri: imageOne}} style={{ width: 92, height: 92 }} />
                            :
                            <Image source={require('./icon/userprofile.png')} style={{width: 132, height: 132}} resizeMode="contain" />    
                            }
                        
                    </TouchableOpacity>
                    <View>
                        <TextInput onChangeText={text => setNickname(text)} style={[login.textinput, { width: "80%", marginTop: 32 }]} placeholder="닉네임" />
                        {repeat === true ?
                            <Text style={login.repeat}>중복된 닉네임입니다.</Text>
                            :
                            <Text></Text>
                        }
                        <View style={{ marginLeft: "10%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextInput onChangeText={text => setGender(text)} style={[login.textinput, { width: "20%" }]} placeholder="성별" />
                            <TextInput keyboardType="number-pad" onChangeText={text => setBirthday(text)} style={[login.textinput, { width: "40%", marginLeft: "12%" }]} placeholder="생년월일" />
                        </View>
                    </View>
                    <View style={{ marginTop: "70%" }}>
                        <Text style={login.rule}>
                            계정 생성시 Blockers
                        <Text style={{ textDecorationLine: 'underline' }}> 개인정보 처리약관</Text>
                        과</Text>
                        <Text style={login.rule}>
                            <Text style={{ textDecorationLine: 'underline' }}>이용약관</Text>
                        에 동의하게 됩니다.(마케팅 정보 수신동의 포함)</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={repeatchange} style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <View style={{ width: "100%", height: 60, backgroundColor: '#5cc27b', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#ffffff', fontFamily: 'NunitoSans-Regular' }}>시작하기</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}