import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { CreatePost, Home } from "./pages";

const { header, logo_design, create_btn, main } = {
  header:
    "w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]",
  logo_design: "w-28 object-contain",
  create_btn:
    "font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md",
  main: "sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]",
};

const App = () => {
  return (
    <BrowserRouter>
      <header className={header}>
        <Link to="/">
          <img src={logo} alt="imagee_logo" className={logo_design} />
        </Link>
        <Link to="/create-post" className={create_btn}>
          Create
        </Link>
      </header>
      <main className={main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
