import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const setting = StyleSheet.create({
    mainText: {
        fontSize: 16,
        fontFamily: 'NunitoSans-Regular',
        alignSelf: 'flex-start',
        color: '#303030'
    },
    mainBox: {
        marginBottom: 8,
        marginLeft: 32,
    }
})

export default function Personal({ navigation }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <View accessibilityRole="header" style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingTop: 5, width: "100%", paddingLeft: "3%", paddingRight: "3%" }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#303030' }}>개인정보처리방침</Text>
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{ fontSize: 12, marginHorizontal: "10%", fontFamily: "NunitoSans-Regular", marginTop: 16 }}>
                        {`  **블로커스 개인정보수집방침**

㈜조랑말즈(이하 “회사”)는 개인정보수집방침은 정보통신서비스제공자가 준수하여야 하는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다. 본 개인정보수집방침은 회사에서 운영하는 Blockers 서비스(이하 “블로커스”)에 적용됩니다.

회사는 개인정보수집방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

본 방침은 2020년 10월 19일부터 시행됩니다.

1. **개인정보의 수집 목적**

회사는 개인정보를 다음의 목적을 위해 수집합니다. 수집한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.

1) 홈페이지 회원가입 및 관리

회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별•인증, 회원자격 유지•관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 각종 고지•통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 수집합니다.

2) 재화 또는 서비스 제공

물품배송, 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제•정산 등을 목적으로 개인정보를 수집합니다.

3) 마케팅 및 광고에의 활용

신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 수집합니다.

2. **수집하는 개인정보의 항목** 

회사는 블로커스 서비스 제공을 위해 회원가입 시 또는 서비스 이용과정에서다음의 개인정보 항목을 수집 및 처리하고 있습니다.

1) 필수 항목: 이름, 로그인 ID, 비밀번호, 휴대전화번호, 이메일, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록, 불량이용기록

2) 선택 항목: 생년월일, 성별, 자택주소, 자택전화번호, 은행계좌정보, 신용카드정보, 직업, 회사명, 부서, 직책, 회사전화번호, 결혼여부, 기념일, 취미, 신체정보, 학력, 종교, 주민등록번호

모바일 서비스 특성상 단말기에 관한 정보(단말기 모델, 이동통신사정보, 하드웨어ID, 서비스 이용에 대한 기본 통계)가 수집될 수 있습니다. 그러나 이는 개인을 식별할 수 없는 형태이며 회사는 수집된 단말기 정보로 특정 개인을 식별하지 않습니다. 단말기에 관한 정보 이외에 추가적으로 블로커스 어플리케이션 정보 등이 수집될 수 있습니다.

3) 소득세법 제 127조에 따라 회사는 기타소득에 대한 원천징수의무가 있으며, 상금 지급을 위한 본인확인과 원천세 징수를 목적으로 회원의 이름, 주민등록번호, 입금 계좌정보(예금주, 은행명, 계좌번호)를 수집합니다

내용 이외에 추가적인 개인정보 수집이 필요한 경우, 회사는 회원에게 사전에 이러한 사실을 고지하고 동의를 받으며, 사전 고지 후 동의를 받은 회원에 한해서만 정보를 수집합니다.

3. **개인정보 수집방법**

회사는 서비스 제공을 위해 다음과 같은 방법으로 개인정보를 수집합니다.

1) 블로커스 서비스의 회원가입 및 이용 과정에서 이용자로부터 직접 수집

2) 생성 정보 수집 툴을 통한 수집

3) 홈페이지, 어플리케이션, 서면 양식, 팩스, 전화, 상담 게시판, 이메일을 통한 수집

4. **개인정보의 수집 및 보유기간**

회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.

단, 불량 이용자 제재나 관련 분쟁 처리 등 서비스 관리를 위한 목적으로 회사 내부방침이나 관계법령의 규정에 의하여 보존할 필요가 있는 경우에는 아래와 같이 일정 기간 동안 개인정보를 보관할 수 있습니다. 위 개인정보 수집목적 달성 시에도 불구하고 즉시 파기하지 않는 경우는 다음과 같습니다.

1) 관련법령기준에 따라 별도 보관하는 경우

① 「전자상거래 등에서의 소비자보호에 관한 법률」

- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년

- 대금결제 및 재화 등의 공급에 관한 기록 : 5년

- 계약 또는 청약철회 등에 관한 기록 : 5년

- 표시/광고에 관한 기록 : 6개월

② 「통신비밀보호법」

- 로그인 기록(로그기록자료, 접속지의 추적자료) : 3개월

③ 「위치정보의 보호 및 이용 등에 관한 법률」

- 개인위치정보에 관한 기록 : 6개월.

2) 내부 기준에 따라 별도 보관하는 경우

부정가입 및 징계기록(옐로카드 및 레드카드의 발급, 인증샷 삭제에 따른 미인증 처리 등) 등의 부정이용기록은 부정 가입 및 이용 방지를 위하여 수집 시점으로부터 3년간 보관하고 파기하고 있습니다. 부정이용기록 내 개인정보는 가입인증 휴대폰 번호(만 14세 미만 회원의 경우 법정대리인 DI)가 있습니다.

블로커스의 부정이용기록(아이디, 이름, 휴대폰번호, 주소, IP주소, 쿠키, 기기정보, 서비스 이용내역)은 부정거래 방지 및 다른 선량한 이용자의 보호, 안전한 거래 환경 보장을 위하여 수집 시점으로부터 3년간 보관하고 파기합니다.

부정이용으로 징계를 받기 전에 회원 가입 및 탈퇴를 반복하며 서비스를 부정 이용하는 사례를 막기 위해 탈퇴한 이용자의 휴대전화번호를 복호화가 불가능한 일방향 암호화(해시 처리)하여 6개월간 보관합니다.

5. **개인정보의 제3자 제공에 관한 사항** 

회사는 제3자의 서비스가 연결되어 제공되는 경우, 이용자의 동의를 얻은 후에 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공할 수 있습니다. 

6. **개인정보의 파기절차 및 방법**

회사는 원칙적으로 개인정보 수집목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.

1) 파기절차

이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.

2) 파기기한

서비스 이용내역 확인을 통한 결제취소 등의 업무 진행을 위해 이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 90일 이내에, 개인정보의 수집 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 수집이 불필요한 것으로 인정되는 날로부터 90일 이내에 그 개인정보를 파기합니다.

3) 파기방법

전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.

7. **정보주체와 법정대리인의 권리, 의무 및 그 행사방법에 관한 사항**

이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.

1) 정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.

2) 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.

3) 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.

4) 개인정보 열람 및 수집정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.

5) 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.

6) 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 수집정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.

8. **개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항**

회사는 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 쿠키(cookie)와 세션(session)을 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 세션은 서비스 운영에 이용되는 서버가 이용자 접속 시간 동안에 이용자 정보를 서버에 저장하는 것을 의미합니다.

쿠키와 세션은 이용자가 설정한 환경을 유지하도록 함으로써 편리한 사용을 도우며, 이용자의 방문 기록, 이용 형태, 관심 분야를 알게 해줌으로써 이를 통한 최적화된 맞춤 서비스를 제공하고 서비스 개선의 척도로 활용됩니다.

이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.

다만, 쿠키 설치를 거부할 경우 로그인이 필요한 일부 서비스를 이용하는 것에 어려움이 있을 수 있습니다.

이용자는 세션 설치에 대한 선택권을 가지고 있지 않으며, 로그인이 필요한 서비스 이용시 서버에 자동으로 세션이 생성됩니다.

9. **앱 서비스 이용자의 스마트폰 내 정보 및 기능에 대한 접근권한에 관한 사항**

회사는 회원에게 사전에 고지하고 동의를 받아 아래의 정보를 수집할 수 있습니다. 이용자는 선택적 접근권한 항목에 한하여는 수집에 동의하지 아니할 수 있으며, 동의를 하지 않더라도 서비스의 제공을 받을 수 있습니다.

1) 필수적 접근권한

- 접근권한이 필요한 정보 및 기능의 항목: 캘린더, 사진 등 미디어, 카메라, 파일 저장 공간

- 해당 정보 및 기능에 접근이 필요한 이유: 인증사진 및 동영상 업로드 및 임시저장

2) 선택적 접근권한

- 접근권한이 필요한 정보 및 기능의 항목: 연락처, 위치정보

- 해당 정보 및 기능에 접근이 필요한 이유: 친구 초대, 소셜 기능 및 목표 달성 인증

※ 선택적 접근권한 항목은 허용에 동의하지 않아도 서비스 이용이 가능합니다.

스마트폰 상에서 앱을 삭제하더라도 이용자의 회원계정은 유지되므로, 회원탈퇴를 원하실 경우 모바일 어플리케이션 내의 “회원탈퇴” 기능을 이용하시거나 고객지원 이메일(jake@blockers.me)로 연락하여 주시기 바랍니다.

10. **개인정보의 안전성 확보 조치**

회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적 및 물리적 조치를 하고 있습니다.

1) 정기적인 자체 감사 실시: 개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다.

2) 개인정보 취급 직원의 최소화 및 교육: 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.

3) 내부관리계획의 수립 및 시행: 개인정보의 안전한 수집을 위해 내부관리계획을 수립, 시행하고 있습니다.

4) 해킹 등에 대비한 기술적 대책: 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신, 점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.

5) 개인정보의 암호화: 이용자의 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.

6) 접속기록의 보관 및 위변조 방지: 개인정보수집시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.

7) 개인정보에 대한 접근 제한: 개인정보를 수집하는 데이터베이스 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

8) 문서보안을 위한 잠금장치 사용: 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.

9) 비인가자에 대한 출입 통제: 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.

11. **개인정보 보호책임자**

회사는 개인정보 수집에 관한 업무를 총괄해서 책임지고 개인정보 수집과 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

1) 개인정보 보호책임자

- 성명: 박주규

- 직급: CFO

- 연락처: 010-7922-1786

- 이메일: jake@blockers.me

기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 문의하시기 바랍니다.

- 개인정보분쟁조정위원회 (www.kopico.go.kr / 1833-6972)  - 개인정보침해신고센터 (privacy.kisa.or.kr / 118)  - 대검찰청 첨단범죄수사센터 (www.spo.go.kr/ 02-3480-2000)  - 경찰청 사이버안전국 (cyberbureau.police.go.kr / 182)

12. **개인정보 수집방침 변경**

이 개인정보수집방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

`}

                    </Text>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};