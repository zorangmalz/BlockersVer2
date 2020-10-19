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
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/functions';
import { Extrapolate } from 'react-native-reanimated';
// import { kakaoCustomAuth } from '../functions';


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


  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [unlinkLoading, setUnlinkLoading] = useState(false);
  const [user,setUser]=useState();
  // const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  var kakaoAuth=firebase.functions().httpsCallable("kakaoCustomAuth");
  // var kakaoAuth=firebase.functions().httpsCallable("helloworld");
async function kakaoCheck(firebaseToken){
const user= await auth().signInWithCustomToken(firebaseToken)
console.log(user)
let check=false
await firestore()
            .collection('UserInfo')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                  if(doc.id===user.user.uid){
                    check=true
                  }
                    
                })
            })
  if (check){
    console.log("old")
    navigation.navigate("Home")
  }else{
    console.log("new")
    navigation.navigate("WalletPassword")
  }
}
  async function kakaoLogin(){
    console.log("come")
    logCallback('Login Start', setLoginLoading(true));
     KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then(result => {
        const realToken=result.accessToken
         kakaoAuth({token:realToken}).then(function(res){
        kakaoCheck(res.data.firebase_token)
       
        // kakaoGetProfile()
        }).catch(err=>{
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
  const kakaoGetProfile = () => {
    logCallback('Get Profile Start', setProfileLoading(true));

    KakaoLogins.getProfile()
      .then(result => {
        setProfile(result);
        logCallback(
          `Get Profile Finished:${JSON.stringify(result)}`,
          setProfileLoading(false),
        );
      })
      .catch(err => {
        logCallback(
          `Get Profile Failed:${err.code} ${err.message}`,
          setProfileLoading(false),
        );
      });
  };

  async function signup() {
    try {
      await ref.where("email", "==", email).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          alert("Email already existed. type another one")
        })
      })
    } catch {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate("WalletPassword")
        })
        .catch(error => {
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
        });
    }

  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const NewUser = (await auth().signInWithCredential(googleCredential)).additionalUserInfo.isNewUser
    // Sign-in the user with the credential
    if (NewUser === true) {
      auth().signInWithCredential(googleCredential);
      navigation.navigate("WalletPassword");
    } else if (NewUser === false) {
      auth().signInWithCredential(googleCredential);
      navigation.navigate("Home");
    }
  }

  async function onFacebookButtonPress() {

    const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const dataa = await AccessToken.getCurrentAccessToken();
    if (!dataa) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    const NewUser = (await auth().signInWithCredential(facebookCredential)).additionalUserInfo.isNewUser
    if (NewUser === true) {
      auth().signInWithCredential(facebookCredential);
      navigation.navigate("WalletPassword");
    } else if (NewUser === false) {
      auth().signInWithCredential(facebookCredential);
      navigation.navigate("Home");
    }
  }

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
      setTexts("비밀번호가 일치합니다")
      console.log("wow!!same!")
    } else {
      setTexts("비밀번호가 일치하지 않습니다!!")
      
    }
  })
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
          <TouchableOpacity isLoading={loginLoading} onPress={() => kakaoLogin()} activeOpacity={0.3} style={[login.buttonbox, { marginTop: 16, backgroundColor: '#f6e14b' }]}>
            <Text style={[login.buttontext, { color: '#303030' }]}>Kakaotalk으로 시작하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}