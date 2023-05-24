import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
