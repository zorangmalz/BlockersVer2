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


const diary = { key: 'diary', color: "red" };
const drug = { key: 'drug', color: "yellow" };
const challenge = { key: 'challenge', color: "green" };
const smoke = { key: 'smoke', color: "black" };
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
    const a={
      "hi":[{d:"a"}]
    }
    a["hi"]=a["hi"].push({c:"d"})
    console.log(a)
},[user])
const item={
  
  '2020-07-16': [{ diary: ['1주 1회차 복용일 입니다. 2정을 섭취해 주세요', "hh"] }],
  // "2020-07-17": [{ name: "hi" }],
  // "2020-07-19": [{ name: "hi" }],
  // "2020-07-20": [{ name: "hi" }],
  // "2020-07-25": [{ name: "hi" }],
  // "2020-07-30": [{ name: "hi" }],
}
async function getDiary(){
  console.log(user.uid)
  await firestore().collection("UserInfo").doc(user.uid).collection("Calendar").onSnapshot(querySnapshot=>{
    querySnapshot.forEach(function(doc){
      console.log(doc.data().date)
      item[doc.id]=[{diary:doc.data().diary},{challenge:doc.data().challenge},{smoke:doc.data().smoke},{drug:doc.data().drug1},{drug:doc.data().drug2}]
      
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
              {item.diary ? 
              <>
<View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.diary}</Text>
                            </View>
                            
                </>
                :
                <>

                </>
                }
                {item.challenge ? 
                <>
                <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.challenge}</Text>
                            </View>
                            
                </>
                :
                <></>
                }
                {item.drug ? <>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.drug}</Text>
                            </View>
                            <Text>{item.drug}</Text></> :<></>}
                {item.smoke ? <>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.smoke}</Text>
                            </View>
                            </>:<></>}
                            {item.drug1 ? <>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.drug1}</Text>
                            </View>
                            </>:<></>}
                            {item.drug2 ? <>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text>{item.drug2}</Text>
                            </View>
                            </>:<></>}
                </View>
             ) }}
          renderEmptyDate={() => {    return (
            <View style={styles.emptyDate}>
              <Text>This is empty date!</Text>
            </View>
          );}}
          renderEmptyData = {() => {return (<View style={[styles.item, { height: 50 }]}>
            
          <Text>일정이 없습니다 </Text>
           
        </View>);}}
        
          // markedDates={{

          //   '2020-07-10': { dots: [diary, drug, challenge] },
          //   '2020-07-16': { dots: [drug, challenge], },
          //   '2020-07-20': { dots: [diary, drug, challenge] },
          //   '2020-07-12': { dots: [drug, challenge], },
          //   '2020-07-22': { dots: [diary, drug, challenge] },
          //   '2020-07-28': { dots: [drug, challenge], },
          //   '2020-07-25': { dots: [diary, drug, challenge] },
          //   '2020-07-26': { dots: [drug, challenge], }
          // }}
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
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