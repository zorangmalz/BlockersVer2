// eslint-disable-next-line
import React from 'react';
import styled, { css } from 'styled-components';
import {
    Title,
    WRG20,
    Setting,
    Analytics
} from './style';

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


function AdminHome() {
    return (
        <>
            <Title>User Analytics</Title>
            <Line />
            <Listbox>
                <Headerbox>
                    <WRG20>Active User</WRG20>
                    <Setting />
                </Headerbox>
                <Analytics />
            </Listbox>
            <TitleBox style={{marginTop: 32}}>
                <Title>Ongoing Challenge</Title>
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
                            <ButtonBox detail>자세히</ButtonBox>
                            <ButtonBox>날짜 설정</ButtonBox>
                        </VerificationSmallRowBox>
                    </VerificationBox>
                )}
            </VerificationRowBox>
        </>
    );
}

export default AdminHome;

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Line = styled.div`
  width: 1252px;
  background: #313131;
  height: 1px;
  margin-top: 16px;
  margin-bottom: 19px;
`;

//전체 List를 보관하는 박스
const Listbox = styled.div`
  width: 1252px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
`;

//Header 칸
//padding만큼 밀리는 경향이 존재함
const Headerbox = styled.div`
  width: 1220px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 32px;
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

//전체를 감싸는 박스
const VerificationRowBox = styled.div`
    width: 1800px;
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