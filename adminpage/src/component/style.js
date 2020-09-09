import styled, { css } from 'styled-components';
import download from './image/download.jpg';
import search from './image/search.jpg';
import setting from './image/setting.png';
import analytic from './image/analytic.png';

//그 페이지의 큰 제목
export const Title = styled.div`
  margin-top: 16px;
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
export const WBB20 = styled.span`
  font-size: 20px;
  font-family: NunitoSans-Bold;
  color: #303030;

  letter-spacing: 0.4px;
  line-height: 1.33;
`;

export const WBB18 = styled.span`
  font-size: 18px;
  font-family: NunitoSans-Bold;
  color: #303030;

  letter-spacing: 0.36px;
  line-height: 1.33;
`;

export const WBB16 = styled.span`
  font-size: 16px;
  font-family: NunitoSans-Bold;
  color: #303030;

  letter-spacing: 0.16px;
  line-height: 1.33;
`;

export const WRG20 = styled.span`
  font-size: 20px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.4px;
  line-height: 1.33;
`;

export const WRG18 = styled.span`
  font-size: 18px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.36px;
  line-height: 1.33;
`;

export const WRG16 = styled.span`
  font-size: 16px;
  font-family: NunitoSans-Regular;
  color: #707070;

  letter-spacing: 0.16px;
  line-height: 1.33;
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

export const Download = styled.input.attrs({
  type: 'button'
})`
  background-image: url(${download});
  background-size: contain;
  border: none;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
  ${props => props.gray && css`
    background-color: #F7F7F7;
  `}
  ${props => props.white && css`
    background-color: white
  `}
`;

export const Downloadbox = styled.div`
  width: 500px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Search = styled.div`
  background-image: url(${search});
  background-color: white;
  background-size: contain;
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

export const Setting = styled.input.attrs({
  type: 'button'
})`
  background-image: url(${setting});
  margin-left: 8px;
  background-color: white;
  background-size: contain;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Analytics = styled.div`
  background-image: url(${analytic});
  background-color: white;
  background-size: cover;
  border: none;
  width: 800px;
  height: 250px;
  margin-left: 58px;
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

//adminChallenge 요소
export const CategoryBox = styled.div`
  width: 1562px;
  height: 120px;
  padding-left: 36px;
  margin-top: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VerifyButton = styled.button`
  width: 150px;
  height: 60px;
  border-radius: 10px;
  border-width: 0px;
  background: #5cc27b;
  margin-left: 8px;
  color: white;

  ${props => props.reject && css`
      background-color: rgba(255, 0, 0, 0.8);
  `}

  font-family: NunitoSans-Bold;
  font-size: 20px;
  line-height: 1.35;
  letter-spacing: 0.4px;
`;