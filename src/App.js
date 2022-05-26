import React from "react";
import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  CreateBlog,
  Footer,
  Home,
  Login,
  Register,
  ResetPassword,
  Profile,
  UpdateProfile,
  VerifyPassword,
  ChangePassword,
  UpdatePassword,
  BlogSingleDetails,
  UpdateBlog,
  NotFound,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./privetRoutes/ProctedRoutes";

const App = () => {
  return (
    <>
      <Router>
          <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* It's Procted Route without user verify it's not working */}
          <Route
            path="/create-blog"
            element={
              <ProtectedRoutes>
                <CreateBlog />
              </ProtectedRoutes>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerifyPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/blog/:id" element={<BlogSingleDetails />} />
          {/* It's Procted Route without user verify it's not working */}
          <Route
            path="/user-profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          {/* It's Procted Route without user verify it's not working */}
          <Route
            path="/user-profile/update"
            element={
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            }
          />
          {/* It's Procted Route without user verify it's not working */}
          <Route
            path="/blog/update/:id"
            element={
              <ProtectedRoutes>
                <UpdateBlog />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
