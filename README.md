BlockersVer2
============

## 버전2 기능

   1. 금연시계 시작 및 리셋 : https://reactnativecode.com/create-stopwatch-timer/

## node_module
   
   1. react-native-swiper : https://www.npmjs.com/package/react-native-swiper
      
      - 오류 : react-native-firebase/firestore는 제일 마지막에 
      
   2. react-native-countdown : https://www.npmjs.com/package/react-native-countdown-component
   
      - 인증코드 발송 3:00 사용할 때 적용함
   
   3. react-native-image-picker : https://github.com/react-native-community/react-native-image-picker
      
      - 오류 안드로이드에서 이미지 피커가 작동 안되는 경우
        
        https://github.com/react-native-community/react-native-image-picker/issues/1259
        
   4. react-native-material-textfield : https://github.com/n4kz/react-native-material-textfield/issues/249
   
      - react-native-material-dropdown 사용할 때 react-native-material-textfield를 사용하는데 이때 오류가 발생함

## android build 에러
   1. app:stripDebugDebugSymbols FAILED : https://github.com/facebook/react-native/issues/28404

## 기타
   1. 이메일 인증: https://stackoverflow.com/questions/37900447/user-emailverified-doesnt-change-after-clicking-email-verification-link-firebas
   
      - 이때 auth().current.reload()로 갱신을 해줘야 user.emailverified가 바뀜
