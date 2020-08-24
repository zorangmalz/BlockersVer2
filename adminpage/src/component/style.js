import styled from 'styled-components';
import download from './image/download.jpg';
import search from './image/search.jpg';

//Box Style
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

//Blockers Admin 보여줌
export const Header = styled.div`
  display: inline-block;
  padding: 42px 0 42px 48px;
  width: 100vw;
  height: auto;
  background: white;
  align-self: center;

  color: #5cc77b;
  font-size: 40px;
  font-family: NunitoSans-Bold;
  line-height: 54px;
  letter-spacing: 0.8px;
`;

//회색 바탕
export const BackContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
`;

//메뉴 전체 박스
export const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 140px;
  height: 100vh;
  margin-right: 36px;
`;

//메뉴의 하나요소
export const Menu = styled.button`
  width: 140px;
  height: 115px;
  border: 0px;
  font-family: NunitoSans-Regular;
  font-size: 24px;
  text-align: center;
  line-height: 32px;
  letter-spacing: 0.48px;
  background: white;
`;

//Header와 Menu를 둘다 제외
export const MainContainer = styled.div`
    padding-left: 36px;
`;

//그 페이지의 큰 제목
export const Title = styled.text`
  margin-left: 32px;
  font-family: NunitoSans-Bold;
  font-size: 40px;
  line-height: 54px;
  letter-spacing: 0.8px;
  color: rgba(0,0,0,0.8);
`;

//제목 아래의 선
export const Line = styled.div`
  width: 1600px;
  background: #313131;
  height: 1px;
  margin-top: 16px;
  margin-bottom: 19px;
`;

//Font Style
export const WRG20 = styled.span`
  font-size: 20px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.4px;
  line-height: 27px;
`;

export const WRG18 = styled.span`
  font-size: 18px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.36px;
  line-height: 24px;
`;

export const WRG16 = styled.span`
  font-size: 16px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.16px;
  line-height: 22px;
`;

//전체 List를 보관하는 박스
export const Listbox = styled.div`
  width: 1600px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
`;

//ListBox에서 맨 위에 있는 박스
//padding 만큼 밀리는 경향이 있음
export const Topbox = styled.div`
  width: 1552px;
  padding: 12px 32px 16px 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Leftbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Rightbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 150px;
  padding-bottom: 5px;
  border-bottom: 1px solid #333333;
`;

export const Download = styled.input`
  background-image: url(${download});
  background-size: cover;
  border: none;
  width: 27px;
  height: 27px;
  cursor: pointer;
  margin-right: 8px;
`;

export const Search = styled.input`
  background-image: url(${search});
  background-color: white;
  background-size: cover;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 120px;
  border: 0;

  display: block;
  font-family: NunitoSans-Regular;
  color: #000000;
`;

//Header 칸
//padding만큼 밀리는 경향이 존재함
export const Headerbox = styled.ul`
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
export const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  width: 24px;
  height: 24px;
  border: 0.5px normal #000000;
  margin-right: 20px;
`;

export const NameBox = styled.div`
  width: 55px;
  height: 25px;
  margin-right: 50px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BirthBox = styled.div`
  width: 80px;
  height: 25px;
  margin-right: 40px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GenderBox = styled.div`
  width: 40px;
  height: 25px;
  margin-right: 50px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IDBox = styled.div`
  width: 210px;
  height: 25px;
  margin-right: 45px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WalletAddressBox = styled.div`
  width: 310px;
  height: 25px;
  margin-right: 40px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChallengeBox = styled.div`
  width: 120px;
  height: 25px;
  margin-right: 30px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TimerBox = styled.div`
  width: 200px;
  height: 25px;
  margin-right: 55px;

  font-size: 18px;
  font-family: NunitoSans-Regular;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #707070;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentBox = styled.div`
  width: 1568px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 32px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;