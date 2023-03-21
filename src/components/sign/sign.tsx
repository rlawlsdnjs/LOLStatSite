import React, { MouseEventHandler, useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "@firebase/auth";
import { auth } from "../../api/firebase";
import { updateProfile } from "@firebase/auth";
import { Firestore } from "firebase/firestore";
import styled from "styled-components";
import { loginState } from "../../store";
import { useRecoilValue, useResetRecoilState } from "recoil";

export const SignUp = () => {
  const user = auth.currentUser;
  const userInfo = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nick, setNick] = useState("");

  const [isCreate, setIsCreate] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNick(e.target.value);
  };

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreate((pre) => !pre);
  };

  const handleLogout = () => {
    signOut(auth);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원 가입일때
    if (isCreate) {
      createUserWithEmailAndPassword(auth, email, pwd)
        .then((profile) => {
          alert("회원가입성공");
          updateProfile(profile.user, {
            displayName: nick,
          });
          console.log(profile);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      signInWithEmailAndPassword(auth, email, pwd)
        .then(() => {
          alert("로그인 성공");
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <>
      <Sign>
        <SignForm onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleEmail}
            value={email}
            required
          />
          <br />

          <input
            type="password"
            name="pwd"
            onChange={handlePwd}
            value={pwd}
            required
          />
          <br />

          {isCreate && (
            <input name="nick" onChange={handleNick} value={nick} required />
          )}
          <br />

          <button type="submit">{isCreate ? "회원가입" : "로그인"}</button>
          <br />
          <button type="button" onClick={handleClickCreate}>
            {isCreate ? "취소" : "회원가입"}
          </button>
        </SignForm>
      </Sign>
    </>
  );
};
export const handleLogout = () => {
  signOut(auth);
};

const Sign = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const SignForm = styled.form`
  position: absolute;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
