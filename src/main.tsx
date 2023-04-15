import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./components/sign/provider/authProvider";
import "./reset.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<RecoilRoot>
		<AuthProvider>
			<App />
		</AuthProvider>
	</RecoilRoot>
);
