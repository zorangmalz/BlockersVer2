import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  WRG20,
  WRG18,
  WRG16,
  Title,
  Line,
  ContentBox
} from './style';
import search from './image/search.jpg';
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

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

let communityRef = db.collection('Community1');

function AdminCommunityList() {
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
    }
  ]);

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

  return (
    <>
      <Title>List</Title>
      <Line />
      <Listbox>
        <Topbox>
          <WRG20>All</WRG20>
          <WRG20>Delete</WRG20>
        </Topbox>
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
              <TitleBox><WRG16>{list.title}</WRG16></TitleBox>
              <ClickBox><WRG16>{list.click}</WRG16></ClickBox>
              <GoodBox><WRG16>{list.good}</WRG16></GoodBox>
              <RegistrationBox><WRG16>{list.name}</WRG16></RegistrationBox>
              <RegisterDateBox>
                <WRG16>{list.registerdate}</WRG16>
                <DeleteBox>삭제</DeleteBox>
              </RegisterDateBox>
            </ContentBox>
          ))
        }
      </Listbox>
    </>
  );
}

export default AdminCommunityList;

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