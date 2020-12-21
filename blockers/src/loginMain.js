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
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/functions';
import { Extrapolate } from 'react-native-reanimated';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};

const login = StyleSheet.create({
  textinput: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 4,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    textAlign: 'left',
    width: "90%",
    height: 40,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
    color: '#303030'
  },
  text: {
    marginLeft: "5%",
    fontSize: 10,
    fontFamily: 'NunitoSans-Regular',
    color: '#303030',
    opacity: 0.4
  },
  buttontext: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
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
  notbuttonbox: {
    width: "90%",
    height: 40,
    borderRadius: 5,
    backgroundColor: '#c6c6c6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  signtext: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Bold',
    color: '#303030',
    opacity: 0.8,
    textDecorationLine: 'underline',
    marginRight: '5%',
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 8
  }
})

export default function LoginMain({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginLoading, setLoginLoading] = useState(false);
  const [code, setCode] = useState('')
  const [passState, setpassState] = useState(false)
  const [texts, setTexts] = useState("")



  var kakaoAuth = firebase.functions().httpsCallable("kakaoCustomAuth");
  // var kakaoAuth=firebase.functions().httpsCallable("helloworld");
  const [kakaoLoading, setKakaoLoading] = useState(false)
  async function kakaoCheck(firebaseToken) {
    setKakaoLoading(true)
    const user = await auth().signInWithCustomToken(firebaseToken)
    console.log(user)
    let check = false
    await firestore()
      .collection('UserInfo')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
          if (doc.id === user.user.uid) {
            check = true
          }

        })
      })
    if (check) {
      console.log("old")
      setKakaoLoading(false)
      navigation.navigate("Home")
    } else {
      console.log("new")
      setKakaoLoading(false)
      navigation.navigate("프로필 설정")
    }
  }
  async function kakaoLogin() {
    console.log("come")
    logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(result => {
        const realToken = result.accessToken
        kakaoAuth({ token: realToken }).then(function (res) {
          kakaoCheck(res.data.firebase_token)

          // kakaoGetProfile()
        }).catch(err => {
          logCallback(
            `Failed:${err.code}:he ${err.message}`,
          );
        })
        logCallback(
          `Login Finished:${JSON.stringify(result)}`,
          setLoginLoading(false),
        );

      })
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };

  const [gmailLoading, setGmailLoading] = useState(false)
  async function onGoogleButtonPress() {
    setGmailLoading(true)
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const NewUser = (await auth().signInWithCredential(googleCredential)).additionalUserInfo.isNewUser
    // Sign-in the user with the credential
    if (NewUser === true) {
      auth().signInWithCredential(googleCredential);
      setGmailLoading(false)
      navigation.navigate("프로필 설정");
    } else if (NewUser === false) {
      auth().signInWithCredential(googleCredential);
      setGmailLoading(false)
      navigation.navigate("Home");
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '729209347504-nffbltomro80vel8sgdp22h3s7bd34nf.apps.googleusercontent.com',
    });
  })

  const [anonyLoading, setAnonyLoading] = useState(false)
  function logins() {
    setAnonyLoading(true)
    console.log("here")
    auth().signInWithEmailAndPassword(email, password).then(() => {
      setAnonyLoading(false)
      navigation.navigate("Home")
    }).catch(error => {
      console.log("!!!")
      var errorCode = error.code;
      var errorMessage = error.message;
      setAnonyLoading(false)
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        console.log(errorMessage)
        alert(errorMessage);
      }
      console.log(error);
    });

  }
  const [appleloading, setappleloading] = useState(false)
  async function onAppleButtonPress() {
    setappleloading(true)
    console.log("con")
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    const NewUser = (await auth().signInWithCredential(appleCredential)).additionalUserInfo.isNewUser
    // Sign-in the user with the credential
    if (NewUser === true) {
      auth().signInWithCredential(appleCredential);
      setappleloading(false)
      navigation.navigate("LoginVerificationProfileApple");
    } else if (NewUser === false) {
      auth().signInWithCredential(appleCredential);
      setappleloading(false)
      navigation.navigate("Home");
    }
    // Sign the user in with the credential
    return 
  }
  // async function onFacebookButtonPress() {

  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }
  //     const dataa = await AccessToken.getCurrentAccessToken();
  //     if (!dataa) {
  //       throw 'Something went wrong obtaining access token';
  //     }
  //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //     const NewUser = (await auth().signInWithCredential(facebookCredential)).additionalUserInfo.isNewUser
  //     if (NewUser === true) {
  //       auth().signInWithCredential(facebookCredential);
  //       navigation.navigate("프로필 설정");
  //     } else if (NewUser === false) {
  //       auth().signInWithCredential(facebookCredential);
  //       navigation.navigate("Home");
  //     }
  //   }

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {kakaoLoading || gmailLoading || anonyLoading ||appleloading ?
          <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
          :
          <>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={25} />
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
                <Text style={{ fontSize: 18 }}>
                  <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>로그인</Text>
                </Text>
              </View>
            </View>
            <ScrollView style={{ paddingTop: 20 }}>
              <TextInput value={email} onChangeText={text => setEmail(text)} style={login.textinput} placeholder="이메일 주소" placeholderTextColor="#999999" />
              <Text style={login.text}>유효한 이메일을 입력해 주세요.</Text>
              <TextInput value={password} onChangeText={text => setPassword(text)} textContentType="password" secureTextEntry={true} style={login.textinput} placeholder="비밀번호(영문, 숫자 포함 6자리)" placeholderTextColor="#999999" />
              <Text style={login.text}>6자리 이상 입력해주세요.</Text>
              {email.length > 0 && password.length > 0 ?
                <TouchableOpacity onPress={logins} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16 }]}>
                  <Text style={login.buttontext}>로그인</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.3} style={[login.notbuttonbox, { marginTop: 16 }]}>
                  <Text style={login.buttontext}>로그인</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity onPress={() => navigation.navigate('본인인증')}>
                <Text style={login.signtext}>비밀번호 찾기</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('회원가입')}>
                <Text style={login.signtext}>회원가입</Text>
              </TouchableOpacity>
              <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
              {/* <TouchableOpacity onPress={onFacebookButtonPress} activeOpacity={0.3} style={[login.buttonbox, {marginTop: 16, backgroundColor: '#4a67ad'}]}>
                        <Text style={login.buttontext}>Facebook으로 로그인</Text>
                    </TouchableOpacity> */}
              <TouchableOpacity onPress={onGoogleButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#c45545' }]}>
                <Text style={login.buttontext}>Gmail로 로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={kakaoLogin} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#f6e14b' }]}>
                <Text style={[login.buttontext, { color: '#000000' }]}>Kakaotalk으로 로그인</Text>
              </TouchableOpacity>
              {Platform.OS=="ios" ?

              <TouchableOpacity onPress={onAppleButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#000000' }]}>
              <Text style={[login.buttontext, { color: '#ffffff' }]}>Apple로 로그인</Text>
            </TouchableOpacity>
              :
              <>
              </>
              }
              
            </ScrollView>
          </>
        }
      </SafeAreaView>
    </>
  )
}