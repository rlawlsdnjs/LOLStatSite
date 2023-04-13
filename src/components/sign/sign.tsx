import React, { MouseEventHandler, useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../../api/firebase";
import { updateProfile } from "@firebase/auth";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import Logo from "../../../public/assets/images/logo.png";

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

	const [idCheck, setIdCheck] = useState(false);
	const [pwCheck, setPwCheck] = useState(false);
	const confirmId = async () => {
		const idArr: any = [];
		const querySnapshot: any = await getDocs(collection(db, "LolUser"));
		querySnapshot.forEach((doc: any) => {
			return idArr.push(doc.id);
		});
		const confirmId = idArr.includes(`${email}`);
		confirmId
			? (setIdCheck(false), alert("중복된 아이디가 있습니다."))
			: (setIdCheck(true), alert("사용가능한 아이디 입니다."));
	};

	const confirmPW = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value != pwd) {
			setPwCheck(false);
		} else setPwCheck(true);

		console.log(pwCheck);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 회원 가입일때
		if (isCreate) {
			if (idCheck && pwCheck) {
				createUserWithEmailAndPassword(auth, email, pwd).then((profile) => {
					alert("회원가입성공");
					updateProfile(profile.user, {
						displayName: nick,
					});
					console.log(profile);

					setDoc(doc(db, "LolUser", `${email}`), {
						id: email,
						nickName: nick,
						favorite: {},
					});
				});
			} else {
				alert("아이디와 비밀번호를 확인 해주세요");
			}
		} else {
			signInWithEmailAndPassword(auth, email, pwd)
				.then(() => {
					alert("로그인 성공");
					// setLogin(true);
				})
				.catch((e) => {
					alert("아이디와 비밀번호를 확인해주세요.");
				});
		}
	};

	return (
		<>
			{!userInfo ? (
				<Sign>
					<SignForm onSubmit={handleSubmit}>
						<div className="text-center pb-5">
							<img
								src={Logo}
								style={{ maxWidth: "80px", margin: "0 auto" }}
							></img>
						</div>
						<div className="relative">
							<input
								type="email"
								name="email"
								onChange={handleEmail}
								value={email}
								required
								placeholder="email"
							/>
							{isCreate && (
								<div
									className="absolute  text-sm"
									style={{
										right: "0",
										top: "50%",
										transform: "translateY(-50%)",
										cursor: "pointer",
									}}
									onClick={confirmId}
								>
									중복확인
								</div>
							)}
						</div>
						<input
							type="password"
							name="pwd"
							onChange={handlePwd}
							value={pwd}
							required
							placeholder="password"
						/>

						{isCreate && (
							<input
								type="password"
								onChange={confirmPW}
								required
								placeholder="confirm password"
							/>
						)}
						{isCreate && !pwCheck && pwd.length != 0 && (
							<div className="text-xs opacity-80 mt-2">
								비밀번호가 일치하지 않습니다.
							</div>
						)}

						{isCreate && (
							<input
								name="nick"
								onChange={handleNick}
								value={nick}
								required
								placeholder="Game ID"
							/>
						)}
						<br />
						<div className="flex justify-between">
							<button type="submit">{isCreate ? "SignUp" : "Login"}</button>
							<button type="button" onClick={handleClickCreate}>
								{isCreate ? "Cancel" : "SignUp"}
							</button>
						</div>
					</SignForm>
				</Sign>
			) : null}
		</>
	);
};

const Sign = styled.div`
	position: fixed;
	z-index: 40;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
`;

const SignForm = styled.form`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 40px;
	border: 2px solid #fff;
	border-radius: 10px;
	color: #fff;
	background: rgba(0, 0, 0, 0.3);
	& input {
		background: none;
		border: none;
		border-bottom: 1px solid #fff;
		padding: 5px;
		margin: 5px 0;
		display: block;
		outline: none;
	}
	& input::focus {
		background: none;
		outline: none;
	}
	& input::placeholder {
		color: #fff;
	}
`;
