import { useEffect, useState } from "react";
import OpenLogin from "@toruslabs/openlogin";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(true);

  const [openlogin, setOpenLogin] = useState();
  const [privKey, setPrivKey] = useState();

  const onMount = async () => {
    setLoading(true);
    try {
      const sdk = new OpenLogin({
        clientId:
          "BEKbgRFZnqnMQFOQYcDdYFq0mOxZGdbVkIxzr-YoRpWWFQD5g04aAMc2xF1sf-qZ0StRkOOHqSkqQozdpwBXAz8",
        network: "mainnet",
      });
      setOpenLogin(sdk);

      await sdk.init();
      setPrivKey(sdk.privKey);
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async () => {
    if (isLoading || privKey || !openlogin) return;

    setLoading(true);
    try {
      await openlogin.login({
        loginProvider: "google",
        redirectUrl: "http://localhost:3000",
      });
    } catch {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    if (isLoading || !openlogin) return;

    setLoading(true);
    try {
      await openlogin.logout({});
      setPrivKey(undefined);
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
        {isLoading ? (
          "Loading..."
        ) : privKey ? (
          <>
            <p>You logged in: {privKey}</p>
            <button className="App-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p>You didn't login yet.</p>
            <button className="App-button" onClick={onLogin}>
              Login
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
