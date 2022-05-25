import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import forgotPassword from "../img/undraw_Forgot_password_re_hxwm.png";

const UpdatePassword = () => {
   // CHange Document Title
   document.title = `Jsdev Blog - Update password`;
  // All State Variable
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  //When User Click reset button
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!oldPassword && !newPassword) return toast.error("OldPassword & New Password Required");
    if (oldPassword === newPassword) return toast.error("OldPassword & New Password Are Same. Enter New Password");
    if (newPassword.length < 8)
      return toast.error("Password must be 8 characters");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_PROXY}/update/password`,
        {
          oldPassword,
          newPassword,
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      toast.success(data);
      localStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className="forgot">
        <div className="container">
          <div className="forgot_main">
            <div className="left">
              <img src={forgotPassword} alt="Razu Islam" />
            </div>
            <div className="right">
              <h1 style={{ fontSize: "35px", textAlign: "left" }}>
                Update <br /> Your Password
              </h1>
              <form className="form" onSubmit={handleUpdate}>
                <div className="from_control">
                  <input
                    type="password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="from_control">
                  <input
                    type="password"
                    placeholder="Enter your new password.."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button className="app_btn btn_fill" type="submit">
                  Update Password
                </button>
                <button
                  className="app_btn btn_trans"
                  onClick={() => navigate("/user-profile", { replace: true })}
                  type="submit"
                >
                  Back to Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;