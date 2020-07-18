import React from 'react';
import './style/Auth.scss'
import './style/App.scss';
import Auth from "./components/Auth";


import {BrowserRouter, Route} from "react-router-dom";

const App = ()=> {
  return (
    <div className="App">
        <div className="header">
            Welcome to vk oauth test
        </div>
        <BrowserRouter>

                <Route to='/' component={Auth}/>

        </BrowserRouter>

    </div>
  );
}

export default App;
