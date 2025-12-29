import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CreatePaste from "./pages/CreatePage";
import ViewPaste from "./pages/ViewPaste";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
