import { useReducer } from "react";
import { IAppState, userInitialState } from "../interfaces/index";
import ApiClient from "../services";
import { AppContext } from "./appContext";
import { AppReducer } from "./authReducer";

interface props {
  children: JSX.Element | JSX.Element[];
}

const appInitialState: IAppState = {
  user: userInitialState,
  usersRetrieve: [],
  isSignIn: false,
  isError: false,
  msg: "",
};

export const AppProvider = ({ children }: props) => {
  let _initialState = appInitialState;

  let stateBackup: IAppState;
  try {
    const appState = localStorage.getItem("appState") || "{}";
    stateBackup = JSON.parse(appState);
  } catch (error) {
    console.error("Couldn't read local storage state");
    stateBackup = appInitialState;
  }
  if (Object.keys(stateBackup).length) {
    _initialState = { ...appInitialState, ...stateBackup };
  }

  const [appState, dispatch] = useReducer(AppReducer, _initialState);
  localStorage.setItem("appState", JSON.stringify(appState));

  const signIn = async (username: string, password: string): Promise<void> => {
    const userInfo = await new ApiClient().authLogin(username, password);

    if (userInfo !== null) {
      dispatch({
        type: "signin",
        payload: userInfo,
      });
    } else {
      dispatch({
        type: "signerror",
        payload: { msg: "The credentials isn't valid." },
      });
    }
  };

  const signOut = (): void => {
    dispatch({
      type: "signout",
      payload: null,
    });
  };

  return (
    <AppContext.Provider value={{ appState, signIn, signOut }}>
      {children}
    </AppContext.Provider>
  );
};
