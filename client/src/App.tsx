import "./App.css";
import { useAuth } from "./contexts/auth";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

function App() {
  const auth = useAuth();
  return auth!.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
