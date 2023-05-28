import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import AddCatPage from "./pages/AddCatPage";
import UserProfilePage from "./pages/UserProfilePage";
import ModifyCatPage from "./pages/ModifyCatPage";
import { useEffect } from "react";
import { auth } from "./config/firebase";

function App() {
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      const token = await user?.getIdToken();
      if (token) {
        localStorage.setItem("token", token);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/addNewCat" element={<AddCatPage />} />
        <Route path="/modifyCat" element={<ModifyCatPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
