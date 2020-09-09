import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import {
    WBB20,
    WRG20,
    Title,
    Line,
    CategoryBox,
    VerifyButton,
    SearchInput,
    Search,
    Setting
} from './style';

const challengeRoutes = [
    {
        path: '/challenge/verify',
        exact: true,
        main: () => <VerificationMain />
    },
    {
        path: '/challenge/verify/detail',
        main: () => <VerificationDetail/>
    },
]

export default function AdminChallengeVerify() {
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

//외부 데이터와 연결을 하면 될듯
const listuser = [
    {
        id: 'hyunmyung137@gmail.com',
        name: '김현명',
        txhash: '0Xasjdlhqwkjhusikh213899789',
        wallet: '0Xasjdlhqwkjhusikh213899789',
        verify: true,
        detail: [],
        Step: 1,
        VerificationStatus: 'Ongoing(1/4)',
        Duration: 'Jan5-7',
        New: 200,
        Done: 400,
        Claim: 5
    }
];

function VerificationMain() {
    return (
        <>
            <TitleBox>
                <div style={{ display: "flex", alignItems: 'center' }}>
                    <Title>Ongoing Challenge</Title>
                    <DateSettingBox>날짜 일괄 설정</DateSettingBox>
                </div>
                <Setting style={{marginTop: 16, alignSelf: 'flex-end'}} />
            </TitleBox>
            <Line />
            <VerificationRowBox>
                {listuser.map(list =>
                    <VerificationBox key={list.id}>
                        <VerificationSmallRowBox style={{ marginBottom: 16 }}>
                            <VerificationLeftBox>Step</VerificationLeftBox>
                            <VerificationCenterBox>Verification status</VerificationCenterBox>
                            <VerificationRightBox>Duration</VerificationRightBox>
                        </VerificationSmallRowBox>
                        <VerificationSmallRowBox style={{ marginBottom: 16 }}>
                            <VerificationLeftBox style={{ color: '#5cc27b' }}>{list.Step}</VerificationLeftBox>
                            <VerificationCenterBox style={{ color: 'red' }}>{list.VerificationStatus}</VerificationCenterBox>
                            <VerificationRightBox style={{ color: '#5cc27b' }}>{list.Duration}</VerificationRightBox>
                        </VerificationSmallRowBox>
                        <VeriLine />
                        <VerificationSmallRowBox style={{ marginBottom: 16, marginTop: 16 }}>
                            <VerificationLeftBox>New</VerificationLeftBox>
                            <VerificationCenterBox>Done</VerificationCenterBox>
                            <VerificationRightBox>Claim</VerificationRightBox>
                        </VerificationSmallRowBox>
                        <VerificationSmallRowBox style={{ marginBottom: 16 }}>
                            <VerificationLeftBox style={{ color: '#5cc27b' }}>{list.New}</VerificationLeftBox>
                            <VerificationCenterBox style={{ color: 'red' }}>{list.Done}</VerificationCenterBox>
                            <VerificationRightBox style={{ color: '#5cc27b' }}>{list.Claim}</VerificationRightBox>
                        </VerificationSmallRowBox>
                        <VerificationSmallRowBox style={{ justifyContent: 'center' }}>
                            <NavLink to='/challenge/verify/detail'><ButtonBox detail>자세히</ButtonBox></NavLink>
                            <ButtonBox>날짜 설정</ButtonBox>
                        </VerificationSmallRowBox>
                    </VerificationBox>
                )}
            </VerificationRowBox>
        </>
    )
}

//Title 부분
const TitleBox = styled.div`
    width: 1600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

//날짜 일괄 설정 박스
const DateSettingBox = styled.button`
    width: 185px;
    height: 45px;
    border-radius: 10px;
    border-width: 0;
    background-color: rgba(255, 0, 0, 0.8);
    margin-top: 16px;
    margin-left: 36px;

    font-family: NunitoSans-Bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

//전체를 감싸는 박스
const VerificationRowBox = styled.div`
    width: 1800px;
    margin-left: 42px;
    margin-top: 40px;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const VerificationBox = styled.div`
    width: 545px;
    height: 280px;
    border-radius: 10px;
    box-shadow: 0 25px 30px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;

    padding-top: 16px;
    padding-bottom: 26px;
`;

const VerificationSmallRowBox = styled.div`
    width: 545px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const VerificationLeftBox = styled.div`
    width: 50px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: NunitoSans-Bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
`;

const VerificationRightBox = styled.div`
    width: 90px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: NunitoSans-Bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
`;

const VerificationCenterBox = styled.div`
    width: 180px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: NunitoSans-Bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
`;

//중간에 회색선
const VeriLine = styled.hr`
    width: 545px;
    border-bottom: 0px;
    border-color: #707070;
    opacity: 0.3;
`;

//자세히 박스
const ButtonBox = styled.button`
    width: 150px;
    height: 60px;
    border-radius: 10px;
    border-width: 0px;
    background: transparent;
    border: 2px solid #5cc27b;
    margin-right: 16px;

    ${props => props.detail && css`
        background-color: #5cc27b;
        color: white;
    `}

    font-family: NunitoSans-Bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
`;

function VerificationDetail() {
    const [New, setNew] = useState(false);
    const [Done, setDone] = useState(false);
    const [Claim, setClaim] = useState(false);

    useEffect(() => {
        if (New === true) {
            setDone(false);
            setClaim(false);
        }
        if (Done === true) {
            setNew(false);
            setClaim(false);
        } 
        if (Claim === true){
            setDone(false);
            setNew(false);
        }
    }, [New, Done, Claim]);

    return (
        <Router>
            <Title>Ongoing Challenge</Title>
            <Line />
            {listuser.map(list =>
                <>
                    <VerificationSmallRowBox style={{ marginBottom: 16, justifyContent: 'flex-start' }} key={list.id}>
                        <VerificationLeftBox style={{ marginRight: 72 }}>Step</VerificationLeftBox>
                        <VerificationCenterBox style={{ marginRight: 72 }}>Verification status</VerificationCenterBox>
                        <VerificationRightBox>Duration</VerificationRightBox>
                    </VerificationSmallRowBox>
                    <VerificationSmallRowBox style={{ marginBottom: 16, justifyContent: 'flex-start' }}>
                        <VerificationLeftBox style={{ color: '#5cc27b', marginRight: 72 }}>{list.Step}</VerificationLeftBox>
                        <VerificationCenterBox style={{ color: 'red', marginRight: 72 }}>{list.VerificationStatus}</VerificationCenterBox>
                        <VerificationRightBox style={{ color: '#5cc27b' }}>{list.Duration}</VerificationRightBox>
                    </VerificationSmallRowBox>
                </>
            )}
            <Listbox>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <NewDoneClaimBox>
                        <NavLink to='/challenge/verify/detail/new' style={{ textDecoration: 'none' }}>
                            <NewDoneClaimText onClick={() => setNew(true)} style={{ fontFamily: New === true ? 'NunitoSans-Bold' : 'NunitoSans-Regular' }}>New(200)</NewDoneClaimText>
                        </NavLink>
                        <NavLink to='/challenge/verify/detail/done' style={{ textDecoration: 'none' }}>
                            <NewDoneClaimText onClick={() => setDone(true)} style={{ fontFamily: Done === true ? 'NunitoSans-Bold' : 'NunitoSans-Regular' }}>Done(200)</NewDoneClaimText>
                        </NavLink>
                        <NavLink to='/challenge/verify/detail/claim' style={{ textDecoration: 'none' }}>
                            <NewDoneClaimText onClick={() => setClaim(true)} style={{ fontFamily: Claim === true ? 'NunitoSans-Bold' : 'NunitoSans-Regular' }}>Claim(10)</NewDoneClaimText>
                        </NavLink>
                    </NewDoneClaimBox>
                    <Rightbox>
                        <SearchInput placeholder="Search" style={{ fontSize: 18, color: '#707070', borderBottomColor: '#303030', borderBottomWidth: 1 }} />
                        <Search />
                    </Rightbox>
                </div>
                <Switch>
                    <Route exact path='/challenge/verify/detail/new'>
                        <Headerbox>
                            <NameBox><WBB20>Name</WBB20></NameBox>
                            <IDBox><WBB20>ID</WBB20></IDBox>
                            <TxhashBox><WBB20>Wallet Address</WBB20></TxhashBox>
                            <DetailPictureBox><WBB20>Detail</WBB20></DetailPictureBox>
                        </Headerbox>
                        {listuser.map(list =>
                            <CategoryBox key={list.id}>
                                <NameBox><WRG20>{list.name}</WRG20></NameBox>
                                <IDBox><WRG20>{list.id}</WRG20></IDBox>
                                <TxhashBox><WRG20>{list.wallet}</WRG20></TxhashBox>
                                <DetailPictureBox><WRG20>{list.detail}</WRG20></DetailPictureBox>
                                <VerifyButton style={{ marginRight: 24 }}>Verify</VerifyButton>
                                <VerifyButton reject >Reject</VerifyButton>
                            </CategoryBox>
                        )}
                    </Route>
                    <Route path='/challenge/verify/detail/done'>
                        <Headerbox>
                            <NameBox><WBB20>Name</WBB20></NameBox>
                            <IDBox><WBB20>ID</WBB20></IDBox>
                            <TxhashBox><WBB20>Txhash</WBB20></TxhashBox>
                            <DetailPictureBox><WBB20>Detail</WBB20></DetailPictureBox>
                        </Headerbox>
                        {listuser.map(list =>
                            <CategoryBox key={list.id}>
                                <NameBox><WRG20>{list.name}</WRG20></NameBox>
                                <IDBox><WRG20>{list.id}</WRG20></IDBox>
                                <TxhashBox><WRG20>{list.txhash}</WRG20></TxhashBox>
                                <DetailPictureBox><WRG20>{list.detail}</WRG20></DetailPictureBox>
                                {list.verify === true ?
                                    <VerifyButton>Verify</VerifyButton>
                                    :
                                    <VerifyButton reject >Reject</VerifyButton>
                                }
                            </CategoryBox>
                        )}
                    </Route>
                    <Route path='/challenge/verify/detail/claim'>
                        <Headerbox>
                            <NameBox><WBB20>Name</WBB20></NameBox>
                            <IDBox><WBB20>ID</WBB20></IDBox>
                            <TxhashBox><WBB20>Wallet Address</WBB20></TxhashBox>
                            <DetailPictureBox><WBB20>Detail</WBB20></DetailPictureBox>
                        </Headerbox>
                        {listuser.map(list =>
                            <CategoryBox key={list.id}>
                                <NameBox><WRG20>{list.name}</WRG20></NameBox>
                                <IDBox><WRG20>{list.id}</WRG20></IDBox>
                                <TxhashBox><WRG20>{list.wallet}</WRG20></TxhashBox>
                                <DetailPictureBox><WRG20>{list.detail}</WRG20></DetailPictureBox>
                                <VerifyButton style={{marginRight: 24}}>Verify</VerifyButton>
                                <VerifyButton reject >Reject</VerifyButton>
                            </CategoryBox>
                        )}
                    </Route>
                </Switch>
            </Listbox>
        </Router>
    )
}

//전체 List를 보관하는 박스
const Listbox = styled.div`
  width: 1600px;
  padding-top: 23px;
  padding-bottom: 17px;
  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
  box-shadow: 0 25px 30px 0 rgba(0, 0, 0, 0.1);
`;

const NewDoneClaimBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 355px;
    margin-left: 30px;
    margin-bottom: 16px;
`;

const NewDoneClaimText = styled.button`
    width: 105px;
    height: 30px;
    
    font-family: NunitoSans-bold;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
    text-align: left;
    color: #303030;

    background: transparent;
    border: 0px;
`;

//Header 칸
//padding만큼 밀리는 경향이 존재함
const Headerbox = styled.div`
  width: 1564px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 36px;
  margin-bottom: 8px;

  border-top: 1px solid #EFEFEF;
  border-bottom: 1px solid #EFEFEF;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameBox = styled.div`
  width: 100px;
  height: 30px;
`;

const IDBox = styled.div`
  width: 300px;
  height: 30px;
`;

const TxhashBox = styled.div`
    width: 320px;
    height: 30px;
`;

const DetailPictureBox = styled.div`
    width: 330px;
`;

const Rightbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 150px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333333;
  margin-right: 174px;
`;