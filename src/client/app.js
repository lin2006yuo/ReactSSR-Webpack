import React, { Component } from "react"
import { hot } from "react-hot-loader/root"
import { Router, Link } from "@reach/router"
import TabBar from "./components/tabbar"
import "./style/app.css"

import Home from "./pages/home"
import Dash from "./pages/dash"
import Profile from './pages/profile'

class App extends Component {
  render() {
    return (
      <div className='__app'>
        <h1 className='__app_title'>My App22</h1>
        <div className='__app_content'>
          <Router>
            <Home path='/' />
            <Dash path='dashboard' />
            <Profile path='profile'/>
          </Router>
        </div>
        <TabBar />
      </div>
    )
  }
}

export default hot(App)
