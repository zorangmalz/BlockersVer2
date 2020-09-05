import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import AdminCommunityNotice from './adminCommunityNotice';
import AdminCommunityList from './adminCommunityList';

//Box Style
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

//Blockers Admin 보여줌
const Header = styled.div`
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
const BackContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
`;

//메뉴 전체 박스
const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 140px;
  margin-right: 36px;
`;

//메뉴의 하나요소
const Menu = styled.button`
  width: 140px;
  height: 115px;
  border: 0px;
  font-family: NunitoSans-Regular;
  font-size: 24px;
  text-align: center;
  line-height: 32px;
  letter-spacing: 0.48px;
  background: white;
  text-decoration: 'none';
  cursor: pointer;
`;

//Header와 Menu를 둘다 제외
const MainContainer = styled.div`
    padding-left: 36px;
`;

const SideBar = styled.button`
  width: 140px;
  height: 60px;

  font-size: 18px;
  font-family: NunitoSans-Bold;
  line-height: 1.33;
  letter-spacing: 0.36px;
  color: #ffffff;
  text-align: center;
  background-color: #5cc27b;
  opacity: 0.6;
  border-width: 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <h2>main</h2>
    },
    {
        path: '/user',
        main: () => <h2>user</h2>
    },
    {
        path: '/challenge',
        main: () => <h2>challenge</h2>
    },
    {
        path: '/community/notice',
        main: () => <AdminCommunityNotice />
    },
    {
        path: '/community/list',
        main: () => <AdminCommunityList />
    },
    {
        path: '/market',
        main: () => <h2>market</h2>
    },

]

function AdminTemplate() {
    const [home, setHome] = useState(false);
    const [user, setUser] = useState(false);
    const [comm, setComm] = useState(false);
    const [chall, setChall] = useState(false);
    const [market, setMarket] = useState(false);
    
    useEffect(() => {
        if (home === true) {
            setUser(false);
            setComm(false);
            setChall(false);
            setMarket(false);
        }
        if (user === true) {
            setHome(false);
            setComm(false);
            setChall(false);
            setMarket(false);
        }
        if (comm === true) {
            setUser(false);
            setHome(false);
            setChall(false);
            setMarket(false);
        }
        if (chall === true) {
            setUser(false);
            setComm(false);
            setHome(false);
            setMarket(false);
        }
        if (market === true) {
            setUser(false);
            setComm(false);
            setChall(false);
            setHome(false);
        }
    })
    return (
        <Router>
            <Container>
                <Header>Blockers Admin</Header>
                <BackContainer>
                    <MenuBox>
                        <NavLink to='/'><Menu onClick={() => setHome(true)} style={{backgroundColor: home===true ? '#5cc27b' : '#ffffff', color: home===true ? '#ffffff' : '#303030'}}>Home</Menu></NavLink>
                        <NavLink to='/user'><Menu onClick={() => setUser(true)} style={{backgroundColor: user===true ? '#5cc27b' : '#ffffff', color: user===true ? '#ffffff' : '#303030'}}>User</Menu></NavLink>
                        <NavLink to='/challenge'><Menu onClick={() => setChall(true)} style={{backgroundColor: chall===true ? '#5cc27b' : '#ffffff', color: chall===true ? '#ffffff' : '#303030'}}>Challenge</Menu></NavLink>
                        {chall === true ?
                            <MenuBox>
                                <SideBar>Verify</SideBar>
                                <SideBar>History</SideBar>
                            </MenuBox>
                            :
                            false
                        }
                        <NavLink to='/community/notice'><Menu onClick={() => setComm(true)} style={{backgroundColor: comm===true ? '#5cc27b' : '#ffffff', color: comm===true ? '#ffffff' : '#303030'}}>Community</Menu></NavLink>
                        {comm === true ?
                            <MenuBox>
                                <NavLink to='/community/notice' style={{textDecorationLine: 'none'}}><SideBar>Notice</SideBar></NavLink>
                                <NavLink to='/community/list' style={{textDecorationLine: 'none'}}><SideBar>List</SideBar></NavLink>
                            </MenuBox>
                            :
                            false
                        }
                        <NavLink to='/market' style={{textDecorationLine: 'none'}}><Menu onClick={() => setMarket(true)} style={{backgroundColor: market===true ? '#5cc27b' : '#ffffff', color: market===true ? '#ffffff' : '#303030'}}>Market</Menu></NavLink>
                    </MenuBox>
                    <MainContainer>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))}
                        </Switch>
                    </MainContainer>
                </BackContainer>
            </Container>
        </Router>
    );
}

export default AdminTemplate;