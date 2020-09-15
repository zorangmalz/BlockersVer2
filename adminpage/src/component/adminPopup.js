import React, { useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import DateCss from "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

registerLocale("ko", ko);

//공통 css
const Background = styled.div`
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 10px;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    box-shadow: 0 25px 30px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    padding-top: 32px;
`;

const Title = styled.div`
    font-family: NunitoSans-Regular;
    font-size: 30px;
    font-stretch: normal;
    line-height: 1.37;
    letter-spacing: 0.6px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 32px;
    margin-bottom: 32px;
`;

const Line = styled.div`
    height: 0.2px;
    background-color: #e7e7e7;
    margin-bottom: 16px;
`;

const TimeStamp = styled.div`
    width: 145px;
    margin-left: 32px;
    margin-right: 30px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.4px;
    text-align: left;
    color: #707070;
`;

const Apply = styled.button`
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 60px;
    border-radius: 10px;
    background-color: #5cc77b;
    border-width: 0px;

    font-family: NunitoSans-Bold;
    font-size: 20px;
    font-weight: bold;
    line-height: 1.35;
    letter-spacing: 0.4px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
`;

const ColorTitle = styled.div`
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: #5cc77b;
    margin-left: 32px;
    margin-bottom: 16px;
`;

//Button css
const ButtonBorder = styled.button`
    align-items: center;
    padding: auto;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border-width: 1px;
    border-color: #000000;
    background-color: #ffffff;
    padding: 0px;
`;

const ButtonFill = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #000000;
    margin: auto;
`;

const Elements = styled.div`
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-weight: normal;
    line-height: 1.35;
    letter-spacing: 0.4px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 15px;
    margin-right: 15px;
`;

const DateCustomStyle = styled.button`
    width: 215px;
    height: 36px;
    border-radius: 10px;
    border-width: 0px;
    background-color: #e5e5e5;
    
    font-family: NunitoSans-Regular;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
`;

//Log css
const Contents = styled.div`
    width: 300px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: #707070;
`;

export function Log() {
    return (
        <Background style={{ width: 566, height: 590 }}>
            <Title>Log</Title>
            <Line style={{ width: 566 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <TimeStamp>Timestamp</TimeStamp>
                <Contents>Contents(ex. Timer, challenge…)</Contents>
            </div>
            <div style={{flexDirection: "row", display: "flex", marginTop: 24}}>
                <TimeStamp>UTC 12:00:00</TimeStamp>
                <Contents>100:00:00</Contents>
            </div>
        </Background>
    )
}

//Wallet Log css
const Txhash = styled.div`
    width: 190px;
    margin-right: 30px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.2px;
    color: #707070;
`;

const Type = styled.div`
    width: 115px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.2px;
    color: #707070;
    margin-right: 30px;
`;

const AmountStatusRef = styled.div`
    width: 90px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: #707070;
    margin-right: 30px;
`;
export function WalletLog() {
    return (
        <Background style={{ width: 1084, height: 590 }}>
            <Title>Wallet Log</Title>
            <Line style={{ width: 1084 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <TimeStamp>Timestamp</TimeStamp>
                <Txhash>Txhash</Txhash>
                <Type>Type</Type>
                <AmountStatusRef>Amount</AmountStatusRef>
                <AmountStatusRef>Status</AmountStatusRef>
                <AmountStatusRef>Ref</AmountStatusRef>
            </div>
            <div style={{flexDirection: "row", display: "flex", marginTop: 24}}>
                <TimeStamp>UTC 12:00:00</TimeStamp>
                <Txhash>0xasdjlk21oi9i9123</Txhash>
                <Type>Verification</Type>
                <AmountStatusRef>+10000</AmountStatusRef>
                <AmountStatusRef>Confirm</AmountStatusRef>
                <AmountStatusRef>GAS</AmountStatusRef>
            </div>
        </Background>
    )
}

//Log(Success) & Log(Fund) css
const StepStatus = styled.div`
    width: 110px;
    margin-right: 30px;
    font-family: NunitoSans-Bold;
    font-size: 20px;
    font-weight: bold;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: rgba(0, 0, 0, 0.8);
    margin-left: 32px;

    ${props => props.step && css`
        color: #5cc77b;
        margin-top: 16px;
        margin-bottom: 16px;
    `}

    ${props => props.status && css `
        color: rgba(255, 0, 0, 0.8);
        margin-top: 16px;
        margin-bottom: 16px;
    `}
`;

const SuccessRateFund = styled.div`
    width: 130px;
    font-family: NunitoSans-Regular;
    font-size: 20px;
    line-height: 1.35;
    letter-spacing: 0.4px;
    color: #707070;
`;

export function LogSuccess() {
    return (
        <Background style={{ width: 566, height: 590 }}>
            <Title>Log(Success)</Title>
            <Line style={{ width: 566 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <StepStatus>Step</StepStatus>
                <StepStatus>Status</StepStatus>
            </div>
            <div style={{flexDirection: "row", display: "flex"}}>
                <StepStatus step >01</StepStatus>
                <StepStatus status >Ongoing</StepStatus>
            </div>
            <Line style={{ width: 566 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <TimeStamp>Timestamp</TimeStamp>
                <SuccessRateFund>Success rate</SuccessRateFund>
            </div>
            <div style={{flexDirection: "row", display: "flex", marginTop: 24}}>
                <TimeStamp>UTC 12:00:00</TimeStamp>
                <SuccessRateFund>90%</SuccessRateFund>
            </div>
        </Background>
    )
}

export function LogFund() {
    return (
        <Background style={{ width: 566, height: 590 }}>
            <Title>Log(Success)</Title>
            <Line style={{ width: 566 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <StepStatus>Step</StepStatus>
                <StepStatus>Status</StepStatus>
            </div>
            <div style={{flexDirection: "row", display: "flex"}}>
                <StepStatus step >01</StepStatus>
                <StepStatus status >Ongoing</StepStatus>
            </div>
            <Line style={{ width: 566 }} />
            <div style={{flexDirection: "row", display: "flex"}}>
                <TimeStamp>Timestamp</TimeStamp>
                <SuccessRateFund>Fund</SuccessRateFund>
            </div>
            <div style={{flexDirection: "row", display: "flex", marginTop: 24}}>
                <TimeStamp>UTC 12:00:00</TimeStamp>
                <SuccessRateFund>90%</SuccessRateFund>
            </div>
        </Background>
    )
}

//Setting & Confirm css
const Word = styled.div`
    margin-left: 32px;
    font-family: NunitoSans-Regular;
    font-size: 30px;
    font-style: normal;
    line-height: 1.37;
    letter-spacing: 0.6px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
`;

export function SettingComplete() {
    return (
        <Background style={{ width: 566, height: 364 }}>
            <Title>Setting</Title>
            <Line style={{ width: 566, marginBottom: 32 }} />
            <Word>이미 금주 인증을 진행했습니다.</Word>
            <div style={{marginTop: 90, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

export function Confirm() {
    return (
        <Background style={{ width: 566, height: 364 }}>
            <Title>Confirm</Title>
            <Line style={{ width: 566, marginBottom: 32 }} />
            <Word>삭제/수정하시겠습니까?</Word>
            <div style={{marginTop: 90, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

//Verification Filter css
const SearchInput = styled.input.attrs(props => ({
    type: 'text',
    placeholder: "Search"
}))`
    width: 150px;
    height: 27px;
    border-width: 0px;
    border-bottom-width: 1px;
    border-bottom-color: #000000;
    display: block;
    margin-left: 32px;
    margin-bottom: 10px;
`;

function YesorNo(state, action) {
    switch (action.type) {
        case 'YES':
            return true;
        case 'NO':
            return false;
        default:
            return state;
    }
}

export function Verification() {
    const [yes, dispatch] = useReducer(YesorNo, true);
    const onYes = () => {dispatch({ type: 'YES' })}
    const onNo = () => {dispatch({ type: 'NO' })}
    return (
        <Background style={{ width: 566, height: 500 }}>
            <Title>Verification Filter</Title>
            <Line style={{ width: 566, marginBottom: 32 }} />
            <ColorTitle>Picture</ColorTitle>
            <div style={{display: "flex", flexDirection: "row", marginBottom: 18}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onYes}>
                    {yes === true ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>Y</Elements>
                <ButtonBorder onClick={onNo}>
                    {yes === false ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>N</Elements>
            </div>
            <ColorTitle>Name</ColorTitle>
            <SearchInput />
            <ColorTitle>ID</ColorTitle>
            <SearchInput />
            <div style={{marginTop: 45, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

//Setting Function
function Gender(state, action) {
    switch (action.type) {
        case 'ALL':
            return 'all';
        case 'MALE':
            return 'male';
        case 'FEMALE':
            return 'female';
    }
}

function Time(state, action) {
    switch (action.type) {
        case 'MONTH':
            return 'month';
        case 'DAY':
            return 'day';
    }
}

function Age(state, action) {
    switch (action.type) {
        case 'ALL':
            return 0;
        case '20':
            return 20;
        case '30':
            return 30;
        case '40':
            return 40;
        case '50':
            return 50;
        case 'Etc':
            return 100;
    }
}

export function Setting() {
    //성별
    const [gender, genderpatch] = useReducer(Gender, 'all')
    const onAll = () => {genderpatch({ type: 'ALL' })}
    const onMale = () => {genderpatch({ type: 'MALE' })}
    const onFemale = () => {genderpatch({ type: 'FEMALE' })}

    //시간
    const [time, timepatch] = useReducer(Time, 'month')
    const onMonth = () => {timepatch({ type: 'MONTH' })}
    const onDay = () => {timepatch({ type: 'DAY' })}

    //Date-Picker
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const DateCustomInput = ({ value, onClick }) => (
        <DateCustomStyle onClick={onClick} >{value}</DateCustomStyle>
    )

    //나이
    const [age, agepatch] = useReducer(Age, 0)
    const onAllage = () => {agepatch({ type: 'ALL' })}
    const onTwenty = () => {agepatch({ type: '20' })}
    const onThirty = () => {agepatch({ type: '30' })}
    const onFourty = () => {agepatch({ type: '40' })}
    const onFifty = () => {agepatch({ type: '50' })}
    const onEtc = () => {agepatch({ type: 'Etc' })}

    return (
        <Background style={{ width: 566, height: 550 }}>
            <Title>Setting</Title>
            <Line style={{ width: 566, marginBottom: 32 }} />
            <ColorTitle>Gender</ColorTitle>
            <div style={{display: "flex", flexDirection: "row", marginBottom: 18}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onAll}>
                    {gender === 'all' ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>ALL</Elements>
                <ButtonBorder onClick={onMale}>
                    {gender === 'male' ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>Male</Elements>
                <ButtonBorder onClick={onFemale}>
                    {gender === 'female' ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>Female</Elements>
            </div>
            <ColorTitle>Time</ColorTitle>
            <div style={{display: "flex", flexDirection: "row", marginBottom: 32}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onMonth}>
                    {time === 'month' ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>ALL</Elements>
                <ButtonBorder onClick={onDay}>
                    {time === 'day' ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>Male</Elements>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: 18, marginLeft: 32 }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    locale="ko"
                    selectsStart
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<DateCustomInput />}
                />
                <Elements> ~ </Elements>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    locale="ko"
                    selectsEnd
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<DateCustomInput />}
                />
            </div>
            <ColorTitle>Age</ColorTitle>
            <div style={{display: "flex", flexDirection: "row", marginBottom: 18}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onAllage}>
                    {age === 0 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>All</Elements>
                <ButtonBorder onClick={onTwenty}>
                    {age === 20 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>20</Elements>
                <ButtonBorder onClick={onThirty}>
                    {age === 30 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>30</Elements>
                <ButtonBorder onClick={onFourty}>
                    {age === 40 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>40</Elements>
                <ButtonBorder onClick={onFifty}>
                    {age === 50 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>50</Elements>
                <ButtonBorder onClick={onEtc}>
                    {age === 100 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>Etc</Elements>
            </div>
            <div style={{marginTop: 45, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

//Challenge Search Function
function Step(state, action) {
    switch (action.type) {
        case 'ONE':
            return 1;
        case 'TWO':
            return 2;
        case 'THREE':
            return 3;
    }
}

export function ChallengeSearch() {
    const [step, steppatch] = useReducer(Step, 0);
    const onOne = () => {steppatch({ type: 'ONE' })}
    const onTwo = () => {steppatch({ type: 'TWO' })}
    const onThree = () => {steppatch({ type: 'THREE' })}

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const DateCustomInput = ({ value, onClick }) => (
        <DateCustomStyle onClick={onClick} >{value}</DateCustomStyle>
    )

    return (
        <Background style={{ width: 566, height: 480 }}>
            <Title>Challenge Search</Title>
            <Line style={{ width: 566 }} />
            <ColorTitle>Time</ColorTitle>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: 18, marginLeft: 32 }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    locale="ko"
                    selectsStart
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<DateCustomInput />}
                />
                <Elements> ~ </Elements>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    locale="ko"
                    selectsEnd
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<DateCustomInput />}
                />
            </div>
            <ColorTitle>Step</ColorTitle>
            <div style={{display: "flex", flexDirection: "row", marginBottom: 18}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onOne}>
                    {step === 1 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>1</Elements>
                <ButtonBorder onClick={onTwo}>
                    {step === 2 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>2</Elements>
                <ButtonBorder onClick={onThree}>
                    {step === 3 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>3</Elements>
            </div>
            <div style={{marginTop: 130, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

export function DateSetting() {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const DateCustomInput = ({ value, onClick }) => (
        <DateCustomStyle onClick={onClick} >{value}</DateCustomStyle>
    )

    return (
        <Background style={{ width: 566, height: 330 }}>
            <Title>Date Setting</Title>
            <Line style={{ width: 566 }} />
            <ColorTitle>Time</ColorTitle>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: 18, marginLeft: 32 }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    locale="ko"
                    selectsStart
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<DateCustomInput />}
                />
                <Elements> ~ </Elements>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    locale="ko"
                    selectsEnd
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<DateCustomInput />}
                />
            </div>
            <div style={{marginTop: 60, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}

//Challenge Filter Function
function StepFilter(state, action) {
    switch (action.type) {
        case 'ONE':
            return 1;
        case 'TWO':
            return 2;
        case 'THREE':
            return 3;
    }
}

export function ChallengeFilter() {
    const [step, steppatch] = useReducer(StepFilter, 0);
    const onOne = () => {steppatch({ type: 'ONE' })}
    const onTwo = () => {steppatch({ type: 'TWO' })}
    const onThree = () => {steppatch({ type: 'THREE' })}

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const DateCustomInput = ({ value, onClick }) => (
        <DateCustomStyle onClick={onClick} >{value}</DateCustomStyle>
    )

    return (
        <Background style={{ width: 566, height: 500 }}>
            <Title>Challenge Search</Title>
            <Line style={{ width: 566 }} />
            <ColorTitle>Time</ColorTitle>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: 80, marginLeft: 32 }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    locale="ko"
                    selectsStart
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<DateCustomInput />}
                />
                <Elements> ~ </Elements>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    locale="ko"
                    selectsEnd
                    dateFormat="yyyy.MM.dd"
                    className="DateCss"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<DateCustomInput />}
                />
            </div>
            <ColorTitle>Step</ColorTitle>
            <div style={{display: "flex", flexDirection: "row"}}>
                <ButtonBorder style={{marginLeft: 32}} onClick={onOne}>
                    {step === 1 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>1</Elements>
                <ButtonBorder onClick={onTwo}>
                    {step === 2 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>2</Elements>
                <ButtonBorder onClick={onThree}>
                    {step === 3 ? <ButtonFill /> : <></>}
                </ButtonBorder>
                <Elements>3</Elements>
            </div>
            <div style={{marginTop: 80, marginLeft: 208}}>
                <Apply>Apply</Apply>
            </div>
        </Background>
    )
}