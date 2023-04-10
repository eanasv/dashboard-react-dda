import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import { TabsContainer } from "./pages/Tabs/ tabsContainer/TabsContainer";
import Tab1 from "./pages/Tabs/tab1/Tab1";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TabsContainer} />
          {/* <Route path="/about" component={About} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
