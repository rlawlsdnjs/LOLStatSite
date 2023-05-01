import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState } from "../store/lol";
import { AuthContext } from "../components/sign/context/authContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";
import Logo from "../../public/assets/images/logo.png";
const Header = () => {
	const userInfo = useContext(AuthContext);
	const [sign, setSign] = useRecoilState<boolean>(loginState);
	const user = auth.currentUser;
	const signIn = () => {
		setSign((current) => !current);
	};

	const handleLogout = () => {
		signOut(auth);
		setSign(false);
	};

	return (
		<HeaderContainer>
			<HeaderCenter>
				<HeaderTitle>
					<Link to="/">
						<LogoImg src={Logo} alt="메인 Logo" />
					</Link>
				</HeaderTitle>
				<SignList className="signList">
					{userInfo && (
						<li>
							<span>{user?.displayName}</span>님
						</li>
					)}
					<li>
						{!userInfo ? (
							<button onClick={signIn}>Login</button>
						) : (
							<button onClick={handleLogout}>LogOut</button>
						)}
					</li>
				</SignList>
			</HeaderCenter>
		</HeaderContainer>
	);
};
const HeaderContainer = styled.div`
	position: fixed;
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	padding: 20px;
`;
const HeaderCenter = styled.div`
    display: flex;
    max-width: 1200px;
    width 100%;
    margin: 0 auto;
`;

const HeaderTitle = styled.h1`
	margin-right: auto;
`;
const LogoImg = styled.img`
	max-width: 50px;
`;
const SignList = styled.ul`
	margin-left: auto;
	align-items: center;
	display: flex;
	& button {
		appearance: none;
		background: none;
		color: #fff;
		border: none;

		font-weight: bold;
		border-radius: 0 !important;

		font-size: 20px;
		padding: 0;
	}

	& button:focus {
		outline: none !important;
	}

	& li {
		margin-left: 2rem;
		border-bottom: 1px solid #fff;
		padding: 15px 0;
	}
	& li:first-child span {
		font-size: 25px;
		color: #fff;
	}
	& li:first-child {
		color: #fff;
		font-size: 20px;
	}
`;

export default Header;
