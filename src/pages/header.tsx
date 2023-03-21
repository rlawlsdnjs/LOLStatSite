import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { loginState } from "../store";
import { AuthContext } from "../components/sign/context/authContext";
import { useContext } from "react";
import { handleLogout } from "../components/sign/sign";

const Header = () => {
  const userInfo = useContext(AuthContext);
  const [sign, setSign] = useRecoilState<boolean>(loginState);
  const signIn = () => {
    setSign((current) => !current);
  };

  return (
    <HeaderContainer>
      <HeaderCenter>
        <HeaderTitle>
          <Link to="/">
            <LogoImg src="test.png" />
          </Link>
        </HeaderTitle>
        <SignList className="signList">
          <li>
            {!userInfo ? (
              <button onClick={signIn}>로그인</button>
            ) : (
              <button onClick={handleLogout}>로그아웃</button>
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
  top: 0;
  left: 0;
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
  max-width: 30px;
`;
const SignList = styled.ul`
  margin-left: auto;

  display: flex;
`;

export default Header;
