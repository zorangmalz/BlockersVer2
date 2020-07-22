/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeIcon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/homeScreen';
import MissionScreen from './src/missionScreen';
import SplashScreen from './src/splashscreen';
import WelcomeScreen from './src/welcomeScreen';
import ChallengeMain from './src/challengeMain';
import ChallengeResisterOne from './src/challengeResisterOne';
import ChallengeResisterTwo from './src/challengeResisterTwo';
import PasswordChange from './src/passwordChange';
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
import WalletMain from './src/walletMain';
import WalletTransaction from './src/walletTransaction';
import WalletCharge from './src/walletCharge';
import { WalletWithdrawal, WithdrawalPassword, WalletWithdrawlComplete } from './src/walletWithdrawal';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Header() {
  return (
    <View
      accessibilityRole="header"
      style={{
        height: 44,
        flexDirection: 'row',
        paddingTop: 4,
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingLeft: 4
      }}
    >
      <Text style={{ fontSize: 24 }}>
        <Text style={{ fontWeight: '100', color: '#979797' }}>Hello,</Text>
        <Text style={{ fontWeight: 'bold', color: '#5CC27B' }}> Blockers</Text>
      </Text>
    </View>
  )
}

function ChallengeScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChallengeMain"
        component={ChallengeMain}
      />
      <Stack.Screen
        name="ChallengeResisterOne"
        component={ChallengeResisterOne}
      />
      <Stack.Screen
        name="ChallengeResisterTwo"
        component={ChallengeResisterTwo}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChange}
      />
    </Stack.Navigator>
  )
}

function SettingScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="설정"
        component={SettingMain}
      />
      <Stack.Screen
        name="문의하기"
        component={SettingQuestion}
      />
      <Stack.Screen
        name="알림설정"
        component={SettingAlram}
      />
      <Stack.Screen
        name="초기화"
        component={SettingReset}
      />
      <Stack.Screen
        name="ResetComplete"
        component={SettingResetComplete}
        options={{
          headerTitle: "초기화"
        }}
      />
      <Stack.Screen
        name="버전정보"
        component={SettingVersion}
      />
      <Stack.Screen
        name="탈퇴"
        component={SettingExit}
      />
      <Stack.Screen
        name="ExitComplete"
        component={SettingExitComplete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="자주묻는 질문"
        component={SettingOften}
      />
    </Stack.Navigator>
  )
}

function WalletScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="지갑"
        component={WalletMain}
      />
      <Stack.Screen
        name="Transaction"
        component={WalletTransaction}
      />
      <Stack.Screen
        name="입금"
        component={WalletCharge}
      />
      <Stack.Screen
        name="WalletWithDrawal"
        component={WalletWithdrawal}
        options={{
          headerTitle: "출금"
        }}
      />
      <Stack.Screen
        name="WithDrawalPassword"
        component={WithdrawalPassword}
        options={{
          headerTitle: "출금"
        }}
      />
      <Stack.Screen
        name="WalletWithDrawlComplete"
        component={WalletWithdrawlComplete}
        options={{
          headerTitle: "출금"
        }}
      />
      <Stack.Screen
        name="WalletPassword"
        component={WalletPassword}
        options={{
          headerTitle: "비밀번호 설정"
        }}
      />
    </Stack.Navigator>
  )
}

function Home({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <Header {...props} />
        }}
      />
      <Stack.Screen
        name="Challenge"
        component={ChallengeScreen}
      />
      <Stack.Screen
        name="Mission"
        component={MissionScreen}
      />
      <Stack.Screen
        name="Verification"
        component={ChallengeVerification}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendars}
      />
    </Stack.Navigator>
  )
}

function CommunityScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityHome}
        options={{
          headerTitle: "Community"
        }}
      />
      <Stack.Screen
        name="CommunityClick"
        component={CommunityClick}
      />
      <Stack.Screen
        name="CommunityOtherPost"
        component={CommunityOtherPost}
      />
    </Stack.Navigator>
  )
}

function MarketScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={MarketHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MarketContentsList"
        component={MarketContentsList}
      />
      <Stack.Screen
        name="ContentsInfo"
        component={ContentsInfo}

      />
      <Stack.Screen
        name="ContentsBuy"
        component={ContentsBuy}
      />
    </Stack.Navigator>
  )
}

function MypageScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
      />
      <Stack.Screen 
        name="공지사항"
        component={Notification}
      />
    </Stack.Navigator>
  )
}

const myhome = <homeIcon name="home" size={30} color="#000000" />

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          activeTintColor: '#5cc27b'
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketScreen}
        />
        <Tab.Screen
          name="MyPage"
          component={MypageScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;