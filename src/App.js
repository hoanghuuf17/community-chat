import React from 'react';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link 
} from "react-router-dom";
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if(loading){
    return(
      <AppLoading>
          <AppLoadingContents>
            <h1>Ckờ mộc ckúc!...</h1>
              <Spinner
                name="pacman"
                fadeIn="none"
              />
          </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="App">
      <Router>
      {!user ? (
        <Login/>
      ):
      <>
        <Header/> 
        <AppBody>
          <SideBar/>
          <Switch>
            <Route path="/" exact>
              <Chat/>
            </Route>
          </Switch>
        </AppBody>
      </>
      } 
    </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
    display: flex;
    height : 100vh; 
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  padding-top: 100px;
  text-align : center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

