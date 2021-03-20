import { useEffect, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import logo from "./logo.svg";
import "./App.css";

const VERIFIER = {
  name: "Google",
  typeOfLogin: "google",
  clientId:
    "221898609709-obfn3p63741l5333093430j3qeiinaa8.apps.googleusercontent.com",
  verifier: "google-lrc",
};

function App() {
  const [openlogin, setOpenLogin] = useState();

  const onMount = async () => {
    const obj = new OpenLogin({
      clientId: VERIFIER.clientId,
      iframeUrl: "http://beta.openlogin.com",
    });

    setOpenLogin(obj);
    await obj.init();
  };

  const onLogin = async () => {
    if (!openlogin) return;
    if (openlogin.privKey) return;

    await openlogin.login({
      loginProvider: VERIFIER.typeOfLogin,
      redirectUrl: "http://localhost:3000/redirect",
    });
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You didn't login yet.</p>
        <button className="App-button" onClick={onLogin}>
          Login
        </button>
      </header>
    </div>
  );
}

export default App;
