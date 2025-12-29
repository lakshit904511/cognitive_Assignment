import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CreatePaste from "./pages/CreatePage";
import ViewPaste from "./pages/ViewPaste";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
