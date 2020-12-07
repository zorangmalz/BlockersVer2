import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/functions';
import { useFocusEffect } from '@react-navigation/native';
// import { kakaoCustomAuth } from '../functions';

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

export default function LoginSignup({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailtouch, setEmailtouch] = useState('#E5E5E5');
  const [newpassword, setNewpassword] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('')
  const [passState, setpassState] = useState(false)
  const [texts, setTexts] = useState("")
  const [passLong, setPassLong] = useState("6자리 이상 입력해주세요.")
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [unlinkLoading, setUnlinkLoading] = useState(false);
  const [user, setUser] = useState();
  const [emailLong, setEmailLong] = useState("유효한 이메일을 입력해 주세요")
  const [signUpState, setSignUpState] = useState(false)
  const [kakaoState,setKakaoState]=useState(false)
  // const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  var kakaoAuth = firebase.functions().httpsCallable("kakaoCustomAuth");
  // var kakaoAuth=firebase.functions().httpsCallable("helloworld");
  const [kakaoloading, setKakaoloading] = useState(false)
  async function kakaoCheck(firebaseToken) {
    
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
      setKakaoloading(false)
      setKakaoState(true)
      console.log("old")
      navigation.navigate("Home")
    } else {
      setKakaoloading(false)
      setKakaoState(true)
      console.log("new")
      navigation.navigate("프로필 설정")
    }
  }
  useFocusEffect(
    useCallback(() => {
      console.log("focus")
        setEmailLoading(false)
        return () => {}
    }, [])
)
  async function kakaoLogin() {
    setKakaoloading(true)
    setKakaoState(true)
    console.log("come")
    
    logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(result => {
        const realToken = result.accessToken
        kakaoAuth({ token: realToken }).then(function (res) {
          
          console.log(emailLoading,"emailLoading!!!!!!!!!!")
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

  const [emailLoading, setEmailLoading] = useState(false);
  const [anonyLoading, setAnonyLoading] = useState(false);
  async function signup() {
    setAnonyLoading(true)
    try {
      await ref.where("email", "==", email).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          alert("Email already existed. type another one")
        })
      })
    } catch {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          setAnonyLoading(false)
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            navigation.navigate("로그인")
            Alert.alert(
              "이미 존재하는 아이디입니다.",
              [
                {
                  text: "OK", onPress: () => navigation.navigate("로그인")
                }
              ]
            )
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        })
        var unsubscribe=firebase.auth().onAuthStateChanged(function (user) {
    
        if (user) {
          console.log(user)
          setAnonyLoading(false)
          console.log(user.emailVerified,"emailverified")
          user.sendEmailVerification()
          setEmailLoading(true)
        } else {
          setAnonyLoading(false)
          console.log("없어용~")
        }
        })
        unsubscribe()
    }
  }
// async function EmailVeri() {
  //   await auth().signInWithEmailAndPassword(email, password).then(() => {
  //     const userVerify = auth().currentUser.emailVerified
  //     console.log(userVerify)
  //     console.log("카카오 하이")
  //     console.log('User account created & signed in!')
  //     if (userVerify) {
  //       setEmailLoading(false)
  //       navigation.navigate("프로필 설정")
  //     }
  //     else {
  //       auth().currentUser.delete().then(() => {
  //         setEmailLoading(false)
  //         setEmail("")
  //         setNewpassword("")
  //         setPassword("")
  //         setSignUpState(false)
  //         Alert.alert(
  //           "이메일 인증",
  //           "이메일 인증이 되지 않았습니다.",
  //           [
  //             {
  //               text: "취소",
  //               onPress: () => console.log("취소")
  //             },
  //             {
  //               text: "확인",
  //               onPress: () => console.log("확인")
  //             }
  //           ]
  //         )
  //       })
  //     }
  //   })
  // }

  async function EmailVeri() {
    console.log("이메일 검사입니다 한번만 떠야되는데 ?")
    await auth().currentUser.reload()
    var unsubscribe=firebase.auth().onAuthStateChanged((user) => {
      console.log("흠.;..일단여기 첫ㅂ너째")
      if (user) {
        console.log(user.emailVerified)
        if (user.emailVerified) {
          setEmailLoading(false)
          console.log('User account created & signed in!');
          navigation.navigate("프로필 설정")
        } else {
          console.log(emailLoading,"이게 진짜 true면 레전드")
          setEmailLoading(false)
          console.log("why here!!!!!!!??!sfaesfaefase")
          Alert.alert(
            "이메일 인증",
            "이메일 인증이 되지 않았습니다.",
            [
              {
                text: "취소",
                onPress: () => console.log("취소")
              },
              {
                text: "확인",
                onPress: () => (user.delete(),navigation.navigate("Home"))
              }
            ],
            { cancelable: false }
          )
        
        }
      } else {
        console.log("사용자가 없음")
      }
    })
    unsubscribe()
  }

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

  // async function onFacebookButtonPress() {

  //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }
  //   const dataa = await AccessToken.getCurrentAccessToken();
  //   if (!dataa) {
  //     throw 'Something went wrong obtaining access token';
  //   }
  //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //   const NewUser = (await auth().signInWithCredential(facebookCredential)).additionalUserInfo.isNewUser
  //   if (NewUser === true) {
  //     auth().signInWithCredential(facebookCredential);
  //     navigation.navigate("프로필 설정");
  //   } else if (NewUser === false) {
  //     auth().signInWithCredential(facebookCredential);
  //     navigation.navigate("Home");
  //   }
  // }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '729209347504-nffbltomro80vel8sgdp22h3s7bd34nf.apps.googleusercontent.com',
    });
    if (newpassword === password) {
      if (password === "") {
      } else {
        setpassState(true)
      }
    } else {
      setpassState(false)
      console.log(password, newpassword, "different")
    }
    if (passState === true) {
      setTexts("비밀번호가 일치합니다.")
    } else {
      setTexts("비밀번호가 일치하지 않습니다!")

    }
    if (String(newpassword).length >= 6) {
      setPassLong("확인")
    } else {
      setPassLong("6자리 이상 입력해주세요.")
    }
    if (email.includes("@") && email.includes(".")) {
      setEmailLong("확인")
    } else {
      setEmailLong("유효한 이메일을 입력해 주세요.")

    }
    if (emailLong == "확인" && passState == true && passLong == "확인") {
      setSignUpState(true)
    } else {
      setSignUpState(false)
    }
  })
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {kakaoloading || gmailLoading || anonyLoading ?
          <ActivityIndicator size="large" color="#5cc27b" style={{ position: "absolute", top: HEIGHT / 2 - 20, left: WIDTH / 2 - 20 }} />
          :
          <>
            {emailLoading ===true ?
              <>
            
                <Text style={{ fontFamily: "NunitoSans-Regular", fontSize: 16, position: "absolute", top: HEIGHT / 2 - 40, alignSelf: "center", color: "#303030" }}>3분 이내 이메일 인증 완료해주세요</Text>
                <TouchableOpacity onPress={EmailVeri} style={{ height: 30, backgroundColor: "#5cc27b", position: "absolute", top: HEIGHT / 2 +100, alignSelf: "center", paddingLeft: 10, paddingRight: 10, borderRadius: 8 }}><Text style={{ fontFamily: "NunitoSans-Bold", fontSize: 16, color: "#ffffff" }}>인증 완료</Text></TouchableOpacity>
              </>
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
                      <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>회원가입</Text>
                    </Text>
                  </View>
                </View>
                <ScrollView style={{ paddingTop: 20 }}>
                  <TextInput value={email} onChangeText={text => setEmail(text)} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="이메일 주소" placeholderTextColor="#999999" />
                  <Text style={login.text}>{emailLong}</Text>
                  <TextInput value={newpassword} onChangeText={text => setNewpassword(text)} textContentType="newPassword" secureTextEntry={true} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="비밀번호(영문, 숫자 포함 6자리)" placeholderTextColor="#999999" />
                  <Text style={login.text}>{passLong}</Text>
                  <TextInput value={password} onChangeText={text => setPassword(text)} textContentType="password" secureTextEntry={true} style={[login.textinput, { borderBottomColor: emailtouch }]} placeholder="비밀번호 확인" placeholderTextColor="#999999" />
                  <Text style={login.text}>{texts}</Text>
                  {signUpState ?
                    <TouchableOpacity onPress={signup} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16 }]}>
                      <Text style={login.buttontext}>회원가입</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.3} style={[login.notbuttonbox, { marginTop: 16 }]}>
                      <Text style={login.buttontext}>회원가입</Text>
                    </TouchableOpacity>
                  }
                  <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
                    <Text style={login.signtext}>이미 회원이신가요?</Text>
                  </TouchableOpacity>
                  <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                  {/* <TouchableOpacity onPress={onFacebookButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#4a67ad' }]}>
            <Text style={login.buttontext}>Facebook으로 시작하기</Text>
          </TouchableOpacity> */}
                  <TouchableOpacity onPress={onGoogleButtonPress} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#c45545' }]}>
                    <Text style={login.buttontext}>Gmail로 시작하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity isLoading={loginLoading} onPress={() => kakaoLogin()} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#f6e14b' }]}>
                    <Text style={[login.buttontext, { color: '#303030' }]}>Kakaotalk으로 시작하기</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            }
          </>
        }
      </SafeAreaView>
    </>
  )
}