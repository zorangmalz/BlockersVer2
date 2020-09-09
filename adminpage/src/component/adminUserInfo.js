import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Title,
  Line,
  ContentBox,
  Download,
  WRG20,
  WRG18,
  WRG16,
} from './style';
import firebase from 'firebase';
import 'firebase/firestore';
import search from './image/search.jpg';

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

function AdminUserInfo() {
    // firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const [ID, setId] = useState('');
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [listuser, setListuser] = useState([
        {
            id: 'hyunmyung137@gmail.com',
            name: '김현명',
            birth: 951228,
            gender: '남',
            id: 'hyunmyung137@gmail.com',
            wallet: '0x1278sadkjxlkajklqjwlkjkl',
            challenge: 1,
            timer: '100:00:00'
        }
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
            <Title>User information</Title>
            <Line />
            <Listbox>
                <Topbox>
                    <Downloadbox>
                        <Download white />
                        <WRG20>Download CSV</WRG20>
                    </Downloadbox>
                    <Rightbox>
                        <SearchInput placeholder="Search" value={ID} type="text" onKeyPress={enterClick} onChange={handleChange} />
                        <Search type="button" onClick={handleClick} />
                    </Rightbox>
                </Topbox>
                <Headerbox>
                    <Checkbox checked={totalcheck} onChange={totalhandle} id='totalcheck' value="" />
                    <NameBox><WRG18>Name</WRG18></NameBox>
                    <BirthBox><WRG18>Birth</WRG18></BirthBox>
                    <GenderBox><WRG18>성별</WRG18></GenderBox>
                    <IDBox><WRG18>ID</WRG18></IDBox>
                    <WalletBox><WRG18>Wallet address</WRG18></WalletBox>
                    <ChallengeBox><WRG18>Challenge</WRG18></ChallengeBox>
                    <TimerBox><WRG18>Timer</WRG18></TimerBox>
                </Headerbox>
                {
                    listuser.map(list => (
                        <ContentBox key={list.id}>
                            <Checkbox value="" />
                            <NameBox><WRG16>{list.name}</WRG16></NameBox>
                            <BirthBox><WRG16>{list.birth}</WRG16></BirthBox>
                            <GenderBox><WRG16>{list.gender}</WRG16></GenderBox>
                            <IDBox><WRG16>{list.id}</WRG16></IDBox>
                            <WalletBox>
                                <WRG16>{list.wallet}</WRG16>
                                <LogBox>Log</LogBox>
                            </WalletBox>
                            <ChallengeBox>
                                <WRG16>{list.challenge}</WRG16>
                                <LogBox>Log</LogBox>
                            </ChallengeBox>
                            <TimerBox>
                                <WRG16>{list.timer}</WRG16>
                                <LogBox>Log</LogBox>
                            </TimerBox>
                        </ContentBox>
                    ))
                }
            </Listbox>
        </>
    );
}

export default AdminUserInfo;

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

//listBox 중 제일 위쪽 요소
const Topbox = styled.div`
  width: 1568px;
  padding-top: 12px;
  padding-left: 18px;
  padding-bottom: 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Downloadbox = styled.div`
  width: 500px;

  display: flex;
  flex-direction: row;
  align-items: center;
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

const NameBox = styled.div`
  width: 100px;
  height: 25px;
`;

const BirthBox = styled.div`
  width: 100px;
  height: 25px;
`;

const GenderBox = styled.div`
  width: 100px;
  height: 25px;
`;

const IDBox = styled.div`
  width: 250px;
  height: 25px;
`;

const WalletBox = styled.div`
  width: 340px;
  height: 25px;
  padding-right: 35px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ChallengeBox = styled.div`
  width: 150px;
  height: 25px;
  padding-right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimerBox = styled.div`
  width: 200px;
  height: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogBox = styled.div`
    width: 60px;
    height: 23px;
    border-radius: 3px;
    background-color: #5cc27b;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    font-family: NunitoSans-Regular;
    color: #ffffff;
    letter-spacing: 0.16px;
    line-height: 1.33;
    cursor: pointer;
`;