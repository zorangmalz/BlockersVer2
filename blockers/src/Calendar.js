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


// const diary = { key: 'diary', color: "red" };
// const drug = { key: 'drug', color: "yellow" };
// const challenge = { key: 'challenge', color: "green" };
// const smoke = { key: 'smoke', color: "black" };
const styles = {
  item: {
    backgroundColor: 'white',
    flex: 2,
    
    paddingLeft:10,
    
    marginRight: 10,
    marginTop: 5
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
    
},[user])
const item={}
async function getDiary(){
  console.log(user.uid)
  
  await firestore().collection("UserInfo").doc(user.uid).collection("Calendar").onSnapshot(querySnapshot=>{
    querySnapshot.forEach(function(doc){
      var a=doc.id
      // console.log(a)
      // console.log(doc.data().smoke,"smoke")
      item[a]=new Array()
      if(doc.data().diary){
        item[a].push({diary:doc.data().diary})
      }
      if(doc.data().challenge){
        item[a].push({challenge:doc.data().challenge})
      }
      if(doc.data().smoke){
        item[a].push({smoke:doc.data().smoke})
      }
      if(doc.data().drugA){
        item[a].push({drugA:doc.data().drugA})
      }
      if(doc.data().drugB){
        item[a].push({drugB:doc.data().drugB})
      }
      
      
      
      
      // item[doc.id]=[{diary:doc.data().diary},{challenge:doc.data().challenge},{smoke:doc.data().smoke},{drugA:doc.data().drugA},{drugB:doc.data().drugB}]
      
      // console.log(item)
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
            return (<>
            
              {item.diary ? 
              <>
              <View style={[styles.item, ]}>
<View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                marginBottom:10}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#fb5757",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            
                            <Text style={{fontFamily:"NunitoSans-Bold"}}>일기</Text>
                            </View>    
                            <Text>{item.diary}</Text>
                            </View>
                </>
                :
                <>

                </>
                }
                {item.challenge ? 
                <>
                <View style={[styles.item, ]}>
                <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                marginBottom:10}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#5cc27b",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            <Text style={{fontFamily:"NunitoSans-Bold"}}>챌린지</Text>
                            
                            </View>
                            <Text>{item.challenge}</Text>
                            </View>
                </>
                :
                <></>
                }
          
                {item.smoke ? <>
                  <View style={[styles.item, ]}>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                marginBottom:10}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#303030",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            <Text style={{fontFamily:"NunitoSans-Bold"}}>흡연</Text>
                           
                            </View>
                            <Text>{item.smoke}</Text>
                            </View>
                            </>:<></>}
                            {item.drugA ? <>
                              <View style={[styles.item, ]}>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                marginBottom:10}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#ffb83d",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            <Text style={{fontFamily:"NunitoSans-Bold"}}>복약(부프로피온)</Text>
                            
                            </View>
                            <Text>{item.drugA}</Text>
                            </View>
                            </>:<></>}
                            {item.drugB ? <>
                              <View style={[styles.item, ]}>
                  <View style={{ flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                marginBottom:10}}>
                  <View style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "#ffb83d",
                                borderRadius: 4,
                                marginRight: 8
                            }} />
                            <Text style={{fontFamily:"NunitoSans-Bold"}}>복약(챔픽스 정)</Text>
                            
                            </View>
                            <Text>{item.drugB}</Text>
                            </View>
                   
                            </>:<></>}
                            
                </>
                
             ) }}
          // renderEmptyDate={() => {    return (
          //   <View style={styles.emptyDate}>
          //     <Text>This is empty date!</Text>
          //   </View>
          // );}}
          renderEmptyData = {() => {return (<View style={[styles.item, { height: 10 }]}>
            
          <Text>일정이 없습니다 </Text>
           
        </View>);}}
      markedDates={{}}
      
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
          
          theme={{
            
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'black',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue',
            
          }}
        />
      </SafeAreaView>
    </>
  )
}