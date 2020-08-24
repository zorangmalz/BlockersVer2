import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
    Container, 
    Header, 
    BackContainer, 
    MenuBox, 
    Menu, 
    MainContainer, 
    WRG20, 
    WRG18, 
    WRG16, 
    Title, 
    Line,
    ContentBox
} from './component/style';
import firebase from 'firebase';
import 'firebase/firestore';
import search from './component/image/search.jpg';

const firebaseConfig = {
  apiKey: "AIzaSyDoGjJh9F7riDGSdyAP-CA4CCeWN8W1ess",
  authDomain: "blockers-8a128.firebaseapp.com",
  databaseURL: "https://blockers-8a128.firebaseio.com",
  projectId: "blockers-8a128",
  storageBucket: "blockers-8a128.appspot.com",
  messagingSenderId: "729209347504",
  appId: "1:729209347504:web:6250b800ab5fe8e5e2ca75",
  measurementId: "G-RHBSD0QHTB"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var communityRef = db.collection('Community1');

//전체 List를 보관하는 박스
const Listbox = styled.div`
  width: 1600px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
`;

const Rightbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 150px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333333;
`;

const Search = styled.input`
  background-image: url(${search});
  background-color: white;
  background-size: cover;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 120px;
  border: 0;
  font-size: 18px;

  display: block;
  font-family: NunitoSans-Regular;
  color: #000000;
`;

//Header 칸
//padding만큼 밀리는 경향이 존재함
const Headerbox = styled.ul`
  width: 1568px;
  padding-top: 14px;
  padding-bottom: 18px;
  padding-left: 32px;
  margin-bottom: 8px;
  border-top: 1px solid #EFEFEF;
  border-bottom: 1px solid #EFEFEF;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

//Header에 포함되는 요소들
const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  width: 24px;
  height: 24px;
  border: 0.5px normal #000000;
  margin-right: 36px;
`;

const PostBox = styled.div`
  width: 70px;
  height: 25px;
  margin-right: 30px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;
`;

const TitleBox = styled.div`
  width: 180px;
  height: 25px;
  margin-right: 40px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;
`;

const ClickBox = styled.div`
  width: 50px;
  height: 25px;
  margin-right: 32px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;
`;

const GoodBox = styled.div`
  width: 50px;
  height: 25px;
  margin-right: 32px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;
`;

const RegistrationBox = styled.div`
  width: 70px;
  height: 25px;
  margin-right: 36px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;
`;

const RegisterDateBox = styled.div`
  width: 90px;
  height: 25px;
  margin-right: 36px;

  font-size: 16px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DeleteBox = styled.button`
  width: 65px;
  height: 25px;
  margin-right: 55px;

  background-color: #999999;
  border: 0;
  border-radius: 3px;

  font-size: 12px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.12px;
  color: #ffffff;
  text-align: center;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [ID, setId] = useState('');
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [listuser, setListuser] = useState([]);

  //CHECKBOX에 대하여
  const [totalcheck, setTotalcheck] = useState(false);
  const [check, setCheck] = useState(false);
  const totalhandle = () => {
    setTotalcheck(!totalcheck);
  }

  //information이 좀 과다한 것 같음
  //doc에서 information의 구분이 필요할 듯 하다.
  //작성자 정보와 댓글 정보
  //여기서 push를 제한 두는 것이 중요할 듯 하다.
  var community = communityRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      var subCollectionDocs = communityRef.doc(doc.id).collection('Reply').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            <ContentBox>
              <Checkbox id='totalcheck' value="" />
              <PostBox>{doc.writerUid}</PostBox>
              <TitleBox>제목</TitleBox>
              <ClickBox>조회수</ClickBox>
              <GoodBox>좋아요</GoodBox>
              <RegistrationBox>{doc.nick}</RegistrationBox>
              <RegisterDateBox>{doc.time}</RegisterDateBox>
              <DeleteBox>삭제</DeleteBox>
            </ContentBox>
          })
        })
    })
  })

  return (
    <Container>
      <Header>Blockers Admin</Header>
      <BackContainer>
        <MenuBox>
          <Menu>Home</Menu>
          <Menu>User</Menu>
          <Menu>Challenge</Menu>
          <Menu>Community</Menu>
          <Menu>Market</Menu>
        </MenuBox>
        <MainContainer>
          <Title>Notice</Title>
          <Line />
          <Listbox>
            <Headerbox>
              <Checkbox checked={totalcheck} onChange={totalhandle} id='totalcheck' value="" />
              <PostBox style={{fontSize: 18}} >Post no.</PostBox>
              <TitleBox style={{fontSize: 18}} >제목</TitleBox>
              <ClickBox style={{fontSize: 18}} >조회수</ClickBox>
              <GoodBox style={{fontSize: 18}} >좋아요</GoodBox>
              <RegistrationBox style={{fontSize: 18}}>등록자</RegistrationBox>
              <RegisterDateBox style={{fontSize: 18}}>등록일자</RegisterDateBox>
              <DeleteBox>일괄삭제</DeleteBox>
              <Rightbox>
                <SearchInput placeholder="Search" value={ID} type="text" />
                <Search type="button" />
              </Rightbox>
            </Headerbox>
            {community}
          </Listbox>
        </MainContainer>
      </BackContainer>
    </Container>
  );
}

export default App;
