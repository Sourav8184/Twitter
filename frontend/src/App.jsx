// React and React Router Dom:
import { Routes, Route } from "react-router-dom";

// Components:
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";

// React Hot Toast:
import { Toaster } from "react-hot-toast";

// App Component:
function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
