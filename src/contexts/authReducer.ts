import { IAppState, IUserInfo, userInitialState } from "../interfaces";

type AppAction =
  | { type: "signin"; payload: IUserInfo }
  | { type: "signout"; payload: null }
  | { type: "signerror"; payload: { msg: string } };

export const AppReducer = (state: IAppState, action: AppAction) => {
  switch (action.type) {
    case "signin":
      return {
        ...state,
        user: action.payload,
        isSignIn: true,
        isError: false,
        msg: "",
      };
    case "signout":
      return {
        ...state,
        user: userInitialState,
        isSignIn: false,
        isError: false,
        msg: "",
      };
    case "signerror":
      return {
        ...state,
        isError: true,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
