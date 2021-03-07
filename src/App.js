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


function App() {
  return (
    <div className="App">
      <Router>
      <>
        <Header/> 
        <AppBody>
          <SideBar/>
          <Switch>
            <Route path="/" exact>
              {/*chat*/}
            </Route>
          </Switch>
        </AppBody>
      </>
    </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`
    display: flex;
    height : 100vh; 
`;