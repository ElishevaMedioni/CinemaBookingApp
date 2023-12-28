// App.js
import React , { useState } from "react";
import Login from "../src/js/Login.js";
import Main from "../src/js/main.js";
import Info from "../src/js/Info.js";
import Layout from "./js/Layout";
import Application from "./js/Application";
import ManagerApp from "./js/ManagerApp.js";

import { Route, Routes } from "react-router-dom";


function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Initialize the isAdmin state
 

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login"  element={<Login setIsAdmin={setIsAdmin} />} />
        <Route element={<Layout isAdmin={isAdmin} />}> 
          <Route path="application" element={<Application />} />
          <Route path="application/info" element={<Info />} />
          <Route path="ManagerApp" element={<ManagerApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
