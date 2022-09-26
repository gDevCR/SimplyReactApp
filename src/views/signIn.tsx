import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const { authState, signIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    signIn(username, password);
  };

  useEffect(() => {
    if (authState.isSignIn) {
      navigate("/dashboard");
    }
  }, [authState.isSignIn]);

  return (
    <>
      <h3>Login</h3>

      {authState.isError && <p className="errorMsg">{authState.msg}</p>}

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
