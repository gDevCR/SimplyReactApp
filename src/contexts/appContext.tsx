import { createContext } from "react";
import { IAppState } from "../interfaces";

export type AppContextProps = {
  appState: IAppState;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
