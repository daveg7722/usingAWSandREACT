import React, {useRef, useEffect, useState} from 'react';
import './App.css';
import DisplayPosts from './components/DisplayPosts';
//import {withAuthenticator} from 'aws-amplify-react'
import Navbar from './components/Navbar';
import Profile from './Profile'

import UseContext from './UseContext'

import {Route, Switch} from 'react-router-dom'

import * as classes from './css/App.module.css'

function App() {

  //const viewWidth = useRef(window.innerWidth);
  //const viewHeight  = useRef(window.innerHeight);

  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setViewWidth(window.innerWidth));
  }, []);

  return (
    <div>
      <Navbar/>
      <div style={{position:'absolute', top:'7%', height:'95%', width:'100%'}}>
        <Switch>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/">
            <DisplayPosts viewWidth={viewWidth}/>
          </Route>
        </Switch>
      </div> 
    </div>
  );
}

export default App;//withAuthenticator(App, {includeGreetings: true});

/*
    <SearchPosts viewWidth={viewWidth}/>
    <CreatePost />
    <DisplayPosts />
*/