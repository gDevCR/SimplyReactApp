import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppState from "../hooks/useAppState";

const SignIn = () => {
  const navigate = useNavigate();
  const { appState, signIn } = useAppState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await signIn(username, password);
  };

  useEffect(() => {
    if (appState.isSignIn) {
      navigate("/dashboard");
    }
  }, [appState.isSignIn]);

  return (
    <>
      <h3>Login</h3>

      {appState.isError && <p className="errorMsg">{appState.msg}</p>}

      <input
        id="txtUsername"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="txtPassword"
        type="text"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input type="button" value="Entrar" onClick={submit} />
    </>
  );
};

export default SignIn;
