import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import { Routes, Route, Link, matchPath } from "react-router-dom";

import { EntityDetails } from "../../entityDetails/EntityDetails";
import { EntityList } from "../../entityList/EntityList";
import Tab1 from "../tab1/Tab1";
import { Tab2 } from "../tab2/Tab2";
import "../Tabs.css";

export const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [
    {
      id: 1,
      tabTitle: "Tab 1",
      title: "Overall Empployees",
      content: <Tab1 />,
    },
    {
      id: 2,
      tabTitle: "Tab 2",
      title: "Overall Entities",
      content: <Tab2 />,
      //path: "/tab2/entity-list",
      // content: (
      //   <div>

      //   </div>
      // ),
    },
    {
      id: 3,
      tabTitle: "Tab 3",
      title: "Dashboard 3",
      content: "Content will populate here",
    },
    {
      id: 4,
      tabTitle: "Tab 4",
      title: "Dashboard 4",
      content: "Content will populate here",
    },
  ];

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tab-button-container">
        {tabs.map((tab, i) => (
          <button
            // disabled={activeTab === `${tab.id}`}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={[
              "tab-button",
              "tab",
              tab.id === activeTab ? "active-tab" : "",
            ].join(" ")}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) =>
          tab.id === activeTab ? <p key={tab.id}>{tab.content}</p> : null
        )}
      </div>
    </div>
  );
};
