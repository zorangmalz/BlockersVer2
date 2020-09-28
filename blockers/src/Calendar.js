import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React, { useState } from 'react';
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
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={35} />
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
            <Text style={{ fontSize: 24 }}>
              <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>Calendar</Text>
            </Text>
          </View>
        </View>
        <Agenda
          items={{
            '2020-07-16': [{ name: ['1주 1회차 복용일 입니다. 2정을 섭취해 주세요', "hh"] }],
            "2020-07-17": [{ name: "hi" }],
            "2020-07-19": [{ name: "hi" }],
            "2020-07-20": [{ name: "hi" }],
            "2020-07-25": [{ name: "hi" }],
            "2020-07-30": [{ name: "hi" }],
          }}

          renderDay={(day, item) => {
            return (<View>
              <Text style={{ fontSize: 20 }}>{day.day}</Text>

            </View>);
          }}
          renderItem={(item, firstItemInDay) => {
            return (<View style={[styles.item, { height: 300 }]}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("./icon/lightbulb.png")} />
                <Text>복약(챔픽스 정)</Text>
              </View>
              <Text>{item.name[0]}</Text>
              <Text>{item.name[1]}</Text>
            </View>);
          }}
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
            agendaDayNumColor: "yellow"
          }}
        />
      </SafeAreaView>
    </>
  )
}