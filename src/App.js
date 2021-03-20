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
  const [isLoading, setLoading] = useState(true);

  const [openlogin, setOpenLogin] = useState();
  const [privKey, setPrivKey] = useState();

  const onMount = async () => {
    setLoading(true);

    try {
      const sdk = new OpenLogin({
        clientId: VERIFIER.clientId,
        iframeUrl: "http://beta.openlogin.com",
      });
      setOpenLogin(sdk);

      await sdk.init();
      setPrivKey(sdk.privKey);
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async () => {
    if (isLoading || privKey) return;

    setLoading(true);
    try {
      await openlogin.login({
        loginProvider: VERIFIER.typeOfLogin,
        redirectUrl: "http://localhost:3000/redirect",
      });
      setPrivKey(openlogin.privKey);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {privKey ? (
          <p>You logged in: {privKey}</p>
        ) : (
          <p>You didn't login yet.</p>
        )}
        <button className="App-button" onClick={onLogin}>
          Login
        </button>
      </header>
    </div>
  );
}

export default App;
