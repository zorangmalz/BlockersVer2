/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import "./global"
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './src/homeScreen';
import MissionScreen from './src/missionScreen';
import ChallengeMain from './src/challengeMain';
import ChallengeResisterOne from './src/challengeResisterOne';
import ChallengeResisterTwo from './src/challengeResisterTwo';
// import ChallengeConfirm from './src/challengeConfirm';
import ChallengeVerification from './src/challengeVerification';
import SettingMain from './src/settingMain';
import SettingQuestion from './src/settingQuestion';
import SettingAlram from './src/settingAlram';
import SettingReset from './src/settingReset';
import SettingVersion from './src/settingVersion';
import SettingResetComplete from './src/settingResetComplete';
import SettingExit from './src/settingExit';
import SettingExitComplete from './src/settingExitComplete';
import SettingOften from './src/settingOften';
import WalletTransaction from './src/walletTransaction';
import WalletCharge from './src/walletCharge';
import { WalletWithdrawal, WalletWithdrawlComplete } from './src/walletWithdrawal';
import { WalletPassword } from './src/walletPassword';
import CommunityHome from './src/Community';
import CommunityClick from './src/CommunityClick';
import CommunityOtherPost from './src/CommunityOtherPost';
import MarketHome from './src/MarketHome';
import MarketContentsList from './src/MarketContentsList';
import ContentsInfo from './src/ContentsInfo'
import ContentsBuy from './src/ContentsBuy';
import Calendars from './src/Calendar';
import MyPageScreen from './src/MyPageScreen';
import Notification from './src/Notification';
import ProfileMain from './src/profileMain';
import ProfilePasswordChange from './src/profilePasswordChange';
import MyPageRule from './src/mypageRule';
import AddressFind from './src/addressFind';
import CommunityWrite from './src/CommunityWrite';
import MypageMyWriting from './src/mypageMyWriting';
import LoginSignup from './src/loginSignup';
import LoginMain from './src/loginMain';
import LoginFind from './src/loginFind';
import LoginVerification from './src/loginVerification';
import LoginFindId from './src/loginFindId';
import ContentsComplete from './src/ContentsComplete';
import ProfileNickname from './src/profileNickname';
import LoginVerificationProfile from './src/loginVerificationProfile';
import LoginPassword from "./src/loginPassword";
import SolutionMain from './src/solutionMain';
import SplashScreen from './src/splashscreen';
import SettingCompanyInfo from  "./src/companyInfo";
import InformationMain from './src/informationMain';
import InformationNonReport from './src/informationNonReport';
import ModeSelect from './src/modeSelect';
import ModeSelectSmoker from './src/modeSelectSmoker';
import ModeSelectNonSmoker from './src/modeSelectNonSmoker';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ChallengeScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChallengeMain"
        component={ChallengeMain}
        options={{
          gestureDirection: 'vertical-inverted',
        }}
      />
      <Stack.Screen
        name="ChallengeResisterOne"
        component={ChallengeResisterOne}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="ChallengeResisterTwo"
        component={ChallengeResisterTwo}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
    </Stack.Navigator>
  )
}

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
          } else if (route.name === 'Information') {
            iconName = focused ? 'text-box' : 'text-box-outline';
            return <MaterialCommunityIcons name={iconName} size={25} color={color} /> 
          } else if (route.name === 'CommunityScreen') {
            iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
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
        name="Information"
        component={InformationMain}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityHome}
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
          name="Challenge"
          component={ChallengeScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Mission"
          component={MissionScreen}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Verification"
          component={ChallengeVerification}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="주소찾기"
          component={AddressFind}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendars}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Transaction"
          component={WalletTransaction}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="입금"
          component={WalletCharge}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="WalletWithDrawal"
          component={WalletWithdrawal}
          options={{
            headerTitle: "출금",
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
            headerTitle: "비밀번호 설정",
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="개인정보"
          component={ProfileMain}
          options={{
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
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="공지사항"
          component={Notification}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="내가 쓴글"
          component={MypageMyWriting}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="이용약관"
          component={MyPageRule}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="Food"
          component={MarketContentsList}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="ContentsInfo"
          component={ContentsInfo}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="주문정보"
          component={ContentsBuy}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="ContentsComplete"
          component={ContentsComplete}
          options={{
            gestureDirection: 'vertical-inverted',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="자유게시판"
          component={CommunityClick}
          options={{
            headerTitleAlign: 'center',
            headerRight: props => <Image style={{marginRight: 20}} source={require('./src/icon/blackalarm.png')} {...props} />,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="CommunityOtherPost"
          component={CommunityOtherPost}
          options={{
            headerTitle: '자유게시판',
            headerTitleAlign: 'center',
            headerRight: props => <Image style={{ marginRight: 20 }} source={require('./src/icon/blackalarm.png')} {...props} />,
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="작성하기"
          component={CommunityWrite}
          options={{
            headerTitleAlign: 'center',
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="회원가입"
          component={LoginSignup}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen
          name="로그인"
          component={LoginMain}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="아이디/비밀번호 찾기"
          component={LoginFind}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="본인인증"
          component={LoginVerification}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="프로필 설정"
          component={LoginVerificationProfile}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
        <Stack.Screen 
          name="아이디 찾기"
          component={LoginFindId}
          options={{
            gestureDirection: 'vertical-inverted'
          }}
        />
         <Stack.Screen 
          name="LoginPassword"
          component={LoginPassword}
          options={{
            gestureDirection: 'vertical-inverted'
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
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="문의하기"
        component={SettingQuestion}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="알림설정"
        component={SettingAlram}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="초기화"
        component={SettingReset}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="ResetComplete"
        component={SettingResetComplete}
        options={{
          headerTitle: "초기화",
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="버전정보"
        component={SettingVersion}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="탈퇴"
        component={SettingExit}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="ExitComplete"
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
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen
        name="회사소개"
        component={SettingCompanyInfo}
        options={{
          gestureDirection: 'vertical-inverted'
        }}
      />
      <Stack.Screen 
        name="InformationNonReport"
        component={InformationNonReport}
        options={{
          gestureDirection: 'vertical-inverted',
          headerShown: false
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
        name="ModeSelectNonSmoker"
        component={ModeSelectNonSmoker}
        options={{
          gestureDirection: 'vertical-inverted',
          headerShown: false
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;