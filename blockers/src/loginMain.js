import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

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

export default function LoginMain({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '729209347504-uu57rajsk3d7j5utahu34d4d67tqcgdl.apps.googleusercontent.com',
          });
    })
    function logins(){
        console.log("here")
        auth().signInWithEmailAndPassword(email, password).then(()=> {
            navigation.navigate("Home")
        }).catch(error=>{
            console.log("!!!")
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              console.log(errorMessage)
                alert(errorMessage);
            }
            console.log(error);
        });
           
    }


    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView style={{ paddingTop: 20 }}>
                    <TextInput value={email} onChangeText={text => setEmail(text)} style={login.textinput} placeholder="이메일 주소" placeholderTextColor="#999999" />
                    <Text style={login.text}>유효한 이메일을 입력해 주세요.</Text>
                    <TextInput value={password} onChangeText={text => setPassword(text)} textContentType="password" secureTextEntry={true} style={login.textinput} placeholder="비밀번호(영문, 숫자 포함 8자리)" placeholderTextColor="#999999" />
                    <Text style={login.text}>8자리 이상 입력해주세요.</Text>
                    <TouchableOpacity onPress={logins} activeOpacity={0.3} style={[login.buttonbox, {marginTop: 16}]}>
                        <Text style={login.buttontext}>로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('아이디/비밀번호 찾기')}>
                        <Text style={login.signtext}>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <View style={{ width: "90%", height: 0.2, borderWidth: 0.2, borderColor: '#C6C6C6', alignSelf: 'center' }} />
                    <TouchableOpacity activeOpacity={0.3} style={[login.buttonbox, {marginTop: 16, backgroundColor: '#4a67ad'}]}>
                        <Text style={login.buttontext}>Facebook으로 시작하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} style={[login.buttonbox, {marginTop: 16, backgroundColor: '#c45545'}]}>
                        <Text style={login.buttontext}>Gmail로 시작하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} style={[login.buttonbox, {marginTop: 16, backgroundColor: '#f6e14b'}]}>
                        <Text style={[login.buttontext, {color: '#000000'}]}>Kakaotalk으로 시작하기</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}