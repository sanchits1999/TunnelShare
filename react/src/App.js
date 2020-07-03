import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Home from "./components/Home/Home"


const App = (props) => {

  return (
    <BrowserRouter>
      <div style={{ width: "100%", height: "100vh" }}>
        <Route path="/" exact component={Home} />
      </div>
    </BrowserRouter>
  )
}


export default App 
