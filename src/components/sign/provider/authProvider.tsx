//authProvider.tsx
import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { auth } from "../../../api/firebase";
import { loginState } from "../../../store/index";
import { useRecoilValue, useResetRecoilState, useRecoilState } from "recoil";

interface Props {
  children: React.ReactNode;
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useRecoilState(loginState);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      console.log(`구독`, fbUser);
      setUser(fbUser);
      setLogin(false);
    });
    return subscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
