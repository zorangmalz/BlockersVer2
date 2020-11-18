import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';


const diary = { key: 'diary', color: "green" };
const drug = { key: 'drug', color: "yellow" };
const challenge = { key: 'challenge', color: "red" };
const styles = {
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
}

export default function Calendars({ navigation }) {
const [user,setUser]=useState("")
  useEffect(() => {
    auth().onAuthStateChanged(userAuth => {
        setUser(userAuth)
    })
    
    // item["2020-11-16"]=[{dic:"hi"}]
    if(user){
    getDiary()}
    item["2020-11-19"]=[{name:"hi"},{dic:"hellp"}]
    console.log(item["2020-11-19"].name)
    console.log(item["2020-11-19"].dic)
},[user])
const item={
  
  // '2020-07-16': [{ name: ['1주 1회차 복용일 입니다. 2정을 섭취해 주세요', "hh"] }],
  // "2020-07-17": [{ name: "hi" }],
  // "2020-07-19": [{ name: "hi" }],
  // "2020-07-20": [{ name: "hi" }],
  // "2020-07-25": [{ name: "hi" }],
  // "2020-07-30": [{ name: "hi" }],
}
async function getDiary(){
  console.log(user.uid)
  await firestore().collection("UserInfo").doc(user.uid).collection("Diary").onSnapshot(querySnapshot=>{
    querySnapshot.forEach(function(doc){
      console.log(doc.data().date)
      item[doc.data().date]=[{name:["일기","일기 작성"]}]
      
      console.log(item)
    })

  })
}
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", marginBottom: 16 }}>
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
              <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Calendar</Text>
            </Text>
          </View>
        </View>
        <Agenda
          items={item}
          renderItem={(item, firstItemInDay) => {
            return (<View style={[styles.item, { height: 50 }]}>
              <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                
                {item.name[0]==="일기" ? 
                <>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            <Text>{item.name[0]}</Text>
                </>
                :
                (item.name[0]==="흡연" ? 
                <>
                   <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#303030",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                </>
                :
                (item.name[0]==="챌린지" ? 
                <></>
                :
                <></>
                )
                )
                }
              </View>
              <Text>{item.name[1]}</Text>
              {item.dic[0] ? 
              <>
              <Text>{item.dic[0]}</Text>
              </>
              
              :
              <></>}
              
            </View>);
          }}
          renderEmptyDate={() => {    return (
            <View style={styles.emptyDate}>
              <Text>This is empty date!</Text>
            </View>
          );}}
          renderEmptyData = {() => {return (<View style={[styles.item, { height: 50 }]}>
            
            <Image source={require("./icon/lightbulb.png")} />
           
        </View>);}}
        
          markedDates={{

            '2020-07-10': { dots: [diary, drug, challenge] },
            '2020-07-16': { dots: [drug, challenge], },
            '2020-07-20': { dots: [diary, drug, challenge] },
            '2020-07-12': { dots: [drug, challenge], },
            '2020-07-22': { dots: [diary, drug, challenge] },
            '2020-07-28': { dots: [drug, challenge], },
            '2020-07-25': { dots: [diary, drug, challenge] },
            '2020-07-26': { dots: [drug, challenge], }
          }}
          markingType={"multi-dot"}
          theme={{
            
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}
        />
      </SafeAreaView>
    </>
  )
}