import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';

const style = StyleSheet.create({
  logo: {
    fontFamily: 'Metropolis-Bold',
    color: '#303030',
    fontSize: 40,
    marginBottom: 20
  },
  box: {
    width: 315,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  text: {
    fontFamily: 'Metropolis-Bold',
    fontSize: 16,
    color: '#ffffff'
  },
  color: {
    color: '#303030'
  },
  textinput: {
    width: '80%',
    alignSelf: 'center',
    height: 55,
    fontFamily: 'Metropolis-Regular',
    fontSize: 16,
    color: '#303030',
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  }
})

function SignScreen({navigation}) {
  const [accountvisible, setAccountvisible] = useState(false);
  const [signvisible, setSignvisible] = useState(false);
  const [walletvisible, setWalletvisible] = useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EFEFEF', alignItems: 'center', justifyContent: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={accountvisible}
          onRequestClose={() => setAccountvisible(!accountvisible)}
        >
          <View style={{ flex: 1, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: 'space-between' }}>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, width: "100%", paddingLeft: "5%", paddingRight: "5%", marginTop: 32 }}>
              <Text style={style.logo}>Y.</Text>
            </View>
            <View style={{
              width: "100%",
              height: 557,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: '#ffffff',
              alignItems: 'center',
            }}>
              <Text style={[style.text, { color: '#161513', fontSize: 24, marginTop: 26, marginBottom: 48 }]}>Create account</Text>
              <Image source={require('./icon/social.png')} />
              <Text style={[style.text, { color: '#161513', fontSize: 16, marginTop: 16, marginBottom: 16 }]}>or</Text>
              <TextInput placeholder="Email Address" placeholderTextColor="#D2D3D3" style={style.textinput} />
              <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
              <TextInput placeholder="Password Confirm" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
              <TouchableOpacity onPress={() => {setAccountvisible(false)}} style={[style.box, { backgroundColor: '#202426' }]}>
                <Text style={style.text}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={signvisible}
          onRequestClose={() => setSignvisible(!signvisible)}
        >
          <View style={{ flex: 1, backgroundColor: '#B7B7B7', alignItems: 'center', justifyContent: 'space-between' }}>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 70, width: "100%", paddingLeft: "5%", paddingRight: "5%", marginTop: 32 }}>
              <Text style={style.logo}>Y.</Text>
            </View>
            <View style={{
              width: "100%",
              height: 557,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: '#ffffff',
              alignItems: 'center',
            }}>
              <Text style={[style.text, { color: '#161513', fontSize: 24, marginTop: 26, marginBottom: 48 }]}>{walletvisible === false ? 'Sign In' : 'Wallet Connect'}</Text>
              {walletvisible === false ?
                <>
                  <Image source={require('./icon/social.png')} />
                  <Text style={[style.text, { color: '#161513', fontSize: 16, marginTop: 16, marginBottom: 16 }]}>or</Text>
                  <TextInput placeholder="Email Address" placeholderTextColor="#D2D3D3" style={style.textinput} />
                  <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#D2D3D3" style={style.textinput} />
                  <View style={{ height: 75, width: 50 }} />
                </>
                :
                <>
                  <Image style={{marginBottom: 109, marginTop: 17}} source={require('./icon/walletconnect.png')} />
                </>
              }
              {walletvisible === false ?
                <TouchableOpacity onPress={() => setWalletvisible(!walletvisible)} style={style.box}>
                  <Text style={[style.text, { color: '#161513' }]}>Sign In</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[style.box, {height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                  <Image source={require('./icon/klaytn.png')} />
                  <Text style={[style.text, { color: '#161513', marginLeft: 20 }]}>Connect to Klaytn</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        </Modal>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={[style.logo, { marginBottom: 4 }]}>Y.</Text>
          <Image source={require('./icon/start.png')} />
        </View>
        <View style={{
          position: 'absolute',
          bottom: 0,
          width: "100%",
          height: 232,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => setAccountvisible(true)} style={[style.box, { backgroundColor: '#202426' }]}>
            <Text style={style.text}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSignvisible(true)} style={style.box}>
            <Text style={[style.text, style.color]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignScreen;