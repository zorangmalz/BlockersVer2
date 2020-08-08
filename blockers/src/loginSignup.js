import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';

const login = StyleSheet.create({
    textinput: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 4,
        borderBottomWidth: 1,
        textAlign: 'left',
        width: "90%",
        height: 40,
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: 'bold'
    },
    text: {
        marginLeft: "5%",
        fontSize: 10,
        fontWeight: 'normal',
        color: '#000000',
        opacity: 0.4
    },
    buttontext: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    buttonbox: {
      width: "90%",
      height: 40,
      borderRadius: 5,
      backgroundColor: '#5cc27b',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'  
    },
    signtext: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        opacity: 0.8,
        textDecorationLine: 'underline',
        marginRight: '5%',
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 8
    }
})

export default function LoginSignup({navigation}) {
    const [email, setEmail] = useState('');
    const [emailtouch, setEmailtouch] = useState('#E5E5E5');
    const [newpassword, setNewpassword] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('')
    const [passState,setpassState]=useState(false)
    const [texts,setTexts]=useState("")
  

    async function signup(){
        try{
        await ref.where("email","==",email).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                alert("Email already existed. type another one")
            })
        })
        } catch{
            auth()
            .createUserWithEmailAndPassword(email,password)
            .then(() => {
              console.log('User account created & signed in!');
              navigation.navigate("WalletPassword")
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
          
              console.error(error);
            });
        }
        
    }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential);
        navigation.navigate("WalletPassword")
      }
   
      async function onFacebookButtonPress() {
        
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email','user_friends']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        return auth().signInWithCredential(facebookCredential);
      }

    useEffect(()=>{
       
        GoogleSignin.configure({
            webClientId: '729209347504-nffbltomro80vel8sgdp22h3s7bd34nf.apps.googleusercontent.com',
          });
       
        if (newpassword===password){
            if (password===""){

            }else{
                setpassState(true)
                
            }
        }else{
            setpassState(false)
            console.log(password,newpassword,"different")
        }
        if (passState===true){
            setTexts("비밀번호가 일치합니다")
            console.log("wow!!same!")
        }else{
            setTexts("비밀번호가 일치하지 않습니다!!")
            console.log("damn")
        }
    })
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{ paddingTop: 20 }}>
                    <TextInput value={email} onChangeText={text => setEmail(text)} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="이메일 주소" placeholderTextColor="#999999" />
                    <Text style={login.text}>유효한 이메일을 입력해 주세요.</Text>
                    <TextInput value={newpassword} onChangeText={text => setNewpassword(text)} textContentType="newPassword" secureTextEntry={true} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="비밀번호(영문, 숫자 포함 8자리)" placeholderTextColor="#999999" />
                    <Text style={login.text}>8자리 이상 입력해주세요.</Text>
                    <TextInput value={password} onChangeText={text => setPassword(text)} textContentType="password" secureTextEntry={true} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="비밀번호 확인" placeholderTextColor="#999999" />
                    <Text style={login.text}>{texts}</Text>
                    <TextInput value={code} onChangeText={text => setCode(text)} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="추천인코드(선택)" placeholderTextColor="#999999" />
                    <Text style={login.text}>유효하지 않은 코드입니다.</Text>
                    <TouchableOpacity onPress={signup} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16 }]}>
                        <Text style={login.buttontext}>회원가입</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
                        <Text style={login.signtext}>이미 회원이신가요?</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                    <TouchableOpacity onPress={onFacebookButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#4a67ad' }]}>
                        <Text style={login.buttontext}>Facebook으로 시작하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGoogleButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#c45545' }]}>
                        <Text style={login.buttontext}>Gmail로 시작하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#f6e14b' }]}>
                        <Text style={[login.buttontext, { color: '#000000' }]}>Kakaotalk으로 시작하기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}