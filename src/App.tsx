import "./App.css";
import { AuthProvider } from "./contexts/authProvider";
import RouteConfig from "./routeConfig";

function App() {
  return (
    <AuthProvider>
      <RouteConfig />
    </AuthProvider>
  );
}

export default App;
