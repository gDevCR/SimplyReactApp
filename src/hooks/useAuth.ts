import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

const useAuth = () => {
  const context = useContext(AppContext);

  return context;
};

export default useAuth;
