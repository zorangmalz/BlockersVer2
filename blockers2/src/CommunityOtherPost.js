
import React, { useState } from 'react';
import {
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    Keyboard
} from 'react-native';

export default function CommunityOtherPost({navigation}){
    return(
        <>
<SafeAreaView style={{flex:1,backgroundColor:"white"}}>
    <ScrollView>
        <View style={{flexDirection:"row",justifyContent:"space-between", borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
            <Text style={{marginLeft:16,fontSize:20}}> 브로리 대학원 기원 1일차</Text>
            <Image style={{marginRight:20}} source={require("./icon/alert.png")}></Image>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between", borderBottomColor:"#DDDDDD",borderBottomWidth:1}}>
            <View style={{flexDirection:"row", height:50}}>
            <Image style={{width:26,height:26, borderRadius:30}} source={require("./icon/crispy.jpg")}></Image>
            <Text style={{marginLeft:5,fontSize:20}}> 브로리</Text>
            </View>
            <Text>2020.07.01</Text>
        </View>
        <Image style={{width:"100%",height:330}} source={require("./icon/icecream.jpg")}></Image>
        <Text>브로리 대학원 가즈아아아아아아아ㅏ아!</Text>
        <View style={{alignSelf:"flex-end",flexDirection:"row"}}>
        
        <Image source={require("./icon/greenThumb.png")}></Image>
        <Text>11</Text>
        <Image source={require("./icon/reply.png")}></Image>
        <Text>5</Text>
        </View>
    </ScrollView>
    <View style={{ position:"absolute",
               bottom:0,height:64,right:0,left:0,flexDirection:"row"
            }}>
    <TextInput
             placeholder="댓글을 입력하세요."
             textAlign="left"
             onSubmitEditing={Keyboard.dismiss}
             style={{
               width: "90%",
               height: 40,
               marginRight: 5,
               borderWidth: 1,
               borderColor: '#707070',
               fontSize: 15,
               borderRadius:30,
             }}
           />
           <Image style={{marginTop:15}} source={requirpe("./icon/send.png")}></Image>
           </View>
</SafeAreaView>

        </>
    )
}