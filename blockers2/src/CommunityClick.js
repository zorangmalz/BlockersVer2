
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

const styles={
    image:{
        width:"100%"
    },
    board:{
        flex:1,
        height:120,
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
    },
    bigFont:{
        marginLeft:24,
        marginTop:8,
        
  height: 22,
  fontSize: 16,
  fontWeight:"bold"
    }
}
export default function CommunityClick({navigation}){
    return(
        <>
        <SafeAreaView>
                <ScrollView >
                    <Text>자유게시판^^</Text>
                <View style={{ alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
            <TextInput
             
              keyboardType="number-pad"
              placeholder="검색어를 입력하세요"
              textAlign="left"
              onSubmitEditing={Keyboard.dismiss}
              style={{
                width: 171,
                height: 40,
                marginRight: 5,
                borderWidth: 1,
                borderColor: '#707070',
                fontSize: 15,
                borderRadius:30
              }}
            />
            <Image style={{width:40,height:40}} source={require("./icon/lightbulb.png")}></Image>
         </View>
        <View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View>
        <View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View><View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View><View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View><View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View><View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View><View style={styles.board}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View>
        <Text style={styles.bigFont}>
           근데 ㄹㅇ 금연 왜함? 노이해
        </Text>
        
        
        <Text style={{marginLeft:24,marginTop:8}}>
            흡연 10년차다 시발 걍 담배 평생필련다~
        </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            
<Text style={{marginLeft:24,marginTop:8}}>김현명</Text>
<Text style={{marginLeft:24,marginTop:8}}>방금전</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>10</Text>
<Image source={require("./icon/lightbulb.png")}></Image><Text>1</Text>
</View>
</View>
<Image style={{width:76,height:100}} source={require("./icon/crispy.jpg")}></Image>
        </View>

        </View>
        </ScrollView>
        
        <Image style={{width:36,height:36,position:"absolute",bottom:97,marginLeft:"70%"}} source={require("./icon/lightbulb.png")}></Image>
        
        </SafeAreaView>
        </>
    )
}