import React, { useState } from "react"
import "./App.css";
import NewRun from "./pages/import-runs";
import Comparator from "./pages/comparator";

function App({ theme = "dark" }) {
  const [selectedPage, setSelectedPage] = useState('home');
  
  return (
    <div>
      <ef-appstate-bar heading="IN DEVELOPMENT" state="info">Internal use only.</ef-appstate-bar>
      <ef-sidebar-layout>
        <ef-header slot="sidebar-header" level="1">Performance Comparator</ef-header>
        <ef-panel slot="sidebar-content">
          <ef-tab-bar id="main-tab-bar" vertical alignment="center" class="w-full flex flex-col justify-start" ariaSelected={selectedPage}>
            <ef-tab label="Home" value="home" icon="home" onClick={() => setSelectedPage('home')}></ef-tab>
            <ef-tab label="Import Run(s)" value="add" icon="add" onClick={() => setSelectedPage('addRun')}></ef-tab>
          </ef-tab-bar>        
        </ef-panel>
        <ef-header slot="main-header" level="1">
          <ef-button slot="right" transparent icon="settings"></ef-button>
          <ef-button slot="right" transparent icon="share"></ef-button>
        </ef-header>
        <ef-panel transparent slot="main-content" spacing class="p-5">
            {selectedPage == 'home' && <Comparator />}
            {selectedPage == 'addRun' && <NewRun />}
        </ef-panel>
      </ef-sidebar-layout>
    </div>
  );
}

export default App;
