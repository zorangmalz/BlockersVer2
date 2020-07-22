import React, { useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Button,
    TouchableHighlight,
    Clipboard
} from 'react-native';


const style = StyleSheet.create({
    container : {
        marginBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    profile:{
        fontSize: 20,
        fontWeight:"bold",
        marginLeft:10,
        marginBottom:5,
        marginTop:10
    },
    title: {
        fontSize: 20,
        fontWeight:"bold",
        marginTop:15,
        marginLeft:10
      },
      box:{
        borderBottomWidth:1,
        borderColor:"#DDDDDD",
      },
      images:{
     
        height:68,
        width:68,
        marginLeft:10,
        marginBottom:30,
        marginTop:10
        
      },
      item:{
        fontSize: 20,
        marginTop:15,
        marginLeft:10,
        marginBottom:5
      },
      containerStatus: {
        margin:15,
        flex:3,
        backgroundColor:"#333953",
        height:140,
        borderRadius:10,
        
      },
   
    fontText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#79808c'
    },
    fontSubTitle: {
        fontSize: 21,
        fontWeight: '600',
        marginLeft: 10,
        color: '#79808c'
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        marginLeft:62,
        backgroundColor: '#48d1cc'
    },
    clipboard:{
        height:20,
        width:16,
        marginTop:20,
        marginLeft:8
    }
})

export default function Rule() {
    const [copiedText, setCopiedText] = useState('')

    const copyToClipboard = () => {
      Clipboard.setString('hello world')
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <ScrollView style={style.container}>
                    <View
                        accessibilityRole="header"
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 4,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 24 }}>
                            
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>이용약관</Text>
                        </Text>
                        
                    </View>
                   


                </ScrollView>
            </SafeAreaView>
        </>
    )
}

// {title:"Profile", key: "LV.5", key2:"Blockers01",images:'./icon/alram.png'},
//           {title:"이름", key: "김현명", key2:""},
//           {title:"생년월일", key: '1995.12.28', key2:""},
//           {title:"휴대폰번호", key: '010-4337-6607', key2:""},
//           {title:"비밀번호 재설정", key: '어휴 까먹었냐', key2:""},
//           {title:"추천인 코드", key: 'ABCE234', key2:""},
//           {title:"추천인 링크", key: 'Bit/ly.cl1929', key2:""},
