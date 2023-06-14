import React, { useEffect, useState } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import { LoadingSpinner } from "./components/spinner/LoadingSpinner";
import { TabsContainer } from "./pages/Tabs/ tabsContainer/TabsContainer";
import Tab1 from "./pages/Tabs/tab1/Tab1";

import { useSelector } from "react-redux";
import FileUpload from "./pages/dataFileUpload/FileUpload";

function App() {
  const isLoadingVar = useSelector((state: any) => state.loader.isLoading);
  const [isLoading, setisLoading] = useState(isLoadingVar);

  //const isLoading = useSelector((state: any) => state.loader.isLoading);

  useEffect(() => {
    setisLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="App">
      {useSelector((state: any) => state.loader.isLoading) ? (
        <LoadingSpinner />
      ) : (
        ""
      )}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TabsContainer} />
          <Route path="/upload" component={FileUpload} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
