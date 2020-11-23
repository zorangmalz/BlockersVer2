/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import "./global"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/HomeScreen';
import SettingMain from './src/SettingMain';
import SettingQuestion from './src/SettingQuestion';
import SettingAlram from './src/SettingAlram';
import SettingReset from './src/SettingReset';
import SettingVersion from './src/SettingVersion';
import SettingResetComplete from './src/SettingResetComplete';
import SettingExit from './src/SettingExit';
import SettingExitComplete from './src/SettingExitComplete';
import SettingOften from './src/SettingOften';
import WalletTransaction from './src/WalletTransaction';
import WalletCharge from './src/WalletCharge';
import { WalletWithdrawal, WalletWithdrawlComplete } from './src/WalletWithdrawal';
import { WalletPassword } from './src/WalletPassword';
import CommunityClick from './src/CommunityClick';
import CommunityOtherPost from './src/CommunityOtherPost';
import Calendars from './src/Calendar';
import MyPageScreen from './src/MyPageScreen';
import Notification from './src/Notification';
import ProfileMain from './src/ProfileMain';
import ProfilePasswordChange from './src/ProfilePasswordChange';
import MyPageRule from './src/MypageRule';
import AddressFind from './src/AddressFind';
import CommunityWrite from './src/CommunityWrite';
import MypageMyWriting from './src/MypageMyWriting';
import LoginSignup from './src/LoginSignup';
import LoginMain from './src/LoginMain';
import LoginFind from './src/LoginFind';
import LoginVerification from './src/LoginVerification';
import LoginFindId from './src/LoginFindId';
import Challenge, { ChallengeVeriResult,ChallengeMotivationResult,ChallengeGD, ChallengeGDResult, ChallengeHistory, ChallengeKnowhow, ChallengeMission, ChallengeMotivation, ChallengeRegister, ChallengeReview, ChallengeSuccess, ChallengeSupport, ChallengeSwear, ChallengeVeri, ChallengeVeriImage,ChallengeSwearResult } from './src/Challenge/ChallengeScreen';
import ProfileNickname from './src/ProfileNickname';
import LoginVerificationProfile from './src/LoginVerificationProfile';
import LoginPassword from "./src/LoginPassword";
import SolutionMain from './src/SolutionMain';
import SplashScreen from './src/Splashscreen';
import SettingCompanyInfo from  "./src/CompanyInfo";
import ModeSelect from './src/ModeSelect';
import ModeSelectSmoker from './src/ModeSelectSmoker';
import ModeSelectNonSmoker from './src/ModeSelectNonSmoker';
import PersonalInformation from "./src/PersonalInformation";
import Personal from "./src/Personal";
import TermsOfUse from "./src/TermsOfUse";
import Zero, { One, Two, Three, Four, Five, Six, Seven, Eight, Nine } from './src/SelfEsteem/SelfEsteemScreen';
import SOne, { STwo, SThree, SFour, SFive, SSix, SSeven, SEight, SNine, STen, SEleven, STwelve,SThirteen } from './src/Stress/StressScreen';
import AOne, { AThree, AFour, AFive, ASix, ASeven, AEight, ANine } from './src/Alcohol/AlcoholScreen';
import { SelfEsteemFinal, SelfEsteemMain } from './src/SelfEsteem/Style';
import { AlcoholFinal, AlcoholMain } from './src/Alcohol/Style';
import { StressFinal, StressMain } from './src/Stress/Style';
import StressResult from './src/Stress/StressResult'
import AlcoholResult from './src/Alcohol/AlcoholResult'
import SelfEsteemResult from './src/SelfEsteem/SelfEsteemResult'
import DiaryWrite, { DiaryList } from './src/Diary/DiaryScreen';
import ChatbotMain, { ChatbotOne, ChatbotThree, ChatbotTwo,ChatbotFour,ChatbotCham,ChatbotWell } from './src/Chatbot/ChatbotScreen';
import SmokeAlertOne, { SmokeAlertFour, SmokeAlertThree, SmokeAlertTwo } from './src/SmokeAlert/SmokeAlert';
import SolutionAOne from './src/SolutionAOne';
import SolutionATwo from './src/SolutionATwo';
import SolutionAThree from './src/SolutionAThree';
import SolutionBOne from './src/SolutionBOne';
import SolutionBTwo from './src/SolutionBTwo';
import SolutionBThree from './src/SolutionBThree';
import SolutionCOne from './src/SolutionCOne';
import SolutionCTwo from './src/SolutionCTwo';
import SolutionCThree from './src/SolutionCThree';
import SolutionDOne from './src/SolutionDOne';
import SolutionDTwo from './src/SolutionDTwo';
import SolutionDThree from './src/SolutionDThree';
import SolutionEOne from './src/SolutionEOne';
import SolutionETwo from './src/SolutionETwo';
import SolutionEThree from './src/SolutionEThree';
import SolutionFOne from './src/SolutionFOne';
import SolutionFTwo from './src/SolutionFTwo';
import SolutionFThree from './src/SolutionFThree';
import SolutionGOne from './src/SolutionGOne';
import SolutionGTwo from './src/SolutionGTwo';
import SolutionGThree from './src/SolutionGThree';
import SolutionSmoke from './src/SolutionSmoke';
import SolutionSmokeOne from './src/SolutionSmokeOne';
import SolutionSmokeTwo from './src/SolutionSmokeTwo';
import SolutionSmokeThree from './src/SolutionSmokeThree';
import SolutionSmokeResult from './src/SolutionSmokeResult';
import SolutionResult from './src/SolutionResult';
import NicotineResult from "./src/NicotineResult";
import AlramScreen from './src/AlramScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeTab({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            return <Ionicons name={iconName} size={25} color={color} />;
          } else if (route.name === 'ChallengeTab') {
            iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
            return <Ionicons name={iconName} size={25} color={color} /> 
          } else if (route.name === 'CommunityScreen') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
            return <Ionicons name={iconName} size={25} color={color} />
          } else if (route.name === 'MyPageScreen') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
            return <Ionicons name={iconName} size={25} color={color}/>
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5cc27b',
        inactiveTintColor: '#5cc27b',
        showLabel: false
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        name="ChallengeTab"
        component={Challenge}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityClick}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
      />
    </Tab.Navigator>
  )
}

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
       
        <Stack.Screen
          name="주소찾기"
          component={AddressFind}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendars}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Transaction"
          component={WalletTransaction}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="입금"
          component={WalletCharge}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="WalletWithDrawal"
          component={WalletWithdrawal}
          options={{
            headerTitle: "출금",
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="WalletWithDrawlComplete"
          component={WalletWithdrawlComplete}
          options={{
            headerTitle: "출금",
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="WalletPassword"
          component={WalletPassword}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="개인정보"
          component={ProfileMain}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="지갑 비밀번호 변경"
          component={ProfilePasswordChange}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="닉네임 변경"
          component={ProfileNickname}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="공지사항"
          component={Notification}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="내가 쓴글"
          component={MypageMyWriting}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="이용약관"
          component={MyPageRule}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CommunityOtherPost"
          component={CommunityOtherPost}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="작성하기"
          component={CommunityWrite}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="회원가입"
          component={LoginSignup}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="로그인"
          component={LoginMain}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="아이디/비밀번호 찾기"
          component={LoginFind}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="본인인증"
          component={LoginVerification}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="프로필 설정"
          component={LoginVerificationProfile}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="아이디 찾기"
          component={LoginFindId}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="LoginPassword"
          component={LoginPassword}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SolutionMain"
          component={SolutionMain}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="설정"
          component={SettingMain}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="문의하기"
          component={SettingQuestion}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="알림설정"
          component={SettingAlram}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="초기화"
          component={SettingReset}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="ResetComplete"
          component={SettingResetComplete}
          options={{
            headerTitle: "초기화",
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="버전정보"
          component={SettingVersion}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="탈퇴"
          component={SettingExit}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="SettingResetComplete"
          component={SettingExitComplete}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="자주묻는 질문"
          component={SettingOften}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="회사소개"
          component={SettingCompanyInfo}
          options={{
            headerShown: false,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="ModeSelect"
          component={ModeSelect}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ModeSelectSmoker"
          component={ModeSelectSmoker}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="정보"
          component={PersonalInformation}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="서비스 이용 약관"
          component={TermsOfUse}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="개인정보처리방침"
          component={Personal}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ModeSelectNonSmoker"
          component={ModeSelectNonSmoker}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemMain"
          component={SelfEsteemMain}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemZero"
          component={Zero}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemOne"
          component={One}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemTwo"
          component={Two}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemThree"
          component={Three}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemFour"
          component={Four}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemFive"
          component={Five}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemSix"
          component={Six}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemSeven"
          component={Seven}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemEight"
          component={Eight}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SelfEsteemNine"
          component={Nine}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressMain"
          component={StressMain}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />

         <Stack.Screen
          name="AlcoholResult"
          component={AlcoholResult}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
         <Stack.Screen
          name="StressResult"
          component={StressResult}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
         <Stack.Screen
          name="SelfEsteemResult"
          component={SelfEsteemResult}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="StressOne"
          component={SOne}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressTwo"
          component={STwo}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressThree"
          component={SThree}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressFour"
          component={SFour}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressFive"
          component={SFive}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressSix"
          component={SSix}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressSeven"
          component={SSeven}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressEight"
          component={SEight}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressNine"
          component={SNine}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressTen"
          component={STen}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressEleven"
          component={SEleven}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StressTwelve"
          component={STwelve}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
         <Stack.Screen
          name="StressThirteen"
          component={SThirteen}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholMain"
          component={AlcoholMain}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholOne"
          component={AOne}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
     
        <Stack.Screen
          name="AlcoholThree"
          component={AThree}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholFour"
          component={AFour}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholFive"
          component={AFive}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholSix"
          component={ASix}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholSeven"
          component={ASeven}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholEight"
          component={AEight}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="AlcoholNine"
          component={ANine}
          options={{
            gestureDirection: "vertical-inverted",
            headerShown: false
          }}
        />
        <Stack.Screen 
            name="DiaryWrite"
            component={DiaryWrite}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="DiaryList"
            component={DiaryList}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeSupport"
            component={ChallengeSupport}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeSwear"
            component={ChallengeSwear}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeSwearResult"
            component={ChallengeSwearResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeHistory"
            component={ChallengeHistory}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeMission"
            component={ChallengeMission}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeRegister"
            component={ChallengeRegister}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeMotivation"
            component={ChallengeMotivation}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
             <Stack.Screen 
            name="ChallengeMotivationResult"
            component={ChallengeMotivationResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeVeri"
            component={ChallengeVeri}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeVeriImage"
            component={ChallengeVeriImage}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeVeriResult"
            component={ChallengeVeriResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeReview"
            component={ChallengeReview}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeKnowhow"
            component={ChallengeKnowhow}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeSuccess"
            component={ChallengeSuccess}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeGD"
            component={ChallengeGD}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChallengeGDResult"
            component={ChallengeGDResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChatbotMain"
            component={ChatbotMain}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChatbotOne"
            component={ChatbotOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChatbotTwo"
            component={ChatbotTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ChatbotThree"
            component={ChatbotThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="ChatbotFour"
            component={ChatbotFour}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
            <Stack.Screen 
            name="ChatbotWell"
            component={ChatbotWell}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
            <Stack.Screen 
            name="ChatbotCham"
            component={ChatbotCham}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SmokeAlertOne"
            component={SmokeAlertOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SmokeAlertTwo"
            component={SmokeAlertTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SmokeAlertThree"
            component={SmokeAlertThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SmokeAlertFour"
            component={SmokeAlertFour}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="AlcoholFinal"
            component={AlcoholFinal}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="StressFinal"
            component={StressFinal}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SelfEsteemFinal"
            component={SelfEsteemFinal}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionAOne"
            component={SolutionAOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionATwo"
            component={SolutionATwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionAThree"
            component={SolutionAThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionBOne"
            component={SolutionBOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionBTwo"
            component={SolutionBTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="SolutionBThree"
            component={SolutionBThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="SolutionCOne"
            component={SolutionCOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="SolutionCTwo"
            component={SolutionCTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="SolutionCThree"
            component={SolutionCThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="SolutionDOne"
            component={SolutionDOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionDTwo"
            component={SolutionDTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionDThree"
            component={SolutionDThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionEOne"
            component={SolutionEOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionETwo"
            component={SolutionETwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionEThree"
            component={SolutionEThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionFOne"
            component={SolutionFOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionFTwo"
            component={SolutionFTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionFThree"
            component={SolutionFThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionGOne"
            component={SolutionGOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionGTwo"
            component={SolutionGTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionGThree"
            component={SolutionGThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionSmoke"
            component={SolutionSmoke}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionSmokeOne"
            component={SolutionSmokeOne}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionSmokeTwo"
            component={SolutionSmokeTwo}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionSmokeThree"
            component={SolutionSmokeThree}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionSmokeResult"
            component={SolutionSmokeResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SolutionResult"
            component={SolutionResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
           <Stack.Screen 
            name="NicotineResult"
            component={NicotineResult}
            options={{
              gestureDirection: "vertical-inverted",
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="AlramScreen"
            component={AlramScreen}
            options={{
              gestureDirection: "horizontal-inverted",
              headerShown: false
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;