import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/postDetails" element={<PostDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
