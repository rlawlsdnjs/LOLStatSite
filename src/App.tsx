import { useState } from "react";
import React, { useContext } from "react";
import "./App.css";
import { app, db, auth } from "./api/firebase";
import { AuthContext } from "./components/sign/context/authContext";
import { SignUp } from "./components/sign/sign";
import Header from "./pages/header";
import { loginState, searchKeyState } from "./store";
import { useRecoilValue } from "recoil";
import { getAuth } from "firebase/auth";
import LolResult from "./components/search/LolSearch";
import LolSearchResult from "./components/search/LolSearchResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchLol from "./hooks/SearchLol";
function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  const userInfo = useContext(AuthContext);
  const loginValue = useRecoilValue(loginState);

  console.log(loginValue);

  return (
    <BrowserRouter>
      <Header />
      <LolResult />
      <SearchLol></SearchLol>
      <Routes>
        <Route path="/" element={loginValue && <SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
