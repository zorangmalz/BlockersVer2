import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import {
  WRG20,
  WRG18,
  WRG16,
  Title,
  Line,
  ContentBox
} from './style';
import search from './image/search.jpg';
import brori from './image/brori.png';
import firebase from 'firebase';
import 'firebase/firestore';

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

const challengeRoutes = [
  {
    path: '/community/notice',
    exact: true,
    main: () => <CommunityMain />
  },
  {
    path: '/community/notice/post',
    main: () => <AdminCommunityPost />
  },
]

export default function AdminCommunityNotice() {
  return (
    <Router>
      <Switch>
        {challengeRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </Router>
  )
}

function CommunityMain() {
  // firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const [ID, setId] = useState('');
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [listuser, setListuser] = useState([
    {
      id: 'hyunmyung137@gmail.com',
      name: '김현명',
      postNum: 101111,
      title: '블로커즈 3월 기부내역 공지',
      click: 1000,
      good: 1000,
      registerdate: '2020.07,30'
    },
  ]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState();

  //CHECKBOX에 대하여
  const [totalcheck, setTotalcheck] = useState(false);
  const [check, setCheck] = useState(false);
  const totalhandle = () => {
    setTotalcheck(!totalcheck);
  }

  const handleClick = () => {
    if (ID.length === 0) { alert('검색어를 입력해주세요') }
    else {
      db.collection('UserInfo')
        .doc(ID)
        .get()
        .then(doc => {
          if (!doc.data()) {
            alert(`${ID}님 환영합니다.`);
          }
          else {
            setListuser(listuser.filter(list => list.email === ID));
          }
        })
    }
  }

  const handleChange = e => {
    setId(e.target.value);
  }
  //여기서 firestore query를 이용할 것인지 아니면 그냥 filter 함수를 사용할 것인지 결정해야함
  const enterClick = e => {
    setListuser(listuser.splice(0, listuser.length - 1));
    if (e.key === 'Enter') {
      db.collection('UserInfo')
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
            const fetchedUser = {
              id: doc.id,
              ...doc.data()
            };
            user.push(fetchedUser);
          });
          setListuser(user);
        })
      var query = db.collection('UserInfo').where("email", "==", ID)
      if (ID.length === 0) { alert('검색어를 입력해주세요') }
      else {
        query.get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              const fetchedSearch = {
                id: doc.id,
                ...doc.data()
              };
              search.push(fetchedSearch);
            });
            setListuser(search);
          })
        setId('');
      }
    }
  }

  return (
    <>
      <Title>Notice</Title>
      <Line />
      <Listbox>
        <Headerbox>
          <Checkbox checked={totalcheck} onChange={totalhandle} id='totalcheck' value="" />
          <PostBox><WRG18>Post no.</WRG18></PostBox>
          <TitleBox><WRG18>제목</WRG18></TitleBox>
          <ClickBox><WRG18>조회수</WRG18></ClickBox>
          <GoodBox><WRG18>좋아요</WRG18></GoodBox>
          <RegistrationBox><WRG18>등록자</WRG18></RegistrationBox>
          <RegisterDateBox><WRG18>등록일자</WRG18></RegisterDateBox>
          <DeleteBox>일괄삭제</DeleteBox>
          <Rightbox>
            <SearchInput placeholder="Search" value={ID} type="text" />
            <Search type="button" />
          </Rightbox>
        </Headerbox>
        {
          listuser.map(list => (
            <ContentBox key={list.id}>
              <Checkbox />
              <PostBox><WRG16>{list.postNum}</WRG16></PostBox>
              <NavLink to='/community/notice/post' style={{textDecoration: 'none'}} ><TitleBox><WRG16>{list.title}</WRG16></TitleBox></NavLink>
              <ClickBox><WRG16>{list.click}</WRG16></ClickBox>
              <GoodBox><WRG16>{list.good}</WRG16></GoodBox>
              <RegistrationBox><WRG16>{list.name}</WRG16></RegistrationBox>
              <RegisterDateBox>
                <WRG16>{list.registerdate}</WRG16>
                <RepairBox>수정</RepairBox>
              </RegisterDateBox>
              <DeleteBox>삭제</DeleteBox>
            </ContentBox>
          ))
        }
      </Listbox>
    </>
  );
}

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

const Topbox = styled.div`
    width: 120px;
    padding-top: 12px;
    padding-left: 18px;
    padding-bottom: 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

//Header 칸
//padding만큼 밀리는 경향이 존재함
const Headerbox = styled.div`
    width: 1568px;
    padding-top: 14px;
    padding-bottom: 14px;
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
    width: 100px;
    height: 25px;
`;

const TitleBox = styled.div`
    width: 220px;
    height: 25px;
`;

const ClickBox = styled.div`
    width: 85px;
    height: 25px;
`;

const GoodBox = styled.div`
    width: 85px;
    height: 25px;
`;

const RegistrationBox = styled.div`
    width: 105px;
    height: 25px;
`;

const RegisterDateBox = styled.div`
    width: 220px;
    height: 25px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const RepairBox = styled.button`
    width: 65px;
    height: 25px;
    margin-right: 36px;

    background-color: #5cc27b;
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

const DeleteBox = styled.button`
    width: 65px;
    height: 25px;
    margin-right: 36px;

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

export function AdminCommunityPost() {
  return (
    <>
      <Title>Notice</Title>
      <Line />
      <Listbox style={{ paddingTop: 40, paddingLeft: 32, paddingRight: 32 }}>
        <PostTitle>브로리 대학원 기원 1일차</PostTitle>
        <PostInfobox>
          <PostInfoImage />
          <PostInfoName>브로리</PostInfoName>
          <PostInfoDate>2020.07.01</PostInfoDate>
        </PostInfobox>
        <PostDetailBox>
          <PostImage />
          <PostWord>브로리 삼성전자 들어갔답니다 부럽..</PostWord>
        </PostDetailBox>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <PostButton repair>수정</PostButton>
          <PostButton delete>삭제</PostButton>
          <PostButton cancel>취소</PostButton>
        </div>
      </Listbox>
    </>
  )
}

const PostTitle = styled.div`
  width: 205px;
  height: 30px;
  font-family: NunitoSans-Bold;
  font-size: 20px;
  line-height: 2;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.6);
`;

const PostInfobox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-top: 16px;
  padding-bottom: 16px;
  margin-top: 16px;
  border-top: 1px solid #EFEFEF;
  border-bottom: 1px solid #EFEFEF;
`;

const PostInfoImage = styled.img.attrs({
  src: brori
})`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  margin-left: 16px;
`;

const PostInfoName = styled.div`
  width: 100px;
  align-self: center;
  font-family: NunitoSans-Bold;
  font-size: 14px;
  font-weight: bold;
  line-height: 2.86;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 8px;
  margin-right: 150px;
`;

const PostInfoDate = styled.div`
  width: 60px;
  font-family: NunitoSans-Regular;
  align-self: center;
  font-size: 11px;
  font-style: normal;
  line-height: 3.36;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
`;

const PostDetailBox = styled.div`
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  margin-bottom: 32px;
`;

const PostImage = styled.img.attrs({
  src: brori
})`
  width: 343px;
  height: 343px;
`;

const PostWord = styled.div`
  font-family: NunitoSans-Regular;
  font-size: 20px;
  line-height: 2;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 16px;
`;

const PostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 180px;
  height: 50px;
  border-radius: 3px;
  border-width: 0px;
  ${props => props.repair && css`
    background-color: #5cc77b;
  `}
  ${props => props.delete && css`
    background-color: rgba(0, 0, 0, 0.6);;
  `}
  ${props => props.cancel && css`
    background-color: rgba(0, 0, 0, 0.6);;
  `}

  font-family: NunitoSans-Regular;
  font-size: 32px;
  line-height: 1.34;
  letter-spacing: 0.32px;
  color: #ffffff;
  margin-right: 24px;
`;