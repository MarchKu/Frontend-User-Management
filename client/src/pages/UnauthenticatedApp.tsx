import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.js";
function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
