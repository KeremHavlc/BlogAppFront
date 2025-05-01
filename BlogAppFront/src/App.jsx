import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import { ToastContainer } from "react-fox-toast";
import FriendShipPage from "./Pages/FriendShipPage";
import PendingRequestsPage from "./Pages/PendingRequestsPage";
import SearchUserPage from "./Pages/SearchUserPage";
import CommunitiesPage from "./Pages/CommunitiesPage";
import AdminLoginPage from "./Pages/AdminPages/AdminLoginPage";
import AdminHomePage from "./Pages/AdminPages/AdminHomePage";
import AddComunityPage from "./Pages/AdminPages/AddComunityPage";
import AllCommunitYPage from "./Pages/AdminPages/AllCommunitYPage";
import AllUserPage from "./Pages/AdminPages/AllUserPage";
import AllPostPage from "./Pages/AdminPages/AllPostPage";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/postDetails/:postId" element={<PostDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/friendships/:userId" element={<FriendShipPage />} />
        <Route path="/searhcuser/:userId" element={<SearchUserPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/adminhome" element={<AdminHomePage />} />
        <Route path="/addCommunity" element={<AddComunityPage />} />
        <Route path="/allCommunity" element={<AllCommunitYPage />} />
        <Route path="/allUser" element={<AllUserPage />} />
        <Route path="/allPost" element={<AllPostPage />} />
        <Route
          path="/pending-requests/:userId"
          element={<PendingRequestsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
