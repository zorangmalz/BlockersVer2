import React, { useState } from 'react';
import styled from 'styled-components';
import {
    WBB20,
    WRG16,
    Title,
    Line,
    ContentBox,
    Downloadbox,
    Download,
    Setting
} from './style';

const listuser = [
    {
        id: 'hyunmyung137@gmail.com',
        name: '김현명',
        Number: 20200101,
        Step: 1,
        Month: 'Jan',
        participants: 1000,
        fund: 1000000,
        success: '60%',
        claim: 10
    }
];

function AdminChallengeHistory() {
    //CHECKBOX에 대하여
    const [totalcheck, setTotalcheck] = useState(false);
    const totalhandle = () => {
        setTotalcheck(!totalcheck);
    }

    return (
        <>
            <TitleBox>
                <div style={{display: "flex", alignItems: 'center'}}>
                    <Title>Ongoing Challenge</Title>
                    <Download gray style={{ marginTop: 16, marginLeft: 30, width: 27, height: 27 }} />
                    <Downloadbox style={{ marginTop: 16, fontSize: 20, color: '#707070', marginLeft: 8 }} >Download CSV</Downloadbox>
                </div>
                <Setting style={{ marginTop: 16, alignSelf: 'flex-end', justifySelf: 'flex-end' }} />
            </TitleBox>
            <Line />
            <Listbox>
                <Headerbox>
                    <Checkbox checked={totalcheck} onChange={totalhandle} id='totalcheck' value="" />
                    <NumberBox><WBB20>No.</WBB20></NumberBox>
                    <StepBox><WBB20>Step</WBB20></StepBox>
                    <MonthBox><WBB20>Month</WBB20></MonthBox>
                    <ParticipantsBox><WBB20>Participants</WBB20></ParticipantsBox>
                    <FundBox style={{marginRight: 90}}><WBB20>Fund</WBB20></FundBox>
                    <SuccessRateBox style={{marginRight: 90}}><WBB20 style={{alignSelf: "center"}}>Success rate</WBB20></SuccessRateBox>
                    <ClaimBox><WBB20>Claim</WBB20></ClaimBox>
                </Headerbox>
                {
                    listuser.map(list => (
                        <ContentBox key={list.id}>
                            <Checkbox />
                            <NumberBox><WRG16>{list.Number}</WRG16></NumberBox>
                            <StepBox><WRG16>{list.Step}</WRG16></StepBox>
                            <MonthBox><WRG16>{list.Month}</WRG16></MonthBox>
                            <ParticipantsBox><WRG16>{list.participants}</WRG16></ParticipantsBox>
                            <FundBox>
                                <WRG16>{list.fund}</WRG16>
                            </FundBox>
                            <LogBox>Log</LogBox>
                            <SuccessRateBox>
                                <WRG16>{list.success}</WRG16>
                            </SuccessRateBox>
                            <LogBox>Log</LogBox>
                            <ClaimBox><WRG16>{list.claim}</WRG16></ClaimBox>
                        </ContentBox>
                    ))
                }
            </Listbox>
            <TitleBox style={{ marginTop: 32 }}>
                <div style={{ display: "flex", alignItems: 'center' }}>
                    <Title>Previous Challenge</Title>
                    <Download gray style={{ marginTop: 16, marginLeft: 30, width: 27, height: 27 }} />
                    <Downloadbox style={{ marginTop: 16, fontSize: 20, color: '#707070', marginLeft: 8 }} >Download CSV</Downloadbox>
                </div>
                <Setting style={{ marginTop: 16, alignSelf: 'flex-end', justifySelf: 'flex-end' }} />
            </TitleBox>
            <Line />
            <Listbox>
                <Headerbox>
                    <Checkbox checked={totalcheck} onChange={totalhandle} id='totalcheck' value="" />
                    <NumberBox><WBB20>No.</WBB20></NumberBox>
                    <StepBox><WBB20>Step</WBB20></StepBox>
                    <MonthBox><WBB20>Month</WBB20></MonthBox>
                    <ParticipantsBox><WBB20>Participants</WBB20></ParticipantsBox>
                    <FundBox style={{marginRight: 90}}><WBB20>Fund</WBB20></FundBox>
                    <SuccessRateBox style={{marginRight: 90}}><WBB20 style={{alignSelf: "center"}}>Success rate</WBB20></SuccessRateBox>
                    <ClaimBox><WBB20>Claim</WBB20></ClaimBox>
                </Headerbox>
                {
                    listuser.map(list => (
                        <ContentBox key={list.id}>
                            <Checkbox />
                            <NumberBox><WRG16>{list.Number}</WRG16></NumberBox>
                            <StepBox><WRG16>{list.Step}</WRG16></StepBox>
                            <MonthBox><WRG16>{list.Month}</WRG16></MonthBox>
                            <ParticipantsBox><WRG16>{list.participants}</WRG16></ParticipantsBox>
                            <FundBox>
                                <WRG16>{list.fund}</WRG16>
                            </FundBox>
                            <LogBox>Log</LogBox>
                            <SuccessRateBox>
                                <WRG16>{list.success}</WRG16>
                            </SuccessRateBox>
                            <LogBox>Log</LogBox>
                            <ClaimBox><WRG16>{list.claim}</WRG16></ClaimBox>
                        </ContentBox>
                    ))
                }
            </Listbox>
        </>
    );
}

export default AdminChallengeHistory;

const TitleBox = styled.div`
    width: 1372px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

//전체 List를 보관하는 박스
const Listbox = styled.div`
    width: 1372px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
   
    background: white;
    border-radius: 10px;
 `;

//Header 칸
//padding만큼 밀리는 경향이 존재함
const Headerbox = styled.div`
    width: 1340px;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 32px;
    margin-bottom: 8px;
    border-bottom: 1px solid #303030;

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
    margin-right: 16px;
`;

const NumberBox = styled.div`
    width: 85px;
    height: 25px;
    margin-right: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StepBox = styled.div`
    width: 50px;
    height: 25px;
    margin-right: 35px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const MonthBox = styled.div`
    width: 70px;
    height: 25px;
    margin-right: 35px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ParticipantsBox = styled.div`
    width: 125px;
    height: 25px;
    margin-right: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const FundBox = styled.div`
    width: 90px;
    height: 25px;
    margin-right: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const SuccessRateBox = styled.div`
    width: 125px;
    height: 25px;
    margin-right: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ClaimBox = styled.div`
    width: 60px;
    height: 25px;
    margin-right: 30px;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

//Log와 관련된 박스
const LogBox = styled.div`
    width: 60px;
    height: 23px;
    border-radius: 3px;
    background-color: #5cc27b;
    margin-right: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    font-family: NunitoSans-Regular;
    color: #ffffff;
    letter-spacing: 0.16px;
    line-height: 1.33;
    cursor: pointer;
`;