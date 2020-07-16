import React from 'react';

import './App.css';
import Auth from "./components/Auth";


import {BrowserRouter, Route, Router} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>

                <Route to='/' component={Auth}/>

        </BrowserRouter>

    </div>
  );
}

export default App;
